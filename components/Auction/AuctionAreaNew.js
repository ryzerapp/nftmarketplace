import React from 'react'

export default function AuctionAreaNew() {
    return (
        <section className="auction-wrap border border-danger bg-rock">
            <img src="../images/section-shape-4.png" alt="Image" className="section-shape" />
            <img src="../images/shape-3.png" alt="Image" className="shape-three" />
            <img src="../images/shape-4.png" alt="Image" className="shape-four" />
            <img src="../images/shape-5.png" alt="Image" className="shape-five" />
            <div className="container">
                <div className="section-title style1 text-center mb-40">
                    <h2>Live Auctions</h2>
                </div>
                <div className="auction-item-wrap">
                    <div className="auction-card style2">
                        <div className="auction-img">
                            <img src="../images/auction/auction-item-12.jpg" alt="Image" />
                            <button type="button" className="btn style1" data-bs-toggle="modal" data-bs-target="#placeBid">Place Bid</button>
                        </div>
                        <div className="auction-info-wrap">
                            <div className="auction-end">
                                <div className="countdown text-center" data-countdown="2022/12/11"></div>
                                <button type="button"><i className="flaticon-heart"></i></button>
                            </div>
                            <div className="auction-title">
                                <h3><a href="item-details.html">Become One With Nature</a></h3>
                            </div>
                            <div className="auction-author-info">
                                <div className="author-info">
                                    <div className="author-img">
                                        <img src="../images/author/author-4.jpg" alt="Image" />
                                    </div>
                                    <div className="author-name">
                                        <span>Creator</span>
                                        <h6>Angie O. Plasty</h6>
                                    </div>
                                </div>
                                <div className="auction-bid">
                                    <span>Current Bid</span>
                                    <h6>3.66 ETH</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auction-card style2" >
                        <div className="auction-img">
                            <img src="../images/auction/auction-item-14.jpg" alt="Image" />
                            <button type="button" className="btn style1" data-bs-toggle="modal" data-bs-target="#placeBid">Place Bid</button>
                        </div>
                        <div className="auction-info-wrap">
                            <div className="auction-end">
                                <div className="countdown text-center" data-countdown="2022/12/22"></div>
                                <button type="button"><i className="flaticon-heart"></i></button>
                            </div>
                            <div className="auction-title">
                                <h3><a href="item-details.html">Flame Dress Bylamin</a></h3>
                            </div>
                            <div className="auction-author-info">
                                <div className="author-info">
                                    <div className="author-img">
                                        <img src="../images/author/author-1.jpg" alt="Image" />
                                    </div>
                                    <div className="author-name">
                                        <span>Creator</span>
                                        <h6>Mary Chis</h6>
                                    </div>
                                </div>
                                <div className="auction-bid">
                                    <span>Current Bid</span>
                                    <h6>3.66 ETH</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auction-card style2" >
                        <div className="auction-img">
                            <img src="../images/auction/auction-item-13.jpg" alt="Image" />
                            <button type="button" className="btn style1" data-bs-toggle="modal" data-bs-target="#placeBid">Place Bid</button>
                        </div>
                        <div className="auction-info-wrap">
                            <div className="auction-end">
                                <div className="countdown text-center" data-countdown="2022/12/6"></div>
                                <button type="button"><i className="flaticon-heart"></i></button>
                            </div>
                            <div className="auction-title">
                                <h3><a href="item-details.html">Twilight Fracture City</a></h3>
                            </div>
                            <div className="auction-author-info">
                                <div className="author-info">
                                    <div className="author-img">
                                        <img src="../images/author/author-3.jpg" alt="Image" />
                                    </div>
                                    <div className="author-name">
                                        <span>Creator</span>
                                        <h6>Clarie Voyar</h6>
                                    </div>
                                </div>
                                <div className="auction-bid">
                                    <span>Current Bid</span>
                                    <h6>5.12 ETH</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auction-card style2" >
                        <div className="auction-img">
                            <img src="../images/auction/auction-item-15.jpg" alt="Image" />
                            <button type="button" className="btn style1" data-bs-toggle="modal" data-bs-target="#placeBid">Place Bid</button>
                        </div>
                        <div className="auction-info-wrap">
                            <div className="auction-end">
                                <div className="countdown text-center" data-countdown="2022/12/12"></div>
                                <button type="button"><i className="flaticon-heart"></i></button>
                            </div>
                            <div className="auction-title">
                                <h3><a href="item-details.html">Hamlet Contemplates</a></h3>
                            </div>
                            <div className="auction-author-info">
                                <div className="author-info">
                                    <div className="author-img">
                                        <img src="../images/author/author-6.jpg" alt="Image" />
                                    </div>
                                    <div className="author-name">
                                        <span>Creator</span>
                                        <h6>Sara Bellon</h6>
                                    </div>
                                </div>
                                <div className="auction-bid">
                                    <span>Current Bid</span>
                                    <h6>34.66 ETH</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-20">
                    <a href="explore-auction.html" className="btn style1">View All Auctions</a>
                </div>
            </div>
        </section>
    )
}
