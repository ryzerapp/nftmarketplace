import React, { useEffect, useState } from 'react';
import Loader from '../components/Common/Loader';
import Layout from '../components/Layout/Layout'
import { useWeb3 } from '../providers/Web3Context';
import { useRouter } from 'next/router';
import { useMoralisCollections } from '../hooks/Web2/useCollections';

const Collection = () => {
  const { state: { walletAddress, networkId } } = useWeb3();
  const router = useRouter()
  const { data: collections, isLoading, } = useMoralisCollections({
    "chain": networkId,
    "address": walletAddress
  });

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <div className='container'>
        <div className='row justify-content-center  pt-70'>
          {collections?.map((collection) => (
            <div
              key={collection?.token_uri}
              className="col-md-6 col-xl-3 mb-4">
                <div className="aboutitem">
                  <div className="aboutitemImg">
                    <img
                    src={collection?.image_url}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        height: "250px",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        router.push(`/collection-nft-details/${collection?.token_address}`)
                      }
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "../images/notfoundimage.png";
                      }}
                    />
                    <button type='button' className='default-btn border-radius-5' onClick={() =>
                      router.push(`/collection-nft-details/${collection?.token_address}`)}>
                      Open Collection
                    </button>
                  </div>
                  <div className="bgdarkbluecolor aboutitemcnt">
                    <div className="itemtitlecode">
                      <h2 className="textgraycolor">{collection?.name}</h2>
                    </div>
                    <div className="itemtitlePrice">
                      <h2 className="textgraycolor">{collection?.contract_type}</h2>
                    </div>
                  </div>
                </div>
            </div >
          ))}
          {/* <XMasonry>
            {collections?.map((collection) => (
              <XBlock key={collection?.token_address}>
                {
                  <div className="article">
                    <div className='featured-card box-shadow'>
                      <div className='featured-card-img'>
                        <a href='#'>
                          <img
                            src={collection?.image_url}
                            style={{ width: "100%", display: "block" }}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = "../images/notfoundimage.png";
                            }}
                          />
                        </a>
                        <button type='button' className='default-btn border-radius-5' onClick={() =>
                          router.push(`/collection-nft-details/${collection?.token_address}`)}>
                          Open Collection
                        </button>
                      </div>
                      <div className='content'>
                        <h3>
                          <span>{collection?.name}</span>
                        </h3>
                        <p>{collection?.contract_type}</p>
                      </div>
                    </div>
                  </div >
                }
              </XBlock>
            ))}
          </XMasonry> */}
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
