import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from 'react-tabs';
import { useCollectionSavedByUser, useMeQuery, useSavednftsQuery } from '../../hooks/Web2/useMeQuery';
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
const AuthorProfileArea = () => {
  const { data, isFetched, isLoading } = useMeQuery()
  const { data: savedNfts } = useSavednftsQuery()
  const { data: savedCollection } = useCollectionSavedByUser();

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='author-profile-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='author-profile-sidebar  mr-20'>
                <div className='author-user'>
                  <img
                    src={(data?.user?.profileimage) ? (data?.user?.profileimage) : "../images/author/author-user13.png"}
                    alt='Images' />
                  <i className='ri-check-line'></i>
                </div>

                <h3>
                  <a href='author-profile.html'>Olivia Jenar</a>
                </h3>
                <span>@{data?.user?.username}</span>
                <p>
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary
                </p>
                <div className='sp-title'>
                  0x76669f...a0e9ca52 <i className='ri-folders-line'></i>
                </div>
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
                        <Tab>
                          <a>Saved Collection</a>
                        </Tab>
                        <Tab>
                          <a>Saved NFT's</a>
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
                                openDialogTitle={"Mint Now"}
                                saved_nfts={data?.user?.saved_nfts ? data?.user?.saved_nfts : []}
                                user_id={data?.user?.id}
                                editOrDelete={true}
                              />
                            )) : <div className='container mt-100'>
                              <div className='row'>
                                <div className='col-xs-1 section-title  pb-70' align="center">
                                  <h2>You Don't Have Any Saved NFT</h2>
                                </div>
                              </div>
                            </div>}
                        </div>
                        <Heading heading={"Minted NFT's"}></Heading>
                        <NFT brefetch={true} />
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
                                savedCollection={data?.user?.saved_collection}
                                user_id={data?.user?.id}
                                editOrDelete={true}

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

                    <TabPanel>
                      <div className='tabs_item'>
                        <div className='row justify-content-left'>
                          {savedCollection?.length > 0 ?
                            savedCollection?.map((res) =>
                            (
                              <CollectionComponent
                                collection={res}
                                profile={true}
                                key={res?.id}
                                savedCollection={data?.user?.saved_collection ? data?.user?.saved_collection : []}
                                user_id={data?.user?.id}
                                editOrDelete={false}

                              />
                            )) : <>
                              <div className='container mt-100'>
                                <div className='row'>
                                  <div className='col-xs-1 section-title  pb-70' align="center">
                                    <h2>You Don't Have Any Saved Collection</h2>
                                  </div>
                                </div>
                              </div>
                            </>}
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item'>
                        <div className='row justify-content-left'>
                          {savedNfts?.length > 0 ?
                            savedNfts?.map((nft) => (
                              <NFTComponentDatabase
                                nft={nft}
                                key={nft?.id}
                                openDialogTitle={"Open NFT"}
                                saved_nfts={data?.user?.saved_nfts ? data?.user?.saved_nfts : []}
                                user_id={data?.user?.id}
                                editOrDelete={false}
                              />
                            )) : <div className='container mt-100'>
                              <div className='row'>
                                <div className='col-xs-1 section-title  pb-70' align="center">
                                  <h2>You Don't Have Any Saved NFT</h2>
                                </div>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>

              <div className='col-lg-12 col-md-12'>
                <div className='pagination-area'>
                  <a href='author-profile.html' className='prev page-numbers'>
                    <i className='ri-arrow-left-s-line'></i>
                  </a>

                  <span className='page-numbers current' aria-current='page'>
                    1
                  </span>
                  <a href='author-profile.html' className='page-numbers'>
                    2
                  </a>
                  <a href='author-profile.html' className='page-numbers'>
                    3
                  </a>

                  <a href='author-profile.html' className='next page-numbers'>
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

export default AuthorProfileArea;


//counter calculation
// const [days, setDays] = useState('');
// const [hours, setHours] = useState('');
// const [minutes, setMinutes] = useState('');
// const [seconds, setSeconds] = useState('');
// const comingSoonTime = () => {
//   let endTime = new Date('December 23, 2021 17:00:00 PDT');
//   let endTimeParse = Date.parse(endTime) / 1000;
//   let now = new Date();
//   let nowParse = Date.parse(now) / 1000;
//   let timeLeft = endTimeParse - nowParse;
//   let countdays = Math.floor(timeLeft / 86400);
//   let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
//   let countminutes = Math.floor(
//     (timeLeft - countdays * 86400 - counthours * 3600) / 60
//   );
//   let countseconds = Math.floor(
//     timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
//   );
//   if (counthours < '10') {
//     counthours = '0' + counthours;
//   }
//   if (countminutes < '10') {
//     countminutes = '0' + countminutes;
//   }
//   if (countseconds < '10') {
//     countseconds = '0' + countseconds;
//   }

//   setDays(countdays);
//   setHours(counthours);
//   setMinutes(countminutes);
//   setSeconds(countseconds);
// };

// useEffect(() => {
//   setInterval(() => {
//     comingSoonTime();
//   }, 1000);
// }, []);

{/* <div className='col-lg-4 col-md-6'>
  <div className='featured-card box-shadow'>
    <div className='featured-card-img'>
      <a href='item-details.html'>
        <img
          src='../images/featured/featured-img2.jpg'
          alt='Images'
        />
      </a>
      <p>
        <i className='ri-heart-line'></i> 142
      </p>
      <div
        className='featured-card-clock'
        data-countdown='2021/10/10'
      >{days}:{hours}:{minutes}:{seconds}</div>
      <button
        type='button'
        className='default-btn border-radius-5'
      >
        Place Bid
      </button>
    </div>

    <div className='content'>
      <h3>
        <a href='item-details.html'>
          I Love In The Air
        </a>
      </h3>
      <div className='content-in'>
        <div className='featured-card-left'>
          <span>110 ETH 12/14</span>
          <h4>Bid 70 ETH </h4>
        </div>

        <a
          href='item-details.html'
          className='featured-content-btn'
        >
          <i className='ri-arrow-right-line'></i>
        </a>
      </div>
      <a
        href='author-profile.html'
        className='featured-user-option'
      >
        <img
          src='../images/featured/featured-user2.jpg'
          alt='Images'
        />
        <span>Created by @Maicel</span>
      </a>
    </div>
  </div>
</div> */}