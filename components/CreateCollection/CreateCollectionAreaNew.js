import React from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import http from '../../utils/http';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import Loader from '../Common/Loader'
import { useWeb3 } from '../../providers/Web3Context';
const CreateCollectionAreaNew = () => {

  const { state: { nftTokenAddress } } =
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
            {loader ? <Loader /> : null}
            <div className='col-lg-12 col-md-6 d-flex flex-row'>
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
                <div className='col-lg-6 col-md-12 mt-4'>
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
                        </>
                      ) : null
                  }
                </div>
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
