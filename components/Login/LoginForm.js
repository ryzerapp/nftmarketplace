import React from "react";
import { handleLogin } from "../../utils/auth";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { useWeb3 } from "../../providers/Web3Context";
import { Actions } from "../../providers/Web3Context/reducer";
import Loader from "../Common/Loader";
import { useLoginMutation } from "../../hooks/Web2/mutations/useLoginMutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";

const schema = yup
	.object({
		email: yup
			.string()
			.required("Email must be provided.")
			.email("Enter Valid Email."),
		password: yup.string().required("Password must be provided"),
	})
	.required();

const LoginForm = () => {

	const { mutate, isLoading } = useLoginMutation()
	const { dispatch } = useWeb3();
	const router = useRouter();

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			email: "",
			password: "",
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

						const { data } = error.response;

						if (data) {
							notify(data?.message);
						}
					}
				}
			);
		} catch (error) {
			const { data } = error.response;
			if (data) {
				notify(data?.message);
			}
		}
	};

	if (isLoading) {
		return (
			<Loader />
		)
	}
	return (
		<div>
			<form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-lg-12 ">
						<div className="form-group">
							<label>Email</label>
							<input
								className="form-control"
								name="email"
								type="email"
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
