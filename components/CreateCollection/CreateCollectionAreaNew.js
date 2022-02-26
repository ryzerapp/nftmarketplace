import React from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";
import http from '../../utils/http';
import Image from 'next/image';

const CreateCollectionAreaNew = () => {

  const { nftTokenAddress, nftTokenABI } =
    useMoralisDapp();
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const [imageUrl, setImage] = React.useState()
  const [nftData, setNftData] = React.useState()

  const handelCreate = async () => {
    await http.post('/generate_nft', { "numberOfNft": 1 }).then((res) => {
      setImage(res?.data?.image_url)
      setNftData(res?.data)
    }).catch((err) => {
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
    console.log("data", moralisFileJson);
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
    console.log(options);
    await contractProcessor.fetch({
      params: options,
      onSuccess: (res) => {
        console.log(res);
        alert("Done");
      },
      onError: (error) => {
        console.log(error);
        alert(error);
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

          </div>

        </div>
      </div>
    </>
  );
};

export default CreateCollectionAreaNew;
