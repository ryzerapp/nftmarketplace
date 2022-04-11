import Link from "next/link";

const Footer = () => {
	return (
		<>
			<footer className="footer-area pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-sm-8">
							<div className="footer-widget">
								<div className="footer-logo">
									<Link href="/">
										<a>
											<img
												src="../images/footer-logo.png"
												alt="Footer Logo"
											/>
										</a>
									</Link>
								</div>
								<p style={{ color: 'white' }}>Subscribe to our newsletter</p>
								<div className="newsletter-area">
									<form
										className="newsletter-form"
										data-toggle="validator"
										method="POST"
									>
										<input
											type="email"
											className="form-control"
											placeholder="Enter Your Email"
											name="EMAIL"
											required
											autoComplete="off"
										/>
										<button
											className="subscribe-btn"
											type="submit"
										>
											Subscribe Now
										</button>
										<div
											id="validator-newsletter"
											className="form-result"
										></div>
									</form>
								</div>
							</div>
						</div>

						<div className="col-lg-2 col-sm-4">
							<div className="footer-widget ps-5">
								<h3>Marketplace</h3>
								<ul className="footer-list">
									<li>
										<Link href="/discover">
											<a>Art</a>
										</Link>
									</li>
									<li>
										<Link href="/discover">
											<a>All NFTs</a>
										</Link>
									</li>
									<li>
										<Link href="/discover">
											<a>Music</a>
										</Link>
									</li>
									<li>
										<Link href="/discover">
											<a>Trending Cards</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-sm-4">
							<div className="footer-widget ps-5">
								<h3>My Account</h3>
								<ul className="footer-list">
									<li>
										<Link href="/authors">
											<a>Authors</a>
										</Link>
									</li>
									<li>
										<Link href="/collection">
											<a>Collection</a>
										</Link>
									</li>
									<li>
										<Link href="/coming-soon">
											<a>Coming Soon</a>
										</Link>
									</li>
									<li>
										<Link href="/categories">
											<a>Categories</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-sm-4">
							<div className="footer-widget ps-5">
								<h3>Resources</h3>
								<ul className="footer-list">
									<li>
										<Link href="/help-center">
											<a>Helps & Support</a>
										</Link>
									</li>
									<li>
										<Link href="/auction">
											<a>Live Auctions</a>
										</Link>
									</li>

									<li>
										<Link href="/help-center">
											<a>Help Center</a>
										</Link>
									</li>

									<li>
										<Link href="/activity">
											<a>Activity</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-sm-4">
							<div className="footer-widget ps-5">
								<h3>Company</h3>
								<ul className="footer-list">
									<li>
										<Link href="/about">
											<a>About Us</a>
										</Link>
									</li>
									<li>
										<Link href="/contact">
											<a>Contact Us</a>
										</Link>
									</li>

									<li>
										<Link href="/blogs">
											<a>Our Blog</a>
										</Link>
									</li>
									<li>
										<Link href="/discover">
											<a>Discover</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="footer-shape">
					<div className="footer-shape1">
						<img src="../images/shape/shape-bg.png" alt="Images" />
					</div>

					<div className="footer-shape2">
						<img src="../images/shape/shape1.png" alt="Images" />
					</div>

					<div className="footer-shape3">
						<img src="../images/shape/shape2.png" alt="Images" />
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
