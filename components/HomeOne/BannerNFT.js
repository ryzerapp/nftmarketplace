import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import formatDate from "../../utils/formatDate";

const BannerNFT = ({ data }) => {
	const router = useRouter();
	const [days, setDays] = React.useState("");
	const [hours, setHours] = React.useState("");
	const [minutes, setMinutes] = React.useState("");
	const [seconds, setSeconds] = React.useState("");

	const isFirstRun = React.useRef(true);

	React.useEffect(() => {
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

	React.useEffect(() => {
		setInterval(() => {
			comingSoonTime();
		}, 1000);
	}, []);
	return (
		<div className="col-lg-6 col-sm-6">
			<div
				className={`banner-card ${data.id > 2 ? "banner-card-mt" : ""}`}
			>
				<div className="banner-card-img">
					<img src={data.auctionImg.url} alt="Images" />
					<div className="banner-card-content">
						<div className="card-left">
							<span>Start Bid</span>
							<h3>
								{data.cryptoCost} {data.cryptoType}
							</h3>
						</div>
						<div className="card-right">
							<h3>Remaining Time</h3>
							<div
								className="timer-text"
								data-countdown="2021/09/09"
							>
								{days}:{hours}:{minutes}:{seconds}
							</div>
						</div>
					</div>
				</div>

				<div className="content">
					<div className="banner-user-list">
						<div className="banner-user-list-img">
							<Link href="/author-profile">
								<a>
									<img
										src="../images/home-one/home-one-user2.jpg"
										alt="Images"
									/>
								</a>
							</Link>
							<i className="ri-check-line"></i>
						</div>
						<h3>
							<Link href="/nft/[slug]" as={`/nft/${data.slug}`}>
								<a>{data.name}</a>
							</Link>
						</h3>
						<span>
							Created by
							<Link href="/author-profile">
								<a>@Adison</a>
							</Link>
						</span>
					</div>
					<Link href="/author-profile">
						<a className="banner-user-btn">
							<i className="ri-arrow-right-line"></i>
						</a>
					</Link>
					<button
						type="button"
						className="default-btn border-radius-5"
						onClick={() => router.push("/add-wallet")}
					>
						Place Bid
					</button>
				</div>
			</div>
		</div>
	);
};

export default BannerNFT;
