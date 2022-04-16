import TrendingArea from '../components/Common/TrendingArea';
import BannerArea from '../components/HomeTwo/BannerArea';
import NavbarTwo from '../components/Layout/NavbarTwo';
import TopSeller from '../components/Common/TopSeller';
import AuctionArea from '../components/Auction/AuctionArea';
import FeaturedArea from '../components/Common/FeaturedArea';
import Testimonial from '../components/Common/Testimonial';
import AuthorArea from '../components/HomeTwo/AuthorArea'
import BlogArea from '../components/Common/BlogArea';
import CollectionsArea from '../components/Common/CollectionsArea';
import baseUrl from "../utils/baseUrl";
import Layout from "../components/Layout/Layout";


const Index = ({ data, trendingData }) => {
    return (
        <Layout>

            <BannerArea></BannerArea>

            <TrendingArea trendingData={trendingData} />

            <TopSeller />

            <AuctionArea />

            {/* <Testimonial /> */}

            <AuthorArea />

            {/* <BlogArea /> */}

            <CollectionsArea />

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
