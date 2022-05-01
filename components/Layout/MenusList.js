import React from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";

const MenusList = ({ user }) => {
	const { isAuthenticated: web3Authentication } = useMoralis();
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
							style={{
								objectFit: 'contain',
								width: 100,
								height: 100
							}}
							alt="Logo"
							className="black-logo"
						/>
					</a>
				</Link>
				<div
					className="collapse navbar-collapse mean-menu"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav m-auto">
						<li className="nav-item">
							<Link
								href="/discover"
								activeClassName="active"
							>
								<a className="nav-link">
									Discover
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href="/activity"
								activeClassName="active"
							>
								<a className="nav-link">Activity</a>
							</Link>
						</li>


						<li className="nav-item">
							<a href="#" className="nav-link">
								Community
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
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
						<li className="nav-item" style={{ display: "flex" }}>
							<a className="nav-link">Crypto Game
								<i className="ri-arrow-down-s-line"></i>
							</a>
							<ul className="dropdown-menu">
								<li className="nav-item">
									<Link
										href={"/game"}
										activeClassName="active"
									>
										<a className="nav-link">How It's Work?</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										href={"/play-nft-game"}
										activeClassName="active"
									>
										<a className="nav-link">Generate Avatar</a>
									</Link>
								</li>
							</ul>
						</li>
						{
							web3Authentication && <li className="nav-item">
								<a href="insta" className="nav-link">
									Explore Feeds
								</a>
							</li>
						}


						{web3Authentication && (
							<li className="nav-item" style={{ display: "flex" }}>
								<a href="#" className="nav-link" style={avatarStyle}>
									<i className="ri-user-3-line"></i>
								</a>
								<span style={{ color: 'white' }}>{user?.username}</span>
								<ul className="dropdown-menu">
									<li className="nav-item">
										<Link href="/profile" activeClassName="active">
											<a className="nav-link">
												Profile
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link
											href={!web3Authentication ? "/add-wallet" : "/collection"}
											activeClassName="active"
										>
											<a className="nav-link">My Collection</a>
										</Link>
									</li>

									<li className="nav-item">
										<Link
											href={!web3Authentication ? "/add-wallet" : "/create-new-collection"}
											activeClassName="active"
										>
											<a className="nav-link">
												Create Collection
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link
											href={!web3Authentication ? "/add-wallet" : "/nft/create-new-nft"}
											activeClassName="active"
										>
											<a className="nav-link">Create New NFT</a>
										</Link>
									</li>
								</ul>
							</li>
						)}
					</ul>
					<div className="others-options">

						<ul className="optional-item-list">
							{/* {!web3Authentication && (
								<li>
									<Link
										href="/login"
										activeClassName="active"
									>
										<a>Login</a>
									</Link>
								</li>
							)} */}
							<li>

								<Link
									href="/add-wallet"
									activeClassName="active"
								>
									<a className="btnnew">{
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
