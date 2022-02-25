import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NftCardWithoutTime = ({ data }) => {
	const router = useRouter();
	return (
		<div className="trending-item">
			<div className="trending-img">
				<Link href="/nft/[slug]" as={`/nft/${data?.slug}`}>
					<a>
						<img src={data?.auctionImg?.url} alt="Images" />
					</a>
				</Link>

				<div className="trending-user">
					<Link href="/author-profile">
						<a className="trending-user-option">
							<img
								src="../images/trending/trending-user1.jpg"
								alt="Images"
							/>
							<span>Created by @HiBootstrap</span>
						</a>
					</Link>
				</div>
				<button
					type="button"
					className="default-btn border-radius-5"
					onClick={() => router.push("/add-wallet")}
				>
					Place Bid
				</button>
				<div className="trending-title">
					<span>
						{data?.cryptoCost} {data?.cryptoType} 12/14
					</span>
					<h3>Bid 80 ETH</h3>
				</div>
			</div>

			<div className="content">
				<h3>
					<Link href="/nft/[slug]" as={`/nft/${data?.slug}`}>
						<a>{data?.name}</a>
					</Link>
				</h3>
				<span>
					<i className="ri-heart-line"></i> 340
				</span>
			</div>
		</div>
	);
};

export default NftCardWithoutTime;
