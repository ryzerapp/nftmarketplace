import React from 'react'

export default function
    () {
    return (
        <div className="footer" id="footer">
            <div className="subscribe-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="subscribe-box">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="heading-area">
                                                <h5 className="sub-title">
                                                    subscribe to Cryptonium
                                                </h5>
                                                <h4
                                                    style={{ color: 'white' }}
                                                    className="title">
                                                    To Get Exclusive Benefits
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-4 d-flex align-self-center">
                                            <div className="icon">
                                                <img src="../images/mail-box.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-8 d-flex align-self-center">
                                            <div className="form-area">
                                                <input type="text" placeholder="Your Email Address" />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 d-flex align-self-center">
                                            <div className="button-area">
                                                <button className="mybtn1" type="submit">Subscribe
                                                    <span><i className="fas fa-paper-plane"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
