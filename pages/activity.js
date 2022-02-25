import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import ActivityArea from '../components/Activity/ActivityArea';
import TrendingArea from '../components/Common/TrendingArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import baseUrl from "../utils/baseUrl";

const Activity = ({ trendingData }) => {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        bannerHeading='Recent Activity'
        parentTitle='Activity'
        pageTitle=''
        bg='inner-bg8'
      />

      <ActivityArea />

      <TrendingArea trendingData={trendingData} bg="trending-area-bg-two"/>

      <Footer />

      <Copyright />
    </>
  );
};

export async function getServerSideProps(context) {
	const res = await fetch(`${baseUrl}/nfts`);
	const data = await res.json();

    const trendinfRes = await fetch(`${baseUrl}/nfts?_limit=5`);
	const trendingData = await trendinfRes.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	// console.log(data);
	return {
		props: { data, trendingData }, // will be passed to the page component as props
	};
}

export default Activity;
