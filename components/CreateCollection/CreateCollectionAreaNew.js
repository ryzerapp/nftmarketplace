import React from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";
import http from '../../utils/http';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { Watch } from 'react-loader-spinner'
const CreateCollectionAreaNew = () => {

  const { nftTokenAddress, nftTokenABI } =
    useMoralisDapp();
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const [imageUrl, setImage] = React.useState()
  const [loader, setLoader] = React.useState(false)
  const [loaderNft, setLoaderNft] = React.useState(false)
  const [nftData, setNftData] = React.useState()

  const handelCreate = async () => {
    setImage(undefined)
    setNftData(undefined)
    setLoader(true)
    await http.post('/nfts/generate_nft', {
      "numberOfNft": 1,
      "author": "Mehul",
      "description": "This is"
    }).then((res) => {
      setImage(res?.data?.image_url)
      setNftData(res?.data)
      setLoader(false)
      notify(res?.data?.message)
    }).catch((err) => {
      setLoader(false)
      console.log(err)
    })
  }

  async function mintNFTHandle() {
    const nftData = {
      name: nftData?.name,
      description: nftData?.description,
      attributes: nftData?.attributes,
      image: imageUrl,
    };
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(nftData)),
    });
    const moralisFileJson = await file.saveIPFS();
    await mintNFT(moralisFileJson._ipfs);
  }

  async function mintNFT(tokenURI) {
    let options = {
      contractAddress: nftTokenAddress,
      functionName: "createToken",
      abi: nftTokenABI,
      params: {
        tokenURI: tokenURI,
      },
    };
    setLoaderNft(true)
    await contractProcessor.fetch({
      params: options,
      onSuccess: async (res) => {
        await http.put(`/nfts/update_nft/${nftData?.id}`, {
          "nft_is_minted": true
        }).then((res) => {

          if (res.data.status_code == 200)
            notify("Your NFT is Created.")
          setLoaderNft(false)

        }).catch((err) => {
          setLoaderNft(false)
          console.log(err)
        })
      },
      onError: (error) => {
        console.log(error);
        setLoaderNft(false)
      },
    });
  }
  const Loader = () => {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='d-flex pb-70 pt-70 justify-content-center' >
              <Watch
                height="100"
                width="100"
                color='grey'
                ariaLabel='loading'
              />
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='collection-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-1 section-title  pb-70' align="center">
              <h2>Create NFT Item</h2>
              <button
                type='submit'
                className='default-btn border-radius-5 mt-4'
                onClick={() => handelCreate()}
              >
                Play Game
              </button>
            </div>
            {loader ? <Loader></Loader> : null}
            <div className='col-lg-12 col-md-12 d-flex flex-row'>

              <div className='col-6'>
                {
                  imageUrl ?
                    (<Image
                      src={imageUrl}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />) : null
                }
              </div>
              <div className='col-6 mt-4'>
                {
                  nftData ?
                    (
                      <>
                        <h2>{nftData?.name}</h2>
                        <hr></hr>
                        <h2>{nftData?.author}</h2>
                        <hr></hr>
                        <h2>{nftData?.description}</h2>
                        <hr></hr>
                        <h2>{nftData?.nft}</h2>
                        <hr></hr>
                        <h2>{nftData?.edition}</h2>
                        <hr></hr>
                        <h2>{new Date(nftData?.date).toDateString()}</h2>
                        <hr></hr>
                        <h2>{nftData?.compiler}</h2>
                        <hr></hr>
                      </>
                    ) : null
                }
              </div>
            </div>
            {
              imageUrl ? (<div className='col-xs-1 section-title  pb-70 pt-70' align="center">
                <button
                  type='submit'
                  className='default-btn border-radius-5 mt-4'
                  onClick={() => mintNFTHandle()}
                >
                  Cook New Nft
                </button>
              </div>) : null
            }
            {loaderNft ? <Loader></Loader> : null}

          </div>

        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default CreateCollectionAreaNew;
