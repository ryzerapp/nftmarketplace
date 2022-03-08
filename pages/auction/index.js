import React, { useState } from 'react';
import { useAuctionByUser } from '../../hooks/Web2/useMeQuery';
import Loader from '../../components/Common/Loader'
const Auction = ({ }) => {
    const { data, isLoading } = useAuctionByUser();
    if (isLoading) {
        return (
            <Loader></Loader>
        )
    }
    const AuctionComponent = ({ auction }) => {
        return (
            <div className='col-lg-4 col-md-6'>
                <div className='featured-card box-shadow'>
                    <div className='featured-card-img'>
                        <img src={auction?.auctionImage} alt='Images' />
                        <p>
                            <i className='ri-heart-line'></i> 122
                        </p>
                    </div>
                    <div className='content'>
                        <h3>
                            <a href='/item-details'>{auction?.name}</a>
                        </h3>
                        <div className='content-in'>
                            <div className='featured-card-left'>
                                <span>Name:{auction?.name}</span>
                                <h4>Token Id: {auction?.description}</h4>
                                <h4>Created Date: {new Date(auction?.auctionDate).toDateString()}</h4>
                            </div>

                            <a href='/item-details' className='featured-content-btn'>
                                <i className='ri-arrow-right-line'></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    return (
        <>
            <div className='collection-widget-area pt-70 pb-70'>
                <div className='container'>
                    <div className='row'>
                        <>
                            <div className='row justify-content-left'>
                                {
                                    data?.map((auction) => {
                                        return (
                                            <>
                                                <AuctionComponent auction={auction}></AuctionComponent>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auction;
