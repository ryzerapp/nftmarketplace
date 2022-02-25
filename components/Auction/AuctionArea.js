import React from "react";
import Pagination from "../Common/Pagination";
import AuctionNFT from "./AuctionNFT";

const AuctionArea = ({ data }) => {
	return (
		<>
			<div className="auctions-area-three pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<h2>Live Auctions</h2>
					</div>

					<div className="row justify-content-center pt-45">
						{data.map((nft) => {
							return <AuctionNFT key={nft.id} data={nft} />;
						})}

						<Pagination />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionArea;
