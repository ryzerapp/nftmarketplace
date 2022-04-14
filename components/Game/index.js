import React from 'react'
import { useGameNft } from '../../hooks/Web2/useNftOfCollection'

export default function index() {
    const { data, isFetched, isLoading } = useGameNft({
        limit: 10
    })
    return (
        <>
            <div className="hero-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 d-flex align-self-center">
                            <div className="left-content">
                                <div className="content">
                                    <h5 className="subtitle">
                                        New Crypto Game
                                    </h5>
                                    <h1 className="title">
                                        PLay To Get Avatar
                                    </h1>
                                    <p className="text">
                                        Play to generate a new avatar.
                                        Every time you get a new avatar.
                                        Sell that avatar and earn money.
                                    </p>
                                    <div className="links">
                                        <a href="/play-nft-game" className="mybtn1 link1">Play Now!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img2 d-block d-md-none">
                                <img src="../images/heroarea.png" alt="" />
                            </div>
                            <div className="hero-img d-none d-md-block">
                                <img className="img-fluid full-image" src="../images/heroarea.png" alt="" />
                                <img className="shape phone" src="../images/h-shapes/phone.png" alt="" />
                                <img className="shape man" src="../images/h-shapes/man222.png" alt="" />
                                <img className="shape ripple" src="../images/h-shapes/ripple.png" alt="" />
                                <img className="shape ripple2" src="../images/h-shapes/ripple1.png" alt="" />
                                <img className="shape bitcoin1" src="../images/h-shapes/bitcoin1.png" alt="" />
                                <img className="shape bitcoin2" src="../images/h-shapes/bitcoin2.png" alt="" />
                                <img className="shape shape-icon" src="../images/h-shapes/shape.png" alt="" />
                                <img className="shape award-bg" src="../images/h-shapes/award/bg.png" alt="" />
                                <img className="shape award" src="../images/h-shapes/award/award.png" alt="" />
                                <img className="shape gift-bg" src="../images/h-shapes/giftbox/bg.png" alt="" />
                                <img className="shape gift" src="../images/h-shapes/giftbox/gift.png" alt="" />
                                <img className="shape shield-bg" src="../images/h-shapes/shield/bg.png" alt="" />
                                <img className="shape shield" src="../images/h-shapes/shield/shield.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="featured-game">
                <div className="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="feature-box">
                                    <div className="feature-box-inner">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="single-feature">
                                                    <div className="icon one">
                                                        <img src="../images/feature/icon1.png" alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title">
                                                            Git to Friend
                                                        </h4>
                                                        {/* <a href="#" className="link">read more <i className="fas fa-arrow-right"></i></a> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="single-feature">
                                                    <div className="icon two">
                                                        <img src="../images/feature/icon2.png" alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title">
                                                            Provably Fair
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="single-feature">
                                                    <div className="icon three">
                                                        <img src="../images/feature/payout.png" alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title">
                                                            Earn Passive Income
                                                        </h4>
                                                        {/* <a href="#" className="link">read more <i className="fas fa-arrow-right"></i></a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="section-heading">
                                <h5 className="subtitle">
                                    Try to check out our
                                </h5>
                                <h2 className="title">
                                    Avatar Generation game
                                </h2>
                                <p className="text">
                                    Check out our latest game! To meet today's challenges & earn cryptocurrency. Top 100 players receive special avatar every hour!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="game-slider">
                                <div className="item">
                                    <div className="single-game">
                                        <img src="../images/game/icon1.png" alt="" />
                                        <a href="/play-nft-game" className="mybtn2">PLay NoW !</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="activities">
                <img className="shape shape1" src="../images/people/shape1.png" alt="" />
                <img className="shape shape2" src="../images/people/shape2.png" alt="" />
                <img className="shape shape3" src="../images/people/shape3.png" alt="" />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="section-heading">
                                <h5 className="subtitle">
                                    The Smarter Way
                                </h5>
                                <h2 className="title">
                                    Get your First NFT
                                </h2>
                                <p className="text">
                                    The India's First Crypto Gaming Marketplace.
                                    <br></br>
                                    Recently generated Avatar.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-all-bets" role="tabpanel" aria-labelledby="pills-all-bets-tab">
                                    <div className="responsive-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">USER</th>
                                                    <th scope="col">BET ID</th>
                                                    <th scope="col">BET AMOUNT</th>
                                                    <th scope="col">CHANCE</th>
                                                    <th scope="col">GAME</th>
                                                    <th scope="col">PROFIT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p1.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-my-bets" role="tabpanel" aria-labelledby="pills-my-bets-tab">
                                    <div className="responsive-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">USER</th>
                                                    <th scope="col">BET ID</th>
                                                    <th scope="col">BET AMOUNT</th>
                                                    <th scope="col">CHANCE</th>
                                                    <th scope="col">GAME</th>
                                                    <th scope="col">PROFIT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p1.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p2.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p3.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p4.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p5.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p6.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p1.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p2.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p3.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p4.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-my-jackpots" role="tabpanel" aria-labelledby="pills-my-jackpots-tab">
                                    <div className="responsive-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">USER</th>
                                                    <th scope="col">BET ID</th>
                                                    <th scope="col">BET AMOUNT</th>
                                                    <th scope="col">CHANCE</th>
                                                    <th scope="col">GAME</th>
                                                    <th scope="col">PROFIT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p1.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p2.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p3.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p4.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p5.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p6.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon1.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p1.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon2.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p2.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon3.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p3.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon4.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src="../images/people/p4.png" alt="" />
                                                        Tom Bass
                                                    </td>
                                                    <td>
                                                        b799b8724b
                                                    </td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                    <td>70%</td>
                                                    <td>Dice</td>
                                                    <td>
                                                        <img src="../images/icon5.png" alt="" />
                                                        0.00000051
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="funfact">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="single-fun">
                                    <img src="../images/funfact/icon1.png" alt="" />
                                    <div className="count-area">
                                        <div className="count">93K</div>
                                    </div>
                                    <p>
                                        Players
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-fun">
                                    <img src="../images/funfact/icon2.png" alt="" />
                                    <div className="count-area">
                                        <div className="count">New</div>
                                    </div>
                                    <p>
                                        Avatar
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-fun">
                                    <img src="../images/funfact/icon3.png" alt="" />
                                    <div className="count-area">
                                        <div className="count">70+</div>
                                    </div>
                                    <p>
                                        Avatar is Generated
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="get-start">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex align-self-center">
                            <div className="left-area">
                                <div className="section-heading">
                                    <h5 className="subtitle">
                                        every day lots of get new avatar
                                    </h5>
                                    <h2 className="title ">
                                        be one of them
                                    </h2>
                                    <p className="text">
                                        Get started in less than 2 min - no credit card
                                        required.Gain early access to Cryptonium Game and  experience crypto like never before.
                                    </p>
                                    <a href="/play-nft-game" className="mybtn1">Play  Now!</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="right-image">
                                <img src="../images/get-start.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
