import React from 'react';
import { useMoralis, useMoralisFile } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";

const CreateCollectionAreaNew = () => {
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { cryptoniumTokenABI,
    cryptoniumTokenAddress } =
    useMoralisDapp();
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  console.log(typeof cryptoniumTokenABI)
  async function mintNFT() {
    let options = {
      contractAddress: cryptoniumTokenAddress,
      functionName: "getNfts",
      abi: cryptoniumTokenABI,
      params: {
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => {
        alert(error)
        console.log(error);
      },
    });
  }

  return (
    <>
      <div className='collection-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9'>
              <div className='collection-form-area'>
                <div className='section-title'>
                  <h2>Create Collectible Item</h2>
                </div>

                <div className='collection-form'>
                  <div className='col-lg-12 col-md-12'>
                    <button
                      type='submit'
                      className='default-btn border-radius-5'
                      onClick={() => mintNFT()}
                    >
                      Create Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCollectionAreaNew;
