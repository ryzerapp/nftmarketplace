import React from 'react'

export default function NFTComponent({ nft }) {
    return (
        <div className='col-lg-3 col-md-4'>
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <a href='/item-details'>
                        <img src={nft?.image_url} alt='Images' />
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
                        <a href='/item-details'>{nft?.name}</a>
                    </h3>
                    <div className='content-in'>
                        <div className='featured-card-left'>
                            <span>Name:{nft?.name}</span>
                            <h4>Token Id: {nft?.token_id}</h4>
                            <h4>Created Date: {new Date(nft?.synced_at).toDateString()}</h4>
                            <h4>Amount: {nft?.amount}</h4>
                            <h4>Symbol: {nft?.symbol}</h4>
                        </div>

                        <a href='/item-details' className='featured-content-btn'>
                            <i className='ri-arrow-right-line'></i>
                        </a>
                    </div>
                    <a href='author-profile' className='featured-user-option'>
                        <img src='../images/featured/featured-user1.jpg' alt='Images' />
                        <span>Created by @Adison</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
