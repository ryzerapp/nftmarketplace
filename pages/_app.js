import React, { useState, useEffect } from "react";
import "../public/fonts/remixicon.css";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/responsive.css";

import GoTop from "../components/Shared/GoTop";
import Loader from "../components/Shared/Loader";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { MoralisProvider, useMoralis } from "react-moralis";
import QuickStart from '../components/Common/QuickStart'
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";
const queryClientRef = new QueryClient()
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
import store from '../redux/store'
import HeaderFooter from "../components/Layout/HeaderFooter";
function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(true);
	const isServerInfo = APP_ID && SERVER_URL ? true : false;

	if (isServerInfo) {
		return (
			<QueryClientProvider client={queryClientRef}>

				<Head>
					<title>Cryptonium NFT Marketplace</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
					<MoralisDappProvider>
						<HeaderFooter>
							{<Component {...pageProps} store={store} />}
						</HeaderFooter>
					</MoralisDappProvider>
				</MoralisProvider>
				<Loader loading={loading} />

				<GoTop scrollStepInPx="100" delayInMs="10.50" />

				<Toaster position="top-center" reverseOrder={false} />

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
