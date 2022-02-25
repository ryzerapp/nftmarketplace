import React from "react";
import Link from "next/link";
import BannerNFT from "./BannerNFT";

const BannerArea = ({ data }) => {
	return (
		<>
			<div className="banner-area">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="banner-content">
								<span>Buying & Selling NFT World</span>
								<h1>
									Discover, Collect, and Sell Extraordinary
									NFTs
								</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Sed aliquam etiam rhoncus
									aenean a iaculis aliquet rhoncus sed.
									Accumsan sit consequat, sodales consectetur.
									Egestas scelerisque ut dui sed nulla morbi
									quam eget luctus. In a vel morbi sed nisi.
								</p>
								<div className="banner-btn">
									<Link href="/about">
										<a className="default-btn border-radius-5">
											Explore More
										</a>
									</Link>
									<Link href="/add-wallet">
										<a className="default-btn two border-radius-5">
											Connect NFT
										</a>
									</Link>
								</div>
							</div>
						</div>

						<div className="col-lg-6">
							<div className="banner-card-area">
								<div className="row">
									{data.map((nft) => {
										return (
											<BannerNFT
												key={nft.id}
												data={nft}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="banner-shape">
					<div className="shape-circle1">
						<img
							src="../images/home-one/circle1.png"
							alt="Images"
						/>
					</div>

					<div className="shape-circle2">
						<img
							src="../images/home-one/circle2.png"
							alt="Images"
						/>
					</div>

					<div className="shape-bg">
						<img
							src="../images/home-one/bg-shape.png"
							alt="Images"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default BannerArea;
