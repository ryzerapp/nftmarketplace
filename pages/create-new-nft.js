import { useForm } from "react-hook-form";
import http from '../utils/http'
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./../components/Common/Logos";
import { useWeb3 } from "../providers/Web3Context";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useRouter } from 'next/router';
import { useIPFS } from '../hooks/Web3/useIPFS';
import { useQuery } from 'react-query';

const menuItems = [
  {
    key: "eth",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "bsc",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "polygon",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
];
const CreateCollection = () => {
  const [imageUrl, setimageUrl] = useState("#")
  const [imageData, setImageData] = useState()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [chainId, setchainId] = useState("Ethereum")
  async function ImageResizeNew(file) {
    const imageFile = file;
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 150,
      useWebWorker: true,
      fileType: "WEBP",
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }

  }
  const handleImageChange = async (event) => {
    if (event.target.files) {
      const image = await ImageResizeNew(event.target.files[0]);
      setImageData(image)
      if (image) {
        setimageUrl(URL.createObjectURL(image));
      }
    }

  }
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data
      }
      if (data?.image?.length > 0) {

        const formData = new FormData();
        formData.append("file", data?.image[0]);
        formData.append("fileName", data?.image[0]?.name);
        try {
          const res = await http.post("/attachments",
            formData
          );
          if (res?.status == 201) {
            payload.image = res?.data?.image;
            mintNFTHandle(payload)
          }
        } catch (ex) {
          reset()
          console.log(ex);
          return;
        }
      }
    } catch (error) {
      reset()
      const { data } = error.response.data;
      if (data) {
        toast.error(data[0].messages[0].message);
      }
    }
  };
  async function mintNFTHandle(data) {
    const nftDataJson = {
      ...data
    };
    if (!isAuthenticated) {
      toast.success("Please Connect Web3.0 Wallet")
      return;
    }
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(nftDataJson, undefined, 1)),
      type: 'json'
    });
    const moralisFileJson = await file.saveIPFS();
    await mintNFT(moralisFileJson._ipfs);
  }
  const { state: { nftTokenAddress } } =
    useWeb3();
  const { state: { nftTokenABI } } = useWeb3()
  const { Moralis, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { state: { walletAddress, networkId } } = useWeb3();
  const router = useRouter()
  const { resolveLink } = useIPFS();
  const nftBalanceJson = async (data) => {
    let NFTs = data;
    for (let NFT of NFTs) {
      try {
        await fetch(NFT?.token_uri)
          .then(async (response) => await response.json())
          .then((data) => {
            NFT.image_url = resolveLink(data.image);
          });
      } catch (error) {
      }
    }
    return NFTs;
  };
  const setData = async () => {
    const options = { chain: networkId, address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    var dataArr = polygonNFTs?.result?.map(item => {
      return [item.token_address, {
        token_address: item?.token_address,
        name: item?.name,
        symbol: item?.symbol,
        contract_type: item?.contract_type,
        token_uri: item?.token_uri,
      }]
    });
    var maparr = new Map(dataArr); // create key value pair from array of array
    var finalArray = [...maparr.values()];
    await nftBalanceJson(finalArray)
    return finalArray;
  };
  const { data: collections, isLoading, refetch } = useQuery(['usercollection'], setData, {
    keepPreviousData: true,
  });
  async function mintNFT(tokenURI) {
    let options = {
      contractAddress: nftTokenAddress,
      functionName: "createToken",
      abi: nftTokenABI,
      params: {
        tokenURI: tokenURI,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: async (res) => {
        console.log(res)
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
  return (
    <>
      {/* <div className="container">
        <div className='user-area pt-100 pb-70'>
          <div className='container'
          >
            <div className='row'>
              <div className='col-lg-12'>
                <div className='collection-form-area'>
                  <div className='section-title text-center'>
                    <h2>Create NFT</h2>
                  </div>

                  <div className='collection-form'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='row'>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label>NFT Of Name</label>
                            <input
                              type='text'
                              {...register("name")}
                              className='form-control'
                              placeholder='e. g. “walking in the air”'
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Description</label>
                            <input
                              type='text'
                              {...register("description")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Supply</label>
                            <input
                              type='number'
                              {...register("supply")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Choose Collection</label>
                            <input
                              type='text'
                              {...register("collection_name")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Choose NFT Image</label>
                            <input
                              onChange={(event) => handleImageChange(event)}
                              className='profileButton-input'
                              type='file'
                              accept='image/*'
                            />
                            <img src={imageUrl} />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-start align-items-center" >
                        <div
                          style={{
                            height: 50,
                            lineHeight: 50
                          }}
                        >
                          <h5 style={{ color: 'white' }}> Select Crypto Type:</h5>
                        </div>
                        <div
                          style={{
                            height: 50
                          }}
                          className='collection-category text-center pb-3 pl-3'>
                          <ul>
                            {menuItems?.map((item, index) => {
                              return (
                                <li key={index} style={{
                                  backgroundColor: chainId == item?.value ? '#f6f6f6' : '#0c0d23',
                                  border: chainId == item?.value ? '1px solid white' : '1px solid white',
                                }}>
                                  <div
                                    style={{
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => setchainId(item?.value)}
                                  >
                                    {item?.icon}
                                    <a
                                      className='ml-2'
                                      style={{
                                        color: chainId == item?.value ? '#0c0d23' : '#8d99ff',
                                      }}
                                    >
                                      {item?.value}
                                    </a>
                                  </div>

                                </li>
                              )
                            })}

                          </ul>
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12'>
                        <div className='form-group'>
                          <label>Crypto Cost</label>
                          <input
                            type='number'
                            {...register("cryptoCost")}
                            className='form-control'
                            placeholder='e. g. “after purchasing you’ll able to get the real product”'

                          />
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12 text-center'>
                        <button
                          className='default-btn border-radius-5'
                        >
                          Create NFT(Mint Later)
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div class="create-items mt-3 pt-3 mt-md-4 pt-md-4 mt-lg-5 pt-lg-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 create-form-outer">
              <div class="title-heading mb-4 pb-2 pb-lg-0 ">
                <h2 class="headingWh ">Create collectible item</h2>
                <p>Meet the rules of NFT-art placement in <a href="#">our help center</a></p>
              </div>
              <div class="create-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">

                    <div class="col-6 pb-md-4 pb-3 ">
                      <div class="img-choosen">
                        <img src="../images/single.svg" class="img-fluid" alt="choose img" />
                        <label>Single Image</label>
                      </div>
                    </div>
                    <div class="col-6 pb-md-4 pb-3 ">
                      <div class="img-choosen">
                        <img src="../images/multiple.svg" class="img-fluid" alt="choose img" />
                        <label>Multiple Image</label>
                      </div>
                    </div>

                    <div class="col-lg-12 pb-md-4 pb-3">
                      <label>Upload file</label>
                      <div class="custom-file-upload">
                        <div class="file-upload">
                          <div class="image-upload-wrap">
                            <input class="file-upload-input"
                              {...register("image")}
                              type='file'
                              accept="image/*" />
                            <div class="drag-text">
                              <img src="../images/upload-icon.svg" class="img-fluid" alt="upload icon" />
                            </div>
                          </div>
                          <div class="file-upload-content mt-3">
                            <div class="title-wrapouter">
                              <div class="uploaded-img">
                                <img class="file-upload-image" src="#" alt="your image" />
                              </div>
                              <div class="image-title-wrap">
                                <span class="image-title">Uploaded Image Title</span>
                                <button type="button" onClick="removeUpload()" class="remove-image"> Remove</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-7 col-6 pb-md-4 pb-3">
                      <label>Price</label>
                      <input type="text"
                        {...register("price")}
                        placeholder="Price" class="form-control" />
                    </div>
                    <div class="col-md-5 col-6 pb-md-4 pb-3">
                      <label>Open for Bids</label>
                      <div class="form-check form-switch">
                        <input class="form-check-input"
                          {...register("openforbid")}
                          type="checkbox" role="switch" checked />
                      </div>
                    </div>
                    <div class="col-md-7 pb-md-4 pb-3">
                      <label>Choose collection</label>
                      <div class="btn-group w-100">
                        <button class="filterbtn dropdown-toggle text-start"
                          type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                          New collection
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                          <li><a class="dropdown-item" href="#">Memes</a></li>
                          <li><a class="dropdown-item" href="#">Photography</a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-xl-9 pb-md-4 pb-3">
                      <label>Item Name</label>
                      <input type="text"
                        {...register("name")}
                        placeholder="Enter Name" class="form-control" />
                    </div>
                    <div class="col-xl-9 pb-md-4 pb-3">
                      <label>Description</label>
                      <textarea class="form-control"
                        {...register("description")}
                        placeholder="Enter the description"></textarea>
                    </div>
                    <div class="col-md-7 col-6 pb-md-4 pb-3">
                      <label>Royalties</label>
                      <input type="text"
                        {...register("royalties")}
                        placeholder=" 0,10,20% or more" class="form-control" />
                    </div>
                    <div class="col-md-5 col-6 pb-md-4 pb-3">
                      <label>Unlock once purchased</label>
                      <div class="form-check form-switch">
                        <input class="form-check-input"
                          {...register("purchased")}
                          type="checkbox" role="switch"
                          id="flexSwitchCheckChecked" checked />
                      </div>
                    </div>

                    <div class="col-lg-12 pt-3 d-none d-lg-block ">
                      <button class="btn btnlightblue m-auto m-md-0 d-table d-md-block">Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5 mt-5 mt-lg-0">
              <div class="title-heading mb-4">
                <h2 class="headingWh ">Preview of item</h2>
              </div>
              <div class="aboutitem">
                <div class="aboutitemImg">
                  <img class="img-fluid" src="../images/item-prev.png" alt="img" /></div>
                <div class="bgdarkbluecolor aboutitemcnt">
                  <div class="itemtitlecode">
                    <h2 class="textgraycolor">Cryptosharks</h2>
                    <h3 class="textwhitecolor">Cryptosharks #92991</h3>
                  </div>
                  <div class="itemtitlePrice">
                    <h2 class="textgraycolor">Price</h2>
                    <h3 class="textwhitecolor">
                      <img src="../images/priceicon.svg" /> <strong>0, 006</strong></h3>
                    <h4 class="textgraycolor"><span>
                      <img src="../images/hearticon.svg" /></span> 56</h4>
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-1 mb-2 ">
                <button class="btn btnlightblue savebtn d-block m-auto d-lg-none">Save</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
