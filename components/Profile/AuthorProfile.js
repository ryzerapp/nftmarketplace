import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from 'react-tabs';
import { useAuthorQuery } from '../../hooks/Web2/useMeQuery';
import CollectionComponent from '../Collection/CollectionComponent';
import Loader from '../Common/Loader';
import NFT from '../Collection/NFT';
import NFTComponentDatabase from '../Collection/NFTComponentDatabase';

resetIdCounter();

const Heading = ({ heading }) => {
  return (
    <>
      <h1>{heading}</h1>
      <hr style={{ width: "80%", marginLeft: "20px" }}></hr>
      <div className='pt-2'></div>
    </>
  )
}
const AuthorProfile = () => {
  const router = useRouter()
  const { data, isFetched, isLoading } = useAuthorQuery({
    author_name: router.query?.author_name
  })
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='author-profile-area pt-70 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='author-profile-sidebar  mr-20'>
                <div className='author-user'>
                  <img
                    src={(data?.user?.profile_photo) ? (data?.user?.profile_photo) : "../images/author/author-user13.png"}
                    alt='Images' />
                  <i className='ri-check-line'></i>
                </div>

                <h3>
                  <a href='author-profile'>{data?.user?.first_name} {data?.user?.last_name}</a>
                </h3>
                <span>@{data?.user?.username}</span>
                <div className="d-flex .flex-wrap">
                  <p style={{
                    overflow: "hidden"
                  }}>
                    {data?.user?.professional_summery}

                  </p>
                </div>
                <span>Wallet Address:</span>
                <p > {data?.user?.walletAddress ? ((data?.user?.walletAddress).substr(0, 10)) + ".........." +
                  (data?.user?.walletAddress).split("").reverse().join("").substr(1, 10) : "Plase Update Your Address"}</p>
                <div className='author-content'>
                  <div className='content-left'>
                    <span>Followers</span>
                    <h4>2941</h4>
                  </div>

                  <div className='content-right'>
                    Follow
                    <ul className='author-social'>
                      <li>
                        <a href='https://www.facebook.com/' target='_blank'>
                          <i className='ri-facebook-fill'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.instagram.com/' target='_blank'>
                          <i className='ri-instagram-fill'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://twitter.com/' target='_blank'>
                          <i className='ri-twitter-fill'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
                      <div className='tabs_item'>
                        <div className='row justify-content-left'>
                          <Heading heading={"UnMinted NFT's"}></Heading>
                          {data?.user?.nfts?.filter((nft) => !nft.nft_is_minted)?.length > 0 ?
                            data?.user?.nfts?.filter((nft) => !nft.nft_is_minted)?.map((nft) => (
                              <NFTComponentDatabase
                                nft={nft}
                                key={nft?.id}
                                openDialogTitle={"Open NFT"}
                                saved_nfts={data?.user?.saved_nfts ? data?.user?.saved_nfts : []}
                                liked_nfts={data?.user?.liked_nfts ? data?.user?.liked_nfts : []}
                                user={data?.user}
                                editOrDelete={true}
                                author_name={data?.user?.username}
                              />
                            )) : <div className='container mt-100'>
                              <div className='row'>
                                <div className='col-xs-1 section-title  pb-70' align="center">
                                  <h2>You Don't Have Any Saved NFT</h2>
                                </div>
                              </div>
                            </div>}
                        </div>
                        {/* <Heading heading={"Minted NFT's"}></Heading>
                        <NFT brefetch={true} /> */}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item'>
                        <div className='row justify-content-left'>
                          {data?.user?.collections?.length > 0 ?
                            data?.user?.collections?.map((res) =>
                            (
                              <CollectionComponent
                                collection={res}
                                profile={true}
                                key={res?.id}
                                savedCollection={data?.user?.saved_collection ? data?.user?.saved_collection : []}
                                liked_collection={data?.user?.liked_collection ? data?.user?.liked_collection : []}
                                user={data?.user}
                                editOrDelete={true}
                                author_name={data?.user?.username}
                              />
                            )) : <>
                              <div className='container mt-100'>
                                <div className='row'>
                                  <div className='col-xs-1 section-title  pb-70' align="center">
                                    <h2>You Don't Have Any Collection</h2>
                                  </div>
                                </div>
                              </div>
                            </>}
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>

              <div className='col-lg-12 col-md-12'>
                <div className='pagination-area'>
                  <a href='author-profile' className='prev page-numbers'>
                    <i className='ri-arrow-left-s-line'></i>
                  </a>

                  <span className='page-numbers current' aria-current='page'>
                    1
                  </span>
                  <a href='author-profile' className='page-numbers'>
                    2
                  </a>
                  <a href='author-profile' className='page-numbers'>
                    3
                  </a>

                  <a href='author-profile' className='next page-numbers'>
                    <i className='ri-arrow-right-s-line'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorProfile;
