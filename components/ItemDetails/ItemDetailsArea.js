import React from "react";
import ItemDetailsDescription from "./ItemDetailsDescription";
import ItemDetailsHistory from "./ItemDetailsHistory";
import ItemDetailsUser from "./ItemDetailsUser";

const ItemDetailsArea = ({ data }) => {
	return (
		<>
			<div className="item-details-area pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-7">
							<div className="item-details-left-side pr-20">
								<div className="item-details-img">
									<img
										src={data.auctionImg.url}
										alt="Images"
									/>
									<span>
										<i className="ri-heart-line"></i> 340
									</span>
								</div>

								<ItemDetailsHistory />
							</div>
						</div>

						<div className="col-lg-5">
							<div className="item-details-dsce">
								<ItemDetailsDescription {...data} />

								<ItemDetailsUser />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemDetailsArea;
