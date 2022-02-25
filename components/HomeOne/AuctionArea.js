import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Link from "next/link";
import { useRouter } from "next/router";

const options = {
	loop: true,
	margin: 0,
	nav: false,
	mouseDrag: false,
	dots: true,
	autoplay: true,
	smartSpeed: 500,
	responsive: {
		0: {
			items: 1,
		},
		768: {
			items: 2,
		},
		1000: {
			items: 3,
		},
	},
};

const AuctionArea = ({ data }) => {
	const router = useRouter();
	const [display, setDisplay] = useState(false);
	const [isMounted, setisMounted] = useState(false);

	useEffect(() => {
		setisMounted(true);
		setDisplay(true);
	}, []);

	return (
		<>
			<div className="auctions-area pb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-8 col-md-8">
							<div className="section-title">
								<h2>Live Auctions</h2>
							</div>
						</div>

						<div className="col-lg-4 col-md-4">
							<div className="auction-btn text-end">
								<a
									href="auction.html"
									className="default-btn border-radius-5"
								>
									Explore More
								</a>
							</div>
						</div>
					</div>

					<div className="auctions-slider owl-theme pt-45">
						{display ? (
							<OwlCarousel {...options}>
								{data.map((nft) => {
									return (
										<div
											className="auction-item"
											key={nft.id}
										>
											<div className="auction-item-img">
												<Link
													href="/nft/[slug]"
													as={`/nft/${nft.slug}`}
												>
													<a>
														<img
															src={
																nft.auctionImg
																	.url
															}
															alt="Images"
														/>
													</a>
												</Link>
												<div className="auction-item-content">
													<div className="auction-left">
														<span>Start Bid</span>
														<h3>15,00 ETH</h3>
													</div>
													<div className="auction-right">
														<h3>Bid 80 ETH</h3>
														<div
															className="auction-text"
															data-countdown="2021/10/10"
														></div>
													</div>
												</div>
											</div>

											<div className="content">
												<div className="auction-item-list">
													<div className="auction-item-list-img">
														<Link href="/author-profile">
															<a>
																<img
																	src="../images/auctions/auctions-user1.jpg"
																	alt="Images"
																/>
															</a>
														</Link>
														<i className="ri-check-line"></i>
													</div>
													<h3>
														<Link
															href="/nft/[slug]"
															as={`/nft/${nft.slug}`}
														>
															<a>{nft.name}</a>
														</Link>
													</h3>
													<span>
														Created by
														<Link href="/author-profile">
															<a>@Emilia</a>
														</Link>
													</span>
												</div>
												<Link href="/author-profile">
													<a className="auction-item-btn">
														<i className="ri-arrow-right-line"></i>
													</a>
												</Link>
												<button
													type="button"
													className="default-btn border-radius-5"
													onClick={() =>
														router.push(
															"/add-wallet"
														)
													}
												>
													Place Bid
												</button>
											</div>
										</div>
									);
								})}
							</OwlCarousel>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionArea;
