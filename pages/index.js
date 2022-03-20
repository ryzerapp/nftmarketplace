import BannerArea from '../components/HomeTwo/BannerArea';
import baseUrl from "../utils/baseUrl";
import Layout from "../components/Layout/Layout";
import MainScreen from '../components/ThreeJs/MainScreen'
import DarkProNew from '../components/HomeTwo/DarkProNew';
const Index = ({ data, trendingData }) => {
	return (
		<Layout>
			{/* <BannerArea /> */}
			<DarkProNew />
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const res = await fetch(`${baseUrl}/nfts/getFeaturedArtwork`);
	const data = await res.json();

	const trendinfRes = await fetch(`${baseUrl}/nfts/getTrendingArtwork`);
	const trendingData = await trendinfRes.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data, trendingData }, // will be passed to the page component as props
	};
}

export default Index;
