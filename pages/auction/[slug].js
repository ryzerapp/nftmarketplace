import PageBanner from "../../components/Common/PageBanner";
import AuctionDetailsAreaLeftSide from "../../components/Auction/AuctionDetailsAreaLeftSide";
import { usegetAuctionsById } from "../../hooks/Web2/useAuctions";

const ItemDetails = ({ slug }) => {
	const { data } = usegetAuctionsById({
		auction_id: slug
	})
	return (
		<>
			<PageBanner
				bannerHeading={"Welcome To Auction " + data?.name}
				parentTitle="Welcome To Auction"
				pageTitle={data?.name}
				bg="inner-bg12"
			/>

			<AuctionDetailsAreaLeftSide data={data} key={data?.id} />;
		</>
	);
};

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	// const response = await fetch(`${baseUrl}/auctions/${slug}`);
	// const data = await response.json();

	// if (!data) {
	// 	return {
	// 		notFound: true,
	// 	};
	// }

	return {
		props: { slug }, // will be passed to the page component as props
	};
}

export default ItemDetails;
