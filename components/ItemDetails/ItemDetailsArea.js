import React from "react";
import ItemDetailsDescription from "./ItemDetailsDescription";
import ItemDetailsHistory from "./ItemDetailsHistory";

const ItemDetailsArea = ({ data }) => {
	return (
		<>
			<div className="item-details-area pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="item-details-left-side pr-20">
								<div className="item-details-img">
									<img
										src={data?.image_url}
										alt="Images"
									/>
								</div>

								<ItemDetailsHistory />{/*this is for bid part */}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="item-details-dsce">
								<ItemDetailsDescription data={data} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemDetailsArea;
