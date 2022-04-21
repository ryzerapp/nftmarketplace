import React, { useState, useEffect } from "react";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/game.css";

import "../public/css/responsive.css";
import "../public/css/remixicon.css";
import "../public/css/flaticon.css";
import "../public/css/aos.css";
import "../public/css/dark-theme.css";

import CookieConsent, { Cookies } from "react-cookie-consent";
import GoTop from "../components/Shared/GoTop";
import { ModalProvider } from "../components/ui/modal/modal.context";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { MoralisProvider } from "react-moralis";
import QuickStart from '../components/Common/QuickStart'
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";
const queryClientRef = new QueryClient()
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Web3ContextProvider from '../providers/Web3Context/index'
import mixpanel from 'mixpanel-browser';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

import HeaderFooter from "../components/Layout/HeaderFooter";
import ManagedModal from "../components/ui/modal/managed-modal";
function MyApp({ Component, pageProps }) {
	const isServerInfo = APP_ID && SERVER_URL ? true : false;
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ENV == 'production') {
			mixpanel.init(process.env.NEXT_PUBLIC_MXTOOL,
				{ debug: process.env.NEXT_PUBLIC_ENV == 'production' ? false : true, ignore_dnt: true });
			mixpanel.track('Open WebSites');
		}
	}, []);
	if (isServerInfo) {
		return (
			<QueryClientProvider client={queryClientRef}>
				<ModalProvider>
					<ManagedModal />
					<Head>
						<title>Cryptonium NFT Marketplace</title>
						<meta
							name="viewport"
							content="initial-scale=1.0, width=device-width"
						/>
						<link rel="stylesheet" href="../css/nedo.css"></link>
						<script src="../js/popper.min.js"></script>
						<script src="../js/TweenMax.js"></script>
						<script src="../js/aos.js"></script>
						<script src="../js/mixitup.min.js"></script>
						<script src="../js/tweenmax.min.js"></script>
					</Head>
					<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
						<Web3ContextProvider>
							<MoralisDappProvider>
								<HeaderFooter>
									{<Component {...pageProps} />}
									<CookieConsent
										enableDeclineButton
										location="bottom"
										buttonText="Accept Cookies"
										declineButtonText="Decline Cookies"
										cookieName="AcceptCookies"
										style={{ background: "#2B373B" }}
										buttonClasses="btnnew"
										buttonStyle={{
											color: 'white',
											padding: 10,
											borderRadius: 5
										}}
										declineButtonStyle={{
											color: "white",
											fontSize: "16px",
											padding: 10,
											backgroundColor: "#F14D5D",
											borderRadius: 5
										}}
										expires={30}
									>
										Cryptonium uses cookies to provide necessary
										website functionality,
										improve your experience and analyze our traffic.
										By using our website, you agree to our Privacy Policy and
										our cookies usage.{" "}
									</CookieConsent>
								</HeaderFooter>
							</MoralisDappProvider>
						</Web3ContextProvider>
					</MoralisProvider>
					<GoTop scrollStepInPx="100" delayInMs="10.50" />
					<Toaster position="top-center" reverseOrder={false} />
				</ModalProvider>
			</QueryClientProvider >
		)
	}
	else {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<QuickStart />
			</div>
		);
	}

}

export default MyApp;
