import NavbarTwo from "../components/Layout/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";

import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
	return (
		<>
			<NavbarTwo />
			{/* <PageBanner
				bannerHeading="Log In"
				parentTitle="Pages"
				pageTitle="Log In"
				bg="inner-bg4"
			/> */}

			<div className="user-area pt-100 pb-70">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="user-all-form">
								<div className="contact-form">
									<h3> Log In Now</h3>
									<LoginForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
			<Copyright />
		</>
	);
};

export default Login;
