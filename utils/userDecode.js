import jwt from "jsonwebtoken";

/**
 *
 * @param {jwt} token
 * @returns useri information from token
 */
export const userDecode = (token) => {
	let decoded = jwt.decode(token);
	return decoded;
};
