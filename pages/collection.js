import React, { useState } from 'react';
import CollectionComponent from '../components/Collection/CollectionComponent';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import { useCollectionByUser } from '../hooks/Web2/useCollectionByUser';
import { useMeQuery } from '../hooks/Web2/useMeQuery';

const Collection = () => {
  const { data, isFetched, isLoading } = useCollectionByUser();
  const { data: users } = useMeQuery()

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
              <CollectionComponent
                collection={res}
                key={res?.id}
                savedCollection={users?.user?.saved_collection}
                user_id={users?.user?.id}
              />
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
