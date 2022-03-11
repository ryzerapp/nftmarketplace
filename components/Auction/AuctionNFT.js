import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";

const AuctionNFT = ({ data, isfromProfile }) => {
	const [days, setDays] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");

	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		comingSoonTime();
	}, [data]);

	const comingSoonTime = () => {
		let endTime = new Date(formatDate(data?.auctionDate));
		let endTimeParse = Date.parse(endTime) / 1000;
		let now = new Date();
		let nowParse = Date.parse(now) / 1000;
		let timeLeft = endTimeParse - nowParse;
		let countdays = Math.floor(timeLeft / 86400);
		let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
		let countminutes = Math.floor(
			(timeLeft - countdays * 86400 - counthours * 3600) / 60
		);
		let countseconds = Math.floor(
			timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
		);
		if (counthours < "10") {
			counthours = "0" + counthours;
		}
		if (countminutes < "10") {
			countminutes = "0" + countminutes;
		}
		if (countseconds < "10") {
			countseconds = "0" + countseconds;
		}
		setDays(countdays);
		setHours(counthours);
		setMinutes(countminutes);
		setSeconds(countseconds);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			comingSoonTime();
		}, 1000);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="col-lg-4 col-md-6">
			<div className="auction-card">
				<div className="auction-card-img">
					<Link href="/auction/[slug]" as={`/auction/${data?.id}`}>
						<a>
							<img src={data.auctionImage} alt="Images" />
						</a>
					</Link>
					{isfromProfile ? null : (
						<div className="auction-card-user">
							<a
								href={`author-profile?author_name=${data?.author?.username}`}
								className="auction-card-user-option"
							>
								<img
									src={data?.author?.profile_photo ? data?.author?.profile_photo
										: "../images/author/author-user13.png"}
									alt="Images"
								/>
								<span>Created by @{data?.author?.username}</span>
							</a>
						</div>
					)}

					<div className="auction-card-into">
						<h3>Remaining Time</h3>
						<div className="auction-timer">
							<div
								className="auction-title"
								data-countdown="2021/10/10"
							>
								{days}:{hours}:{minutes}:{seconds}
							</div>
						</div>
					</div>
				</div>

				<div className="content text-center">
					<h3>
						{" "}
						<Link href="/auction/[slug]" as={`/auction/${data?.id}`}>
							<a>{data.name}</a>
						</Link>
					</h3>
					<div className="d-flex justify-content-between">
						<div className="card-left">
							<span>Start Bid</span>
							<h4>
								{data?.start_bid ? data?.start_bid : 10} ETH
							</h4>
						</div>
						<div className="card-right">
							<span>Highest Bid</span>
							<h4>{data?.highest_bid ? data?.highest_bid : 0} ETH</h4>
						</div>
						<div className="card-right">
							<span>Total Bid</span>
							<h4>{data?.bids ? data?.bids?.length : 0}</h4>
						</div>

					</div>
					<Link href="/add-wallet">
						<a className="place-btn">Place Bid</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuctionNFT;
