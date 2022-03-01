import React from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { handleLogin, redirectUser } from "../../utils/auth";
import { useRouter } from "next/router";
import { getAuthCredentials, isAuthenticated } from "../../utils/auth-utils";
import { ROUTES } from "../../utils/routes";
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { Watch } from 'react-loader-spinner'
import Loader from "../Common/Loader";
import { useWeb3 } from "../../providers/Web3Context";

const INITIAL_USER = {
	username: "",
	email: "",
	password: "",
};

const AuthForm = () => {

	const router = useRouter();
	const { token, permissions } = getAuthCredentials();
	if (isAuthenticated({ token, permissions })) {
		router.replace(ROUTES.DASHBOARD);
	}

	const [user, setUser] = React.useState(INITIAL_USER);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};
	const [loader, setLoader] = React.useState(false);
	const { dispatch } = useWeb3();
	/**
	 *
	 * @param {username, email, password} e
	 * registration form
	 */

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoader(true)

			const url = `${baseUrl}/auth/register`;
			const payload = {
				username: user.username,
				email: user.email,
				password: user.password,
			};
			await axios.post(url, payload).then((res) => {
				if (res?.data?.statusCode == 200) {
					setLoader(false)
					handleLogin(res?.data);
					notify(res?.data?.message)
					dispatch({ type: Actions.SET_USER, user: res?.data?.user })
				}
				else {
					notify(res?.data?.message)
				}
			})
				.catch((err) => {
					setLoader(false)
					notify(err?.response?.data?.message)
				});;
			setLoader(false)
			setUser(INITIAL_USER);
		} catch (error) {
			const { data } = error.response.data;
			if (data) {
				toast.error(data[0].messages[0].message);
			}
			setLoader(false)
		}
	};
	if (loader) {
		return (
			<Loader />
		)
	}
	return (
		<>
		<form id="contactForm" onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-lg-12">
					<div className="form-group">
						<label>Your Name</label>
						<input
							type="text"
							className="form-control"
							name="username"
							value={user.username}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-lg-12 ">
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							name="email"
							type="email"
							value={user.email}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-12">
					<div className="form-group">
						<label>Password</label>
						<input
							className="form-control"
							name="password"
							type="password"
							value={user.password}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="col-lg-12 col-md-12 text-center">
					<button type="submit" className="default-btn">
						Register Now
					</button>
				</div>

				<div className="col-12">
					<div className="sub-title">
						<span>Or</span>
					</div>
				</div>

				<div className="login-with-account">
					<ul>
						<li>
							<a href="https://www.facebook.com/" target="_blank">
								<i className="ri-facebook-line"></i>
								Login with Facebook
							</a>
						</li>

						<li>
							<a href="https://www.google.com/" target="_blank">
								<i className="ri-google-line"></i>
								Login with Google
							</a>
						</li>
					</ul>
				</div>
			</div>
		</form>
			<Toaster></Toaster>
		</>
	);
};

export default AuthForm;
