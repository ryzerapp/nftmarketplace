import React from "react";
import formatDate from "../../utils/formatDate";

const AuctionEnds = ({ auctionEnds }) => {
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
	}, [auctionEnds]);
	// console.log("$$$$", formatDate("2021-11-12T06:30:00.000Z"));

	const comingSoonTime = () => {
		let endTime = new Date(formatDate(auctionEnds));
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
		<div className="item-left">
			<span>Auction Ends In</span>
			<div className="timer-text" data-countdown="2021/11/11">
				{days}:{hours}:{minutes}:{seconds}
			</div>
		</div>
	);
};

export default AuctionEnds;
