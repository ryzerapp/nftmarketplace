const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://localhost:1337/api"
		: "http://localhost:1337/api";

export default baseUrl;
