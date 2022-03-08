import PageBanner from "../../components/Common/PageBanner";
import ItemDetailsArea from "../../components/ItemDetails/ItemDetailsArea";
import TrendingArea from "../../components/Common/TrendingArea";
import baseUrl from "../../utils/baseUrl";

const ItemDetails = ({ data, trendingData }) => {
	return (
		<>
			<PageBanner
				bannerHeading={data.name}
				parentTitle="Discover"
				pageTitle={data.name}
				bg="inner-bg12"
			/>

			<ItemDetailsArea data={data[0]} key={data[0]?.id} />;

			<TrendingArea
				trendingData={trendingData}
				bg="trending-area-bg-two"
			/>


		</>
	);
};

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const response = await fetch(`${baseUrl}/nfts/${slug}`);
	const data = await response.json();
	const trendinfRes = await fetch(`${baseUrl}/nfts/getTrendingArtwork`);
	const trendingData = await trendinfRes.json();

	if (!trendingData) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data, trendingData }, // will be passed to the page component as props
	};
}

export default ItemDetails;
