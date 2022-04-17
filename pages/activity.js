import ActivityArea from '../components/Activity/ActivityArea';
import TrendingArea from '../components/Common/TrendingArea';
import baseUrl from "../utils/baseUrl";
import Layout from '../components/Layout/Layout'
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../providers/Web3Context';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
const Activity = ({ trendingData }) => {

  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();

  const setData = async () => {
    const options = { chain: networkId, address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTTransfers(options);
    return polygonNFTs;
  };

  const { data: activity, isLoading, refetch } = useQuery(['useractivity'], setData, {
    keepPreviousData: true,
    enabled: false
  });
  console.log(activity);
  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated)
      refetch()
  }, [isWeb3Enabled, networkId, walletAddress]);

  return (
    <Layout>

      <ActivityArea activity={activity?.result} isLoading={isLoading} />
      {/* <TrendingArea trendingData={trendingData} bg="trending-area-bg-two"/> */}
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

	return {
		props: { data, trendingData }, // will be passed to the page component as props
	};
}

export default Activity;
