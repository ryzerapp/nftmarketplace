import cookie from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";
import { removeAuthCredentials, setAuthCredentials } from "./auth-utils";

/**
 *
 * @param {jwt} token
 * After login then jwt stores on cookies
 */
export const handleLogin = (data) => {
	setAuthCredentials(data?.token, data?.permissions);
};

/**
 *
 * @param {*} ctx
 * @param {*} location
 * Redirect user
 */
export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
};

/**
 * Logout
 */
export const handleLogout = () => {
	localStorage.removeItem('walletAddress')
	removeAuthCredentials()
	toast.success("Logout successful");
};

export const handleLogoutLogin = () => {
	removeAuthCredentials()
};