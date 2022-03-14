import React from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";

const ItemDetailsDescription = ({
	data,
	collectionName = "Cryptonium",
	itemOwner,
	size,
}) => {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 pt-10">
						<div className="section-title">
							<h3>Description</h3>
							<h3 className="pt-10">{data?.description}</h3>
						</div>
						<hr></hr>
						<div className="row">
							<div className="col-lg-6 col-6">
								<div className="item-details-user">
									<h3>Creator</h3>
									<div className="content">
										<div className="images">
											<a href={`/author-profile?author_name=${data?.created_by}`}>
												<img
													src={(data?.profile_photo) ? (data?.profile_photo) : "../images/author/author-user13.png"}
													alt="Images"
												/>
												<i className="ri-check-line"></i>
											</a>
										</div>
										<span>{data?.created_by}</span>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-6">
								<div className="item-details-user">
									<h3>Collection</h3>
									<div className="content">
										<div className="images">
											<a href={`/collection-nft-details/${data?.collection_id}`}>
												<img
													src={data?.collection_logo_image ? data?.collection_logo_image : "../images/author/author-user13.png"}
													alt="Images"
												/>
											</a>
										</div>

										<span>{data?.collection_name}</span>
									</div>
								</div>
							</div>
						</div>
						<hr></hr>

						<div className="item-details-price">
							<div className="item-details-title">
								<h3>Edition : {data?.edition}</h3>
							</div>
							<ul>
								<li>
									Size
									<b>: {size ? size : "500x500"}</b>
								</li>
								<li>
									Created
									<b>: {formatDate(data?.date ? data?.date : new Date())}</b>
								</li>
								<li>
									Collection
									<b>: {collectionName}</b>
								</li>
								<li>
									Category
									<b>: {data?.category ? data?.category : "Not Assign"}</b>
								</li>
								<li>
									Total Likes:
									<b>: {data?.total_like ? data?.total_like : 0}</b>
								</li>
								<li>
									Total Bookmark:
									<b>: {data?.total_bookmark ? data?.total_bookmark : 0}</b>
								</li>
							</ul>
						</div>
						<hr></hr>

						<div className="item-details-user-item">
							<div className="images">
								<img
									src="../images/Item-details/Item-details-user3.jpg"
									alt="Images"
								/>
								<i className="ri-check-line"></i>
							</div>

							<div className="content">
								<h3>{itemOwner}</h3>
								<span>Item Owner</span>
							</div>
						</div>

						{/* <div className="item-details-in-content">
							<AuctionEnds auctionEnds={new Date()} />
							<div className="item-right">
								<h3 className="item-remaining">Highest Bid</h3>
								<h3 className="item-right-eth">15,00 ETH</h3>
							</div>
						</div> */}

						<div className="item-details-btn">
							<Link href="/add-wallet">
								<a className="default-btn border-radius-50"> Request To Author</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemDetailsDescription;
