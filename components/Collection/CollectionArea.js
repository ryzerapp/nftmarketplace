import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionArea = () => {
  return (
    <>
      <div className='collection-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <CollectionCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionArea;
