import PageBanner from "../../components/Common/PageBanner";
import AuctionDetailsArea from "../../components/Auction/AuctionDetailsArea";
import baseUrl from "../../utils/baseUrl";

const ItemDetails = ({ data }) => {
	return (
		<>
			<PageBanner
				bannerHeading={"Welcome To Auction " + data.name}
				parentTitle="Welcome To Auction"
				pageTitle={data.name}
				bg="inner-bg12"
			/>

			<AuctionDetailsArea data={data} key={data?.id} />;
		</>
	);
};

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const response = await fetch(`${baseUrl}/auctions/${slug}`);
	const data = await response.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data }, // will be passed to the page component as props
	};
}

export default ItemDetails;
