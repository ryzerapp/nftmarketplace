import Router from "next/router";
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
};

export const handleLogoutLogin = () => {
	removeAuthCredentials()
};