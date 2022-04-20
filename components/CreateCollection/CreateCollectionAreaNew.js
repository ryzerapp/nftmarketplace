import React from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import http from '../../utils/http';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import Loader from '../Common/Loader'
import { useWeb3 } from '../../providers/Web3Context';
import browserSignature from 'browser-signature';

const CreateCollectionAreaNew = () => {

  const { state: { nftTokenAddress, user } } =
    useWeb3();
  const { state: { nftTokenABI } } = useWeb3()
  const { Moralis, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const [imageUrl, setImage] = React.useState()
  const [loader, setLoader] = React.useState(false)
  const [loaderNft, setLoaderNft] = React.useState(false)
  const [nftData, setNftData] = React.useState()

  const handelCreate = async () => {
    setImage(undefined)
    setNftData(undefined)
    setLoader(true)
    const signature = browserSignature();
    var payload = {
      "numberOfNft": 1,
      "description": "This nft created Using Our Game.",
      "collection_id": "cryptonium",
      "browser_signature": signature
    }
    if (user?.username) {
      payload.author = user?.username
    }

    await http.post('/nfts/generate_nft', payload).then((res) => {
      console.log(res?.data)
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

    let data = { ...nftData }
    delete data?.message;
    delete data?.status_code;
    delete data?.image_url;
    delete data?.date;
    delete data?.id;
    delete data?.updated_at;
    delete data?.userId;
    delete data?.nft_is_minted;
    const nftDataJson = {
      ...data,
      image: imageUrl,
    };
    if (!isAuthenticated) {
      notify("Please Connect Web3.0 Wallet")
      return;
    }
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(nftDataJson, undefined, 1)),
      type: 'json'
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

          setImage(undefined)
          setNftData(undefined)
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
  return (
    <>
      <section className="bonus-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="section-heading">
                <h5 className="subtitle">
                  Play Game and Get your Avatar
                </h5>
                <h2 className="title">
                  GET INSTANTLY!
                </h2>
                <a
                  onClick={() => handelCreate()}
                  className="btnnew">{`${("Create Avatar Now!").toUpperCase()}`}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='collection-widget-area'>
        <div className='container'>
          <div className='row'>
            {/* <div className='col-xs-1 section-title  pb-70' align="center">
              <h2>Create NFT Item</h2>
              <button
                type='submit'
                className='default-btn border-radius-5 mt-4'
                onClick={() => handelCreate()}
              >
                Play Game
              </button>
            </div> */}
            {loader ? <Loader /> : null}
            <div className='col-lg-12 col-md-6 d-flex flex-row justify-content-center pt-70'>
              <div className='row'>
                <div className='col-lg-6 col-md-12'>
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
                <div className='col-lg-6 col-md-12 p-4 game-details' >
                  {
                    nftData ?
                      (
                        <>
                          <h3>{nftData?.name}</h3>
                          <hr></hr>
                          <h3>{nftData?.description}</h3>
                          <hr></hr>
                          <h3>{nftData?.unique_string}</h3>
                          <hr></hr>
                          <h3>{nftData?.edition}</h3>
                          <hr></hr>
                          <h3>{new Date(nftData?.date).toDateString()}</h3>
                          <hr></hr>
                          <h3>{nftData?.compiler}</h3>
                        </>
                      ) : null
                  }
                </div>
              </div>

            </div>
            {
              imageUrl ? (<div className='col-xs-1 section-title  pb-70 pt-70' align="center">
                <a
                  type='submit'
                  onClick={() => mintNFTHandle()}
                  className="mybtn1">Cook New Nft Of Generated Avatar
                </a>
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
