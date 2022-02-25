import NavbarTwo from "../../components/Layout/NavbarTwo";
import PageBanner from "../../components/Common/PageBanner";
import ItemDetailsArea from "../../components/ItemDetails/ItemDetailsArea";
import TrendingArea from "../../components/Common/TrendingArea";
import Footer from "../../components/Layout/Footer";
import Copyright from "../../components/Common/Copyright";
import baseUrl from "../../utils/baseUrl";

const ItemDetails = ({ data, trendingData }) => {
	console.log(trendingData);
	return (
		<>
			<NavbarTwo />

			<PageBanner
				bannerHeading={data[0].name}
				parentTitle="Discover"
				pageTitle={data[0].name}
				bg="inner-bg12"
			/>

			{data.map((nft) => {
				return <ItemDetailsArea data={nft} key={nft.id} />;
			})}

			<TrendingArea
				trendingData={trendingData}
				bg="trending-area-bg-two"
			/>

			<Footer />
			
			<Copyright />
		</>
	);
};

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	// console.log(slug);
	const response = await fetch(`${baseUrl}/nfts?slug=${slug}`);
	const data = await response.json();
	const trendinfRes = await fetch(`${baseUrl}/nfts?_limit=5`);
	const trendingData = await trendinfRes.json();

	if (!trendingData) {
		return {
			notFound: true,
		};
	}
	// console.log(response);

	return {
		props: { data, trendingData }, // will be passed to the page component as props
	};
}

export default ItemDetails;
