import React from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";
import { useRouter } from "next/router";
import { getAuthCredentials, isAuthenticated } from "../../utils/auth-utils";
import { ROUTES } from "../../utils/routes";
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

const INITIAL_USER = {
	email: "",
	password: "",
};

const LoginForm = () => {

	const router = useRouter();
	const { token, permissions } = getAuthCredentials();
	const { setUserData } = useMoralisDapp()
	if (isAuthenticated({ token, permissions })) {
		router.replace(ROUTES.DASHBOARD);
	}

	const [user, setUser] = React.useState(INITIAL_USER);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${baseUrl}/auth/login`;
			const payload = {
				email: user.email,
				password: user.password,
			};
			await axios.post(url, payload).then(res => {
				if (res?.data?.statusCode == 200) {
					handleLogin(res?.data);
					setUserData(res?.data?.user)
				}
				else {
					notify(res?.data?.message)
				}
			})
				.catch((err) => {
					notify(err?.response?.data?.message)
				});
		} catch (error) {
			const { data } = error.response.data;
			console.log(error);
			if (data) {
				toast.error(data[0].messages[0].message);
			}
		}
	};

	return (
		<div>
			<form id="contactForm" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-lg-12 ">
						<div className="form-group">
							<label>Email</label>
							<input
								type="text"
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

					<div className="col-lg-12 form-condition">
						<div className="agree-label">
							<input type="checkbox" id="chb1" />
							<label htmlFor="chb1">
								Remember Me
								<a
									className="forget"
									href="forgot-password.html"
								>
									Forgot My Password?
								</a>
							</label>
						</div>
					</div>

					<div className="col-lg-12 col-md-12 text-center">
						<button type="submit" className="default-btn">
							Log In Now
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
								<a
									href="/register"
								>
									Sign Up
								</a>
							</li>
							<li>
								<a
									href="https://www.facebook.com/"
									target="_blank"
								>
									<i className="ri-facebook-line"></i>
									Login with Facebook
								</a>
							</li>

							<li>
								<a
									href="https://www.google.com/"
									target="_blank"
								>
									<i className="ri-google-line"></i>
									Login with Google
								</a>
							</li>
						</ul>
					</div>
				</div>
			</form>
			<Toaster></Toaster>
		</div>
	);
};

export default LoginForm;
