import { useState } from "react";
import Link from "../../utils/ActiveLink";
import MenusList from "./MenusList";
import SearchModal from "./SearchModal";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showWallet, setShowWallet] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [sticky, setSticky] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const toggleWallet = () => {
		setShowWallet(!showWallet);
	};

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
			<div className="navbar-style1">
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
									<Link href="/">
										<a>
											<img
												src="../images/logo-2.png"
												alt="logo"
											/>
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div
						className={
							showMenu
								? "show desktop-nav desktop-nav-one nav-area"
								: "desktop-nav desktop-nav-one nav-area"
						}
					>
						<MenusList />
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
								className="dot-menu dot-menu-mt"
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
									showWallet
										? "container container-mt active"
										: "container container-mt"
								}
							>
								<div className="side-nav-inner">
									<div className="side-nav justify-content-center align-items-center">
										<div className="side-nav-item">
											<ul className="optional-item-list">
												<li>
													<Link
														href="/create-collection"
														activeClassName="active"
													>
														<a>Create</a>
													</Link>
												</li>
												<li>
													<Link
														href="/add-wallet"
														activeClassName="active"
													>
														<a className="active">
															Connect Wallet
														</a>
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

export default Navbar;
