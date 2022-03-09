import React from "react";
import AuctionDetailsDescription from "../Auction/AuctionDetailsDescription";
import AuctionDetailsHistory from "../Auction/AuctionDetailsHistory";

const AuctionDetailsArea = ({ data }) => {
	return (
		<>
			<div className="item-details-area pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="item-details-left-side pr-20">
								<div className="item-details-img">
									<img
										src={data?.auctionImage}
										alt="Images"
									/>
								</div>

								<AuctionDetailsHistory data={data} />{/*this is for bid part */}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="item-details-dsce">
								<AuctionDetailsDescription data={data} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionDetailsArea;
