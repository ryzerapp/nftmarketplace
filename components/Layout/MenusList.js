import React from "react";
import Link from "next/link";
import { handleLogout } from "../../utils/auth";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

const MenusList = ({ user }) => {
	const { isAuthenticated } = useMoralis();
	console.log(isAuthenticated)
	return (
		<div className="container-fluid">
			<nav className="navbar navbar-expand-md navbar-light">
				<Link href="/">
					<a className="navbar-brand">
						<img
							src="/images/logo.png"
							alt="Logo"
							className="white-logo"
						/>

						<img
							src="/images/logo-2.png"
							alt="Logo"
							className="black-logo"
						/>
					</a>
				</Link>

				<div className="nav-widget-form">
					<form className="search-form">
						<input
							type="search"
							className="form-control"
							placeholder="Search items, Creators "
						/>
						<button type="submit">
							<i className="ri-search-line"></i>
						</button>
					</form>
				</div>

				<div
					className="collapse navbar-collapse mean-menu"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav m-auto">
						{/* <li className="nav-item">
							<a href="#" className="nav-link active">
								Home
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link href="/" activeClassName="active">
										<a className="nav-link active">
											Home One
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/index-2"
										activeClassName="active"
									>
										<a className="nav-link">Home Two</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/index-3"
										activeClassName="active"
									>
										<a className="nav-link">Home Three</a>
									</Link>
								</li>
							</ul>
						</li> */}

						<li className="nav-item">
							<a href="#" className="nav-link ">
								Discover
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href="/activity"
										activeClassName="active"
									>
										<a className="nav-link">Activity</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/auction"
										activeClassName="active"
									>
										<a className="nav-link">Live Auction</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/discover"
										activeClassName="active"
									>
										<a className="nav-link">
											Discover Exclusive Digital Assets
										</a>
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item">
							<a href="#" className="nav-link">
								Collection
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href="/collection"
										activeClassName="active"
									>
										<a className="nav-link">Collection</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/create-collection"
										activeClassName="active"
									>
										<a className="nav-link">
											Create Collection
										</a>
									</Link>
								</li>



								{/* <li className="nav-item">
									<Link
										href="/author-profile"
										activeClassName="active"
									>
										<a className="nav-link">
											Author Profile
										</a>
									</Link>
								</li> */}

								{/* <li className="nav-item">
									<Link href="/team" activeClassName="active">
										<a className="nav-link">Team</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/testimonials"
										activeClassName="active"
									>
										<a className="nav-link">Testimonials</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/contact"
										activeClassName="active"
									>
										<a className="nav-link">Contact Us</a>
									</Link> 
								</li>*/}

								{/* <li className="nav-item">
									<Link
										href="/terms-condition"
										activeClassName="active"
									>
										<a className="nav-link">
											Terms & Conditions
										</a>
									</Link>
								</li> */}

								{/* <li className="nav-item">
									<Link
										href="/privacy-policy"
										activeClassName="active"
									>
										<a className="nav-link">
											Privacy Policy
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link href="/404" activeClassName="active">
										<a className="nav-link">404 Page</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/coming-soon"
										activeClassName="active"
									>
										<a className="nav-link">Coming Soon</a>
									</Link>
								</li> */}
							</ul>
						</li>

						<li className="nav-item">
							<a href="#" className="nav-link">
								Community
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href="/about"
										activeClassName="active"
									>
										<a className="nav-link">About Us</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/authors"
										activeClassName="active"
									>
										<a className="nav-link">Authors</a>
									</Link>
								</li>
								{/* <li className="nav-item">
									<Link
										href="/add-wallet"
										activeClassName="active"
									>
										<a className="nav-link">Add Wallet</a>
									</Link>
								</li> */}

								<li className="nav-item">
									<Link
										href="/blogs"
										activeClassName="active"
									>
										<a className="nav-link">
											Blogs
										</a>
									</Link>
									{/* <i className="ri-arrow-down-s-line"></i> */}
									{/* <ul className="dropdown-menu">
										<li className="nav-item">
											<Link
												href="/blog-1"
												activeClassName="active"
											>
												<a className="nav-link">
													Blog Grid
												</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href="/blog-2"
												activeClassName="active"
											>
												<a className="nav-link">
													Blog Left Sidebar
												</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href="/blog-3"
												activeClassName="active"
											>
												<a className="nav-link">
													Blog Right Sidebar
												</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href="/blog-details"
												activeClassName="active"
											>
												<a className="nav-link">
													Blog Details
												</a>
											</Link>
										</li>

										<li className="nav-item">
											<Link
												href="/categories"
												activeClassName="active"
											>
												<a className="nav-link">
													Categories
												</a>
											</Link>
										</li>

										<li className="nav-item">
											<Link
												href="/tags"
												activeClassName="active"
											>
												<a className="nav-link">Tags</a>
											</Link>
										</li>
									</ul> */}
								</li>

								<li className="nav-item">
									<Link
										href="/help-center"
										activeClassName="active"
									>
										<a className="nav-link">Help Center</a>
									</Link>
								</li>
							</ul>
						</li>

						{/* <li className="nav-item">
							<a href="#" className="nav-link">
								{user ? user?.username : "Account"}
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								{user ? (
									<>
										<li className="nav-item">
											<Link href="#">
												<a
													className="nav-link"
													onClick={(e) => {
														e.preventDefault();
														handleLogout();
													}}
												>
													Logout
												</a>
											</Link>
										</li>
									</>
								) : (
									<>
										<li className="nav-item">
											<Link
												href="/login"
												activeClassName="active"
											>
												<a className="nav-link">
													Log In
												</a>
											</Link>
										</li>
										<li className="nav-item">
											<Link
												href="/register"
												activeClassName="active"
											>
												<a className="nav-link">
													Register
												</a>
											</Link>
										</li>
											<li className="nav-item">
												<Link
													href="/yournfts"
													activeClassName="active"
												>
													<a className="nav-link">
														Your NFT
													</a>
												</Link>
											</li>
									</>
								)}
							</ul>
						</li> */}

						<li className="nav-item">
							<a href="#" className="nav-link">
								NFT'S
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href="/play-nft-game"
										activeClassName="active"
									>
										<a className="nav-link">Play Game</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/yournfts"
										activeClassName="active"
									>
										<a className="nav-link">
											Your NFT
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href="/create-collection"
										activeClassName="active"
									>
										<a className="nav-link">Create New NFT</a>
									</Link>
								</li>
							</ul>
						</li>

					</ul>
					<div className="others-options">

						<ul className="optional-item-list">
							{user?.status == true ? (
								<li>
									<a onClick={() => handleLogout()}>Logout</a>
								</li>
							) : (
									<li>
										<Link
											href="/login"
											activeClassName="active"
										>
											<a>Login</a>
										</Link>
									</li>
							)}

							<li>

								<Link
									href="/add-wallet"
									activeClassName="active"
								>
									<a className="active">{
										isAuthenticated == false ? "Connect Wallet" : "MeataMask Connected"
									}</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default MenusList;
