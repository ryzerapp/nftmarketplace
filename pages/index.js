import TrendingArea from '../components/Common/TrendingArea';
import BannerArea from '../components/HomeTwo/BannerArea';
import NavbarTwo from '../components/Layout/NavbarTwo';
import TopSeller from '../components/Common/TopSeller';
import AuctionArea from '../components/HomeTwo/AuctionArea';
import FeaturedArea from '../components/Common/FeaturedArea';
import Testimonial from '../components/Common/Testimonial';
import AuthorArea from '../components/HomeTwo/AuthorArea'
import BlogArea from '../components/Common/BlogArea';
import CollectionsArea from '../components/Common/CollectionsArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import baseUrl from "../utils/baseUrl";
import Layout from "../components/Layout/Layout";


const Index = ({ data, trendingData }) => {
    return (
        <Layout>
            <NavbarTwo />

            <BannerArea  />

            <TrendingArea trendingData={trendingData} />
            
            <TopSeller />

            <AuctionArea />

            <FeaturedArea 
                title="Featured Assets" 
                data={data} 
            />

            <Testimonial />

            <AuthorArea />

            <BlogArea />

            <CollectionsArea />

            <Footer />

            <Copyright />
        </Layout>
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

export default Index;
