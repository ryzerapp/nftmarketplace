import Navbar from "../components/Layout/Navbar";
import Layout from "../components/Layout/Layout";
import BannerArea from "../components/HomeOne/BannerArea";
import TrendingArea from "../components/HomeOne/TrendingArea";
import TopSeller from "../components/Common/TopSeller";
import AuctionArea from "../components/HomeOne/AuctionArea";
import FeaturedArea from "../components/Common/FeaturedArea";
import CreateArea from "../components/HomeOne/CreateArea";
import AuthorArea from "../components/HomeOne/AuthorArea";
import CollectionsArea from "../components/Common/CollectionsArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import baseUrl from "../utils/baseUrl";

const Index = ({ data }) => {

	return (
		<Layout>
			<Navbar />

			<BannerArea data={data.slice(1, 3)} />

			<TrendingArea data={data} />

			<TopSeller />

			<AuctionArea data={data.slice(1, 6)} />

			<FeaturedArea title="Featured Assets" data={data} />

			<CreateArea />

			<AuthorArea />

			<CollectionsArea />

			<Footer />
			
			<Copyright />
		</Layout>
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

export default Index;
