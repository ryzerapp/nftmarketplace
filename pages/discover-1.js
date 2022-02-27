import FeaturedArea from '../components/Common/FeaturedArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import baseUrl from "../utils/baseUrl";

const DiscoverOne = ({ data }) => {
  return (
    <>

      {/* <PageBanner
        pageTitle='Live Auction'
        parentTitle='Discover'
        bannerHeading='Discover Style One'
        bg="inner-bg5"
      /> */}

      <FeaturedArea data={data}  title="Discover Assets" pagination={true} />

      <InvolvedArea />

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

export default DiscoverOne;
