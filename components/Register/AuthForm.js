import React from "react";
import { handleLogin } from "../../utils/auth";
import { useRouter } from "next/router";
import { getAuthCredentials, isAuthenticated } from "../../utils/auth-utils";
import { ROUTES } from "../../utils/routes";
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import Loader from "../Common/Loader";
import { useWeb3 } from "../../providers/Web3Context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../hooks/Web2/mutations/useRegisterMutation";
import { Actions } from '../../providers/Web3Context/reducer'
const schema = yup
	.object({
		email: yup
			.string()
			.required("Email must be provided.")
			.email("Enter Valid Email."),
		password: yup.string().required("Password must be provided"),
		username: yup.string().required("Username must be provided"),
	})
	.required();

const AuthForm = () => {

	const router = useRouter();
	// const { token, permissions } = getAuthCredentials();
	// if (isAuthenticated({ token, permissions })) {
	// 	router.replace(ROUTES.DASHBOARD);
	// }

	const { dispatch } = useWeb3();
	const { mutate, isLoading } = useRegisterMutation()

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			email: "",
			password: "",
			username: ""
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {

		try {
			mutate(
				{ ...data },
				{
					onSuccess: (res) => {
						if (res?.data?.statusCode == 200) {
							handleLogin(res?.data);
							notify(res?.data?.message)
							router.replace('/discover')
							dispatch({ type: Actions.SET_USER, user: res?.data?.user })
						}
						else {
							notify(res?.data?.message)
						}
					},
					onError: (error) => {
						const { data } = error.response.data;
						if (data) {
							notify(data[0].messages[0].message);
						}
						console.log(err);
					}
				}
			);
		} catch (error) {
			const { data } = error.response.data;
			if (data) {
				toast.error(data[0].messages[0].message);
			}
			setLoader(false)
		}
	};
	if (isLoading) {
		return (
			<Loader />
		)
	}
	return (
		<>
			<form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-lg-12">
						<div className="form-group">
							<label>Your Name</label>
							<input
								type="text"
								className="form-control"
								name="username"
								{...register("username")}
							/>
							<ErrorMessage
								errors={errors}
								name="username"
								render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
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
								{...register("email")}
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
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
								{...register("password")}
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
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
