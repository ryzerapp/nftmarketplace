import React, { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import Link from "../../utils/ActiveLink";
import MenusList from "./MenusList";
import { handleLogout } from "../../utils/auth";
import { useMoralis } from "react-moralis";
import { useWeb3 } from "../../providers/Web3Context";
import { Actions } from "../../providers/Web3Context/reducer";

const NavbarTwo = () => {

	const [showMenu, setShowMenu] = useState(false);
	const [showWallet, setShowWallet] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [sticky, setSticky] = useState(false);
	const { isAuthenticated: web3Authentication } = useMoralis();
	const { state: { user }, dispatch } = useWeb3()
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => { }, [user]);

	const toggleWallet = () => {
		setShowWallet(!showWallet);
	};
	const handleLogoutHandler = async () => {
		await dispatch({ type: Actions.SET_USER, user: {} })
		handleLogout()
	}
	const toggleSearchModal = () => {
		setShowSearchModal(!showSearchModal);
	};

	//sticky menu
	const showStickyMenu = () => {
		if (window.scrollY >= 80) {
			setSticky(true);
		} else {
			setSticky(false);
		}
	};
	if (typeof window !== "undefined") {
		// browser code
		window.addEventListener("scroll", showStickyMenu);
	}

	return (
		<>
			<div className="navbar-style2">
				<div className={sticky ? "is-sticky navbar-area" : "navbar-area"}>
					<div className="mobile-responsive-nav">
						<div className="container-fluid">
							<div className="mobile-responsive-menu">
								<div
									onClick={() => toggleMenu()}
									className="hamburger-menu hamburger-two"
								>
									{showMenu ? (
										<i className="ri-close-line"></i>
									) : (
										<i className="ri-menu-line"></i>
									)}
								</div>
								<div className="logo">
									<img
										style={{
											objectFit: 'contain',
											width: 70,
											height: 70
										}}
										src="../images/logo-2.png"
										alt="Footer Logo"
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						className={
							showMenu
								? "show desktop-nav nav-area"
								: "desktop-nav nav-area"
						}
					>
						<MenusList logo="" user={user} />
					</div>

					<div className="mobile-nav">
						<div
							className="search-btn global-pointer"
							onClick={() => toggleSearchModal()}
						>
							<a data-bs-toggle="modal" data-bs-target="#searchmodal">
								<i className="ri-search-line"></i>
							</a>
						</div>
					</div>

					<div className="side-nav-responsive">
						<div className="container-max">
							<div
								className="dot-menu"
								onClick={() => toggleWallet()}
							>
								<div className="circle-inner">
									<div className="circle circle-one"></div>
									<div className="circle circle-two"></div>
									<div className="circle circle-three"></div>
								</div>
							</div>

							<div
								className={
									showWallet ? "container active" : "container"
								}
							>
								<div className="side-nav-inner">
									<div className="side-nav justify-content-center align-items-center">
										<div className="side-nav-item">
											<ul className="optional-item-list">
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<SearchModal
				showSearchModal={showSearchModal}
				toggleSearchModal={toggleSearchModal}
			/>
		</>
	);
};

export default NavbarTwo;
