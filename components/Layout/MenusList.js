import React from "react";
import Link from "next/link";
import { handleLogout } from "../../utils/auth";
import { useMoralis } from "react-moralis";
import { getAuthCredentials, isAuthenticated } from "../../utils/auth-utils";

const MenusList = ({ user }) => {
	const { isAuthenticated: web3Authentication } = useMoralis();
	const { token, permissions } = getAuthCredentials();
	const avatarStyle = {
		padding: "0px 5px",
		borderRadius: "25px",
		marginRight: "8px",
		backgroundColor: "lightgray",
	};

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

				{/* <div className="nav-widget-form">
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
				</div> */}

				<div
					className="collapse navbar-collapse mean-menu"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav m-auto">
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
										href={!isAuthenticated({ token, permissions }) ? "/login" : "/collection"}
										activeClassName="active"
									>
										<a className="nav-link">Collection</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href={!isAuthenticated({ token, permissions }) ? "/login" : "/create-new-collection"}
										activeClassName="active"
									>
										<a className="nav-link">
											Create Collection
										</a>
									</Link>
								</li>
							</ul>
						</li>

						<li className="nav-item">
							<a href="#" className="nav-link">
								Community
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								{/* <li className="nav-item">
									<Link
										href="/about"
										activeClassName="active"
									>
										<a className="nav-link">About Us</a>
									</Link>
								</li> */}
								<li className="nav-item">
									<Link
										href="/authors"
										activeClassName="active"
									>
										<a className="nav-link">Authors</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href="/blogs"
										activeClassName="active"
									>
										<a className="nav-link">
											Blogs
										</a>
									</Link>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								NFT'S
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href={!isAuthenticated({ token, permissions }) ? "/login" : "/play-nft-game"}
										activeClassName="active"
									>
										<a className="nav-link">Play Game</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href={!web3Authentication ? "/add-wallet" : "/yournfts"}
										activeClassName="active"
									>
										<a className="nav-link">
											Your NFT
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link
										href={!web3Authentication ? "/add-wallet" : "/create-new-nft"}
										activeClassName="active"
									>
										<a className="nav-link">Create New NFT</a>
									</Link>
								</li>
							</ul>
						</li>
						{token && (
							<li className="nav-item" style={{ display: "flex" }}>
								<a href="#" className="nav-link" style={avatarStyle}>
									<i class="ri-user-3-line"></i>
								</a>
								<span style={{ color: 'white' }}>{user?.username || localStorage.getItem('username')}</span>
								<ul className="dropdown-menu">
									<li className="nav-item">
										<Link href="/profile" activeClassName="active">
											<a class Name="nav-link">
												Profile
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/#" activeClassName="active">
											<a class Name="nav-link">
												Notifications
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/">
											<a className="nav-link" onClick={() => handleLogout()}>
												Logout
											</a>
										</Link>
									</li>
								</ul>
							</li>
						)}
					</ul>
					<div className="others-options">

						<ul className="optional-item-list">
							{!token && (
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
										web3Authentication == false ? "Connect Wallet" : "MeataMask Connected"
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
