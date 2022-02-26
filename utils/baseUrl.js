const baseUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_REST_API_ENDPOINT
		: process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export default baseUrl;
