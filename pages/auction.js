import NavbarTwo from "../components/Layout/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import AuctionArea from "../components/Auction/AuctionArea";
import InvolvedArea from "../components/Common/InvolvedArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import baseUrl from "../utils/baseUrl";

const Auction = ({ data }) => {
	return (
		<>
			<NavbarTwo />
			<PageBanner
				bannerHeading="Live Auction Is Going On"
				parentTitle="Discover"
				pageTitle="Live Auction"
				bg="inner-bg5"
			/>
			<AuctionArea data={data} />
			<InvolvedArea />
			<Footer />
			<Copyright />
		</>
	);
};

export async function getServerSideProps(context) {
	const res = await fetch(`${baseUrl}/nfts`);
	const data = await res.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	// console.log(data);

	return {
		props: { data }, // will be passed to the page component as props
	};
}

export default Auction;
