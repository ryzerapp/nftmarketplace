import React from "react";
import { usegetAuctions } from "../../hooks/Web2/useAuctions";
import Pagination from "../Common/Pagination";
import AuctionNFT from "./AuctionNFT";
import Loading from '../Common/Loader'
const AuctionArea = ({ }) => {
	const { data, isLoading } = usegetAuctions()
	if (isLoading) {
		return (
			<Loading></Loading>
		)
	}
	return (
		<>
			<div className="auctions-area-three pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<h2>Live Auctions</h2>
					</div>

					<div className="row justify-content-center pt-45">
						{data && data.length > 0 ?
							data.map((auction) => {
								return <AuctionNFT key={auction.id} data={auction} />;
							}) : (
								<>
									<p>Please Wait for Some live Auction</p>
								</>
							)}

						<Pagination />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionArea;
