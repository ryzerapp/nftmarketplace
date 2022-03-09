import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthorLink from "../SmallComponent/AuthorLink";

const NftCardWithoutTime = ({ data }) => {
	const router = useRouter();
	return (
		<div className="trending-item">
			<div className="trending-img">
				<Link href="/nft/[slug]" as={`/nft/${data?.id}`}>
					<a>
						<img src={data?.image_url} alt="Images" />
					</a>
				</Link>


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
				<div className="trending-user">
					<AuthorLink
						data={
							{
								"created_by": data?.created_by,
								"profile_photo": data?.profile_photo
							}}
						classNameData={"trending-user-option"}
					/>
				</div>
			</div>

			<div className="content">
				<h3>
					<Link href="/nft/[slug]" as={`/nft/${data?.id}`}>
						<a>{data?.name}</a>
					</Link>
				</h3>
				<span>
					<i className="ri-heart-line"></i> {data?.total_like ? data?.total_like : 0}
					<i className="ri-bookmark-line"></i> {data?.total_bookmark ? data?.total_bookmark : 0}
				</span>
			</div>
		</div>
	);
};

export default NftCardWithoutTime;
