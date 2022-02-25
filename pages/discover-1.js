import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import FeaturedArea from '../components/Common/FeaturedArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import baseUrl from "../utils/baseUrl";

const DiscoverOne = ({ data }) => {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle='Live Auction'
        parentTitle='Discover'
        bannerHeading='Discover Style One'
        bg="inner-bg5"
      />

      <FeaturedArea data={data}  title="Discover Assets" pagination={true} />

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

export default DiscoverOne;
