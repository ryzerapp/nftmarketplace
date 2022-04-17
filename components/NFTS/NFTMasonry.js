import React from 'react'
export default function NFTMasonry({ nft }) {
    return (
        <>
            <div className="article">
                <div className="imageBox">
                    <div className='featured-card box-shadow'>
                        <div className='featured-card-img'>
                            <a href='/item-details'>
                                <img
                                    key={nft?.token_uri}
                                    src={nft?.image_url}
                                    style={{ width: "100%", display: "block" }}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "../images/notfoundimage.png";
                                    }}
                                />
                            </a>
                            <button type='button' className='default-btn border-radius-5'>
                                Open NFT
                            </button>
                        </div>
                        <div className='content'>
                            <h3>
                                <a href='/item-details'>{
                                    nft?.name ? nft?.name :
                                        nft?.metadata?.name ? nft?.metadata?.name : ""
                                }</a>
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
            </div>
        </>
    )
}
