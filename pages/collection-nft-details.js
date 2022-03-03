import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Loader from '../components/Common/Loader';
import Layout from '../components/Layout/Layout';
import { useNftOfCollection } from '../hooks/Web2/useNftOfCollection';

const Collection = () => {

  const router = useRouter()
  const { data, isLoading } = useNftOfCollection({
    collection_name: router.query?.collection
  })
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <>
        <div className='collection-widget-area pt-70 pb-70'>
          <div className='container'>
            <div className='row'>
              <>
                <div className='row justify-content-center'>
                  <div className=''>
                    <h2>Created Nft Of Collection {router.query?.collection_name}</h2>
                  </div>
                  <hr className=''
                    style={{ color: '#f14d5d', height: "5px", borderRadius: "20px" }}></hr>
                  <div className='pb-70'></div>
                  {data?.nfts?.length > 0 ?
                    data?.nfts?.map((res) =>
                    (
                      <div className='col-lg-4 col-md-6' key={res?.id}>
                        <div className='featured-card box-shadow'>
                          <div className='featured-card-img'>
                            <a href='/item-details'>
                              <img src={res?.image_url} alt='Images' />
                            </a>
                            <p>
                              <i className='ri-heart-line'></i> 122
                            </p>
                            <button type='button' className='default-btn border-radius-5'>
                              Place Bid
                            </button>
                          </div>
                          <div className='content'>
                            <h3>
                              <span>{res?.name}</span>
                            </h3>
                            <div className='content-in'>
                              <div className='featured-card-left'>
                                <h4>Token Id: {res?.id}</h4>
                                <h4>Created Date: {new Date(res?.created_at).toDateString()}</h4>
                                <h4>Amount: {res?.amount}</h4>
                              </div>

                              <a href='/item-details' className='featured-content-btn'>
                                <i className='ri-arrow-right-line'></i>
                              </a>
                            </div>
                            <a href='author-profile.html' className='featured-user-option'>
                              <img src='../images/featured/featured-user1.jpg' alt='Images' />
                              <span>Created by @{res?.created_by}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                    ) : <>
                      <div className='container mt-100'>
                        <div className='row'>
                          <div className='col-xs-1 section-title  pt-70 pb-70' align="center">
                            <h2>This Collection Don't Have Any NFT</h2>
                          </div>
                        </div>
                      </div>
                    </>}
                </div>
              </>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Collection;
