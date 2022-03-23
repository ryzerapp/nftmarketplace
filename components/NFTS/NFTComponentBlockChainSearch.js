import React from 'react'

export default function NFTComponentBlockChainSearch({ nft }) {
    return (
        <div className='col-lg-3 col-md-4'>
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={nft?.image_url ? nft?.image_url : "../images/notfoundimage.png"}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "../images/notfoundimage.png";
                        }}
                        alt='Images' />
                    <button type='button' className='default-btn border-radius-5'>
                        Open NFT
                    </button>
                </div>
                <div className='content'>
                    <h3>
                        <a href='/item-details'>{nft?.metadata?.name ? nft?.metadata?.name : nft?.name}</a>
                    </h3>
                    <div className='content-in'>
                        <div className='featured-card-left'>
                            <h4>Token Id: {nft?.token_id}</h4>
                            <h4>Created Date: {new Date(nft?.synced_at).toDateString()}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
