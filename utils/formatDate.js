const formatDate = (date) => {
	const month = new Date(date).toLocaleString("en-US", { month: "long" }); // January
	const day = new Date(date).toLocaleString("en-US", { day: "numeric" }); // 9
	const year = new Date(date).toLocaleString("en-US", {
		year: "numeric",
	}); // 2021
	const hour = new Date(date).toLocaleString("en-US", {
		hour: "numeric",
		hour12: false,
	}); // 10
	const minute = new Date(date).toLocaleString("en-US", {
		minute: "numeric",
	}); // 15
	const second = new Date(date).toLocaleString("en-US", {
		second: "numeric",
	}); // 05
	return `${month} ${day}, ${year} ${hour}:${minute}:${second}0`; // August 23, 2022 17:00:00
};

export default formatDate;
