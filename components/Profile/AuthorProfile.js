import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from 'react-tabs';
import { useAuthorQuery } from '../../hooks/Web2/useMeQuery';
import Loader from '../Common/Loader';
import AuthorLeftSide from '../Authors/AuthorLeftSide';
import RenderNFTInTabs from '../Tabs/RenderNFTInTabs';
import RenderCollectionInTabs from '../Tabs/RenderCollectionInTabs';
import NFTListComponentBlockChain from '../NFTS/NFTListComponentBlockChain';
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../../providers/Web3Context';
import Chains from '../Common/Chains';

resetIdCounter();
const AuthorProfile = () => {
  const { isAuthenticated, isWeb3Enabled
    , } = useMoralis()
  const router = useRouter()
  const { data, isFetched, isLoading, refetch
  } = useAuthorQuery({
    author_name: router.query?.author_name
  })

  if (isLoading) {
    return (
      <Loader />
    )
  }
  const { state: { networkId } } = useWeb3();
  // React.useEffect(() => {
  //   if (networkId) {
  //     if (isWeb3Enabled && isAuthenticated)
  //       refetch()
  //   }
  // }, [networkId])
  return (
    <>
      <div className='author-profile-area pt-70 pb-70'>
        <div className='container'>
          <div className='row'>
            <AuthorLeftSide user={data?.user} />
            <div className='col-lg-9'>
              <div className='tab featured-tab-area featured-tab-area-ml author-tab-area'>
                <Tabs>
                  <div className='col-lg-12'>
                    <ul className='tabs author-tabs'>
                      <TabList>
                        <Tab>
                          <a>NFT's</a>
                        </Tab>
                        <Tab>
                          <a>Collections</a>
                        </Tab>
                      </TabList>
                    </ul>
                  </div>
                  <div className='tab_content author_tab_content pt-45'>
                    <TabPanel>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>
                          <div className='' align="center">
                            <div className='border border-red'>
                              <div className='row justify-content-ceneter px-4'>
                                <div className='pt-4'></div>
                                <RenderNFTInTabs
                                  openDialogTitle={"Open NFT"}
                                  editOrDelete={true}
                                  user={data?.user}
                                  nfts={data?.user?.nfts?.filter((nft) => nft.nft_is_minted)}
                                  message="User Don't Have Minted NFTs"
                                />
                              </div>
                              <hr></hr>
                              <div className='row justify-content-ceneter px-4'>
                                <div className='pt-4'></div>
                                <Chains></Chains>
                                <div className='pt-4'></div>
                                <NFTListComponentBlockChain
                                  walletAddressPassed={data?.user?.walletAddress}
                                  brefetch={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>
                          <div className='' align="center">
                            <div className='border border-red'>
                              <div className='row justify-content-ceneter px-4'>
                                <div className='pt-4'></div>
                                <RenderCollectionInTabs
                                  editOrDelete={true}
                                  user={data?.user}
                                  profile={true}
                                  collections={data?.user?.collections}
                                  message="Author Don't Have Any Collection"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorProfile;
