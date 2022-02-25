import React from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";
import AuctionEnds from "./AuctionEnds";

const ItemDetailsDescription = ({
	description,
	collectionName,
	itemOwner,
	itemOwnerPhoto,
	size,
	created_at,
	categories,
	auctionEnds,
}) => {
	return (
		<>
			<div className="section-title">
				<h2>Description</h2>
				<p>{description}</p>
			</div>

			<div className="row">
				<div className="col-lg-6 col-6">
					<div className="item-details-user">
						<h3>Creator</h3>
						<div className="content">
							<div className="images">
								<img
									src="../images/Item-details/Item-details-user2.jpg"
									alt="Images"
								/>
								<i className="ri-check-line"></i>
							</div>

							<span>@HiBootstrap</span>
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-6">
					<div className="item-details-user">
						<h3>Collection</h3>
						<div className="content">
							<div className="images">
								<img
									src="../images/Item-details/Item-details-user1.jpg"
									alt="Images"
								/>
							</div>

							<span>{collectionName}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="item-details-price">
				<div className="item-details-title">
					<h3>Current Price 324 ETH</h3>
					<p>$1200</p>
					<span>1/10</span>
				</div>
				<ul>
					<li>
						Size
						<b>: {size}</b>
					</li>
					<li>
						Created
						<b>: {formatDate(created_at)}</b>
					</li>
					<li>
						Collection
						<b>: {collectionName}</b>
					</li>
					<li>
						Category
						<b>: {categories ? categories[0].name : "Empty"}</b>
					</li>
				</ul>
			</div>

			<div className="item-details-user-item">
				<div className="images">
					<img src={itemOwnerPhoto.url} alt="Images" />
					<i className="ri-check-line"></i>
				</div>

				<div className="content">
					<h3>{itemOwner}</h3>
					<span>Item Owner</span>
				</div>
			</div>

			<div className="item-details-in-content">
				<AuctionEnds auctionEnds={auctionEnds} />
				<div className="item-right">
					<h3 className="item-remaining">Highest Bid</h3>
					<h3 className="item-right-eth">15,00 ETH</h3>
				</div>
			</div>

			<div className="item-details-btn">
				<Link href="/add-wallet">
					<a className="default-btn border-radius-50"> Place Bid</a>
				</Link>
			</div>
		</>
	);
};

export default ItemDetailsDescription;
