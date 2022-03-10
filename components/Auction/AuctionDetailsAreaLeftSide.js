import React from "react";
import AuctionDetailsDescriptionRightSide from "./AuctionDetailsDescriptionRightSide";
import AuctionBids from "./AuctionBids";

const AuctionDetailsAreaLeftSide = ({ data }) => {
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
								<AuctionBids bids={data?.bids} />{/*this is for bid part */}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="item-details-dsce">
								<AuctionDetailsDescriptionRightSide data={data} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionDetailsAreaLeftSide;
