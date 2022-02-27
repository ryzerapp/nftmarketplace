import NavbarTwo from "../components/Layout/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import AuthForm from "../components/Register/AuthForm";

const Register = () => {
	return (
		<>
			{/* <PageBanner
				bannerHeading="Register"
				parentTitle="Discover"
				pageTitle="Register"
				bg="inner-bg5"
			/> */}

			<div className="user-area pt-50 pb-70">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="user-all-form">
								<div className="contact-form">
									<h3> Create Account </h3>
									<div className="bar"></div>
									<AuthForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default Register;
