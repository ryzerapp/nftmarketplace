import React, { useState } from 'react';
import { XBlock, XMasonry } from 'react-xmasonry';
import CollectionComponent from '../components/Collection/CollectionComponent';
import CollectionDetails from '../components/Collection/CollectionDetails';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import { useCollections } from '../hooks/Web2/useCollections';

const Collection = () => {
  const { data: collections, isLoading } = useCollections();
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center  pt-70'>
          <XMasonry>
            {collections?.map((res) => (
              <XBlock key={res?.id}>
                {
                  < CollectionDetails
                    collection={res}
                  />
                }

              </XBlock>
            ))}
          </XMasonry>
        </div>
      </div>
      <InvolvedArea />
    </>
  );
};

export default Collection;
