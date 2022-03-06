import React from 'react';
import NFT from './NFT';

const CollectionArea = () => {
  return (
    <>
      <div className='collection-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <NFT />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionArea;
