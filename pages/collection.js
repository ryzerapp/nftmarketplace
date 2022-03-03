import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import { useCollectionByUser } from '../hooks/Web2/useCollectionByUser';

const Collection = () => {
  const router = useRouter()
  const { data, isFetched, isLoading } = useCollectionByUser();

  if (isLoading) {
    return (
      <Loader />
    )
  }

  const CollectionArea = () => {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          {data?.collections?.length > 0 ?
            data?.collections?.map((res) =>
              (
                <div className='col-lg-4 col-md-6' key={res?.id}>
                  <div className='featured-card box-shadow'>
                    <div className='featured-card-img'>
                      <a href='/item-details'>
                      <img src={res?.collection_cover_image}
                        alt='Images' />
                      </a>
                      <p>
                        <i className='ri-heart-line'></i> 122
                      </p>
                      <button type='button' className='default-btn border-radius-5' onClick={() =>
                        router.push({
                          pathname: '/collection-nft-details',
                          query: { collection: res?.id, collection_name: res?.collection_name },
                        })}>
                        Open Collection
                      </button>
                    </div>
                    <div className='content'>
                      <h3>
                      <span>{res?.collection_name}</span>
                      </h3>
                      <div className='content-in'>
                      <div className='featured-card-left'>
                          <h4 className="py-1" >Category: {res?.category}</h4>
                          <h4 className="py-1" >Created Date: {new Date(res?.created_at).toDateString()}</h4>
                          <h4 className="py-1" >Description: {res?.description}</h4>
                        </div>

                        <a href='/item-details' className='featured-content-btn'>
                          <i className='ri-arrow-right-line'></i>
                        </a>
                      </div>
                      <a href='author-profile.html' className='featured-user-option'>
                      <img
                        src={res?.collection_logo_image}

                        alt='Images' />
                      <span>Created by @{res?.created_by}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
              ) : <>
                <div className='container mt-100'>
                  <div className='row'>
                    <div className='col-xs-1 section-title  pb-70' align="center">
                      <h2>You Don't Have Any Collection</h2>
                    </div>
                  </div>
                </div>
              </>}
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='conatainer'>
        <div className='row pt-70'>
          <CollectionArea></CollectionArea>
        </div>
      </div>
      <InvolvedArea />
    </>
  );
};

export default Collection;
