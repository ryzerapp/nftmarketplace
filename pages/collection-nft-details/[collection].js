import React, { useEffect } from 'react';
import Loader from '../../components/Common/Loader';
import Layout from '../../components/Layout/Layout';
import { useMeQuery } from '../../hooks/Web2/useMeQuery';
import { useNftOfCollection } from '../../hooks/Web2/useNftOfCollection';
import RenderNFTInTabs from '../../components/Tabs/RenderNFTInTabs';
import { XMasonry, XBlock } from "react-xmasonry";
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import NFTMasonry from '../../components/NFTS/NFTMasonry';
import { useWeb3 } from '../../providers/Web3Context';
import { useIPFS } from '../../hooks/Web3/useIPFS';
import { useQuery } from 'react-query';

const Collection = ({ collection }) => {
  // const { data, isLoading } = useNftOfCollection({
  //   collection_name: collection
  // })
  // const { data: users } = useMeQuery()

  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const { resolveLink } = useIPFS();
  const nftBalanceJson = async (data) => {
    if (data?.result) {
      let NFTs = data?.result;
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image_url = resolveLink(NFT.metadata?.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(NFT.token_uri)
              .then(async (response) => await response.json())
              .then((data) => {
                NFT.image_url = resolveLink(data.image);
              });
          } catch (error) {
          }
        }
      }
      return NFTs;
    }
  };

  const setData = async () => {
    const options = { chain: networkId, address: walletAddress, token_address: collection };
    console.log(options);
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    const data = await nftBalanceJson(polygonNFTs)
    return data;
  };
  const { data: nftBalance, isLoading, refetch } = useQuery([`collectionnft_${collection}`], setData, {
    keepPreviousData: true,
    enabled: false
  });

  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated)
      refetch()
  }, [isWeb3Enabled, networkId, walletAddress]);

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <>
        <div className='collection-widget-area pt-50 pb-70'>
          <div className='container'>
            <div className='row justify-content-center'>
              <XMasonry  >
                {
                  nftBalance?.map((nft) => (
                    <XBlock key={nft?.token_uri}>
                      {
                        nft?.image_url ? (
                          <NFTMasonry
                            nft={nft}
                          />
                        ) : null
                      }

                    </XBlock>
                  ))}
              </XMasonry>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { collection } = ctx.query;
  return {
    props: { collection }, // will be passed to the page component as props
  };
}
export default Collection;
{/* <>
                <div className='row justify-content-left'>
                  <div className='border border-red'>
                    <div className='row justify-content-ceneter'>
                      <div className='pt-4'></div>
                      <RenderNFTInTabs
                        openDialogTitle={"Open Now"}
                        editOrDelete={false}
                        user={users?.user}
                        formCollection={true}
                        nfts={data?.nfts ? data?.nfts : []}
                        message="This Collection Don't Have Any NFT"
                      />
                    </div>
                  </div>

                </div>
              </> */}