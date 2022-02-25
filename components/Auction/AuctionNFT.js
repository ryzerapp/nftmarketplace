import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import formatDate from "../../utils/formatDate";

const AuctionNFT = ({ data }) => {
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
	// console.log("$$$$", formatDate("2021-11-12T06:30:00.000Z"));

	const comingSoonTime = () => {
		let endTime = new Date(formatDate(data.auctionEnds));
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
		setInterval(() => {
			comingSoonTime();
		}, 1000);
	}, []);
	return (
		<div className="col-lg-4 col-md-6">
			<div className="auction-card">
				<div className="auction-card-img">
					<Link href="/nft/[slug]" as={`/nft/${data.slug}`}>
						<a>
							<img src={data.auctionImg.url} alt="Images" />
						</a>
					</Link>
					<div className="auction-card-user">
						<a
							href="author-profile.html"
							className="auction-card-user-option"
						>
							<img
								src="../images/auctions/auctions-user2.jpg"
								alt="Images"
							/>
							<span>Created by @Emilia</span>
						</a>
					</div>
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

				<div className="content">
					<h3>
						{" "}
						<Link href="/nft/[slug]" as={`/nft/${data.slug}`}>
							<a>{data.name}</a>
						</Link>
					</h3>
					<p>
						<i className="ri-heart-line"></i> 162
					</p>
					<div className="auction-card-content">
						<div className="card-left">
							<span>Start Bid</span>
							<h4>
								{data.cryptoCost} {data.cryptoType}
							</h4>
						</div>
						<div className="card-right">
							<span>Highest Bid</span>
							<h4>12,00 ETH</h4>
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
