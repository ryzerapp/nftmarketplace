import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import http from '../../utils/http'
import toast from 'react-hot-toast';
import { ErrorMessage } from "@hookform/error-message";

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
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import { useQueryClient } from 'react-query';
import CreateAuction from '../../pages/auction/create';
import AuctionArea from '../Auction/AuctionArea';
import AuctionNFT from '../Auction/AuctionNFT';
const schema = yup
  .object({
    email: yup
      .string()
      .required("Email must be provided.")
      .email("Enter Valid Email."),
    password: yup.string().required("Password must be provided"),
  })
  .required();

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
const UserProfile = () => {
  const { data, isFetched, isLoading } = useMeQuery()
  const { data: savedNfts } = useSavednftsQuery()
  const { data: savedCollection } = useCollectionSavedByUser();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      professional_summery: "",
      walletAddress: ""
    },
  });
  const { mutate: updateUserData } = useUpdateUserData()
  const queryClient = useQueryClient();

  const onSubmit = async (formInputData) => {
    try {

      Object.keys(formInputData).forEach(key => {
        if (formInputData[key] == null || formInputData[key] == "") {
          delete formInputData[key];
        }
      });
      let finalObj = { ...formInputData }
      if (formInputData?.profile_photo?.length > 0) {
        const formData = new FormData();
        formData.append("file", formInputData?.profile_photo[0]);
        formData.append("fileName", formInputData?.profile_photo[0]?.name);
        try {
          const res = await http.post("/attachments",
            formData
          );
          if (res?.status == 201) {
            finalObj.profile_photo = res?.data?.image;
          }
        } catch (ex) {
          console.log(ex);
        }
      }
      else {
        delete finalObj.profile_photo
      }
      await updateUserData({
        ...finalObj,
        user_id: data?.user?.id
      }, {
        onSuccess: async (res) => {
          queryClient.invalidateQueries('USER')
          toast.success("Successfully Updated.")
        }
      })
    } catch (error) {
      console.log(error)
    }
  };
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='author-profile-area pt-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='author-profile-sidebar mr-20'>
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
                          <a>Update Profile</a>
                        </Tab>
                        <Tab>
                          <a>Create Auctions</a>
                        </Tab>
                        <Tab>
                          <a>NFT's</a>
                        </Tab>
                        <Tab>
                          <a>Collections</a>
                        </Tab>
                        <Tab>
                          <a>Auctions</a>
                        </Tab>
                        <Tab>
                          <a>Saved Items</a>
                        </Tab>
                      </TabList>
                    </ul>
                  </div>
                  <div className='tab_content author_tab_content pt-45'>
                    <TabPanel>
                      <div className='tabs_item'>
                        <div className='row justify-content-left'>
                          <div className='collection-form-area'>
                            <div className='collection-form'>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                  <div className='col-lg-12'>
                                    <div className='form-group'>
                                      <label>Frist Name</label>
                                      <input
                                        type='text'
                                        {...register("first_name")}
                                        name="first_name"
                                        className='form-control'
                                        placeholder='e. g. “mic”'
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name="first_name"
                                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-lg-12'>
                                    <div className='form-group'>
                                      <label>Last Name</label>
                                      <input
                                        type='text'
                                        name="last_name"
                                        {...register("last_name")}
                                        className='form-control'
                                        placeholder='e. g. “Wilson”'
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name="last_name"
                                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-lg-12 col-md-12'>
                                    <div className='form-group'>
                                      <label>Professional Summery</label>
                                      <input
                                        type='text'
                                        name="professional_summery"
                                        {...register("professional_summery")}
                                        className='form-control'
                                        placeholder='e. g. “Your Work Summery in few Line”'

                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name="professional_summery"
                                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                                      />
                                    </div>
                                  </div>

                                  <div className='col-lg-12 col-md-12'>
                                    <div className='form-group'>
                                      <label>Web 3.0 Wallet Address</label>
                                      <input
                                        type='text'
                                        name="walletAddress"
                                        {...register("walletAddress")}
                                        className='form-control'
                                        placeholder='e. g. 0x1D5E50754b504A6893E692C92aFeB2d530E79FB1'
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name="walletAddress"
                                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                                      />
                                    </div>
                                  </div>

                                  <div className='col-lg-12 col-md-12'>
                                    <div className='form-group'>
                                      <label>Profile Photo</label>
                                      <input
                                        {...register("profile_photo")}
                                        className='profileButton-input'
                                        type='file'
                                        name="profile_photo"
                                        accept='image/*'
                                      />
                                      <ErrorMessage
                                        errors={errors}
                                        name="profile_photo"
                                        render={({ message }) => <p style={{ color: "#f14D5D", padding: 10 }}>{message}</p>}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-12 col-md-12 text-center'>
                                  <button
                                    className='default-btn border-radius-5'
                                  >
                                    Update Profile
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>

                      </div>
                    </TabPanel>

                    <TabPanel>
                      <CreateAuction nfts={data?.user?.nfts?.filter((nft) => !nft.auction_iscreated)}></CreateAuction>
                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>
                          <div className='' align="center">
                            <div className='border border-red'>
                              <div className='row justify-content-ceneter px-4'>
                                <div className='pt-4'></div>
                                {data?.user?.nfts?.filter((nft) => !nft.nft_is_minted)?.length > 0 ?
                                  data?.user?.nfts?.filter((nft) => !nft.nft_is_minted)?.map((nft) => (
                                    <NFTComponentDatabase
                                      nft={nft}
                                      key={nft?.id}
                                      openDialogTitle={"Mint Now"}
                                      saved_nfts={data?.user?.saved_nfts ? data?.user?.saved_nfts : []}
                                      liked_nfts={data?.user?.liked_nfts ? data?.user?.liked_nfts : []}
                                      user={data?.user}
                                      editOrDelete={true}
                                    />
                                  )) : <div className='container mt-100'>
                                    <div className='row'>
                                      <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                                        <p>You Don't Have Unminted NFTs</p>
                                      </div>
                                    </div>
                                  </div>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='border border-red'>
                          <div className='row justify-content-ceneter px-4'>
                            <div className='pt-4'></div>
                            <NFT brefetch={true} />
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

                                    />
                                  )) : <div className='container mt-100'>
                                    <div className='row'>
                                      <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                                        <p>You Don't Have Any Collection</p>
                                      </div>
                                    </div>
                                  </div>}
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
                                {data?.user?.auctions?.length > 0 ?
                                  data?.user?.auctions?.map((auction) =>
                                  (
                                    <AuctionNFT key={auction.id} data={auction} isfromProfile={true} />
                                  )) : <>
                                    <div className='container mt-100'>
                                      <div className='row'>
                                        <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                                          <p>You Don't Have Any Auction</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>

                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>
                          <div className='' align="center">
                            <div className='border border-red'>
                              <p className='justify-content-left pt-4'>Saved Collection</p>
                              <div className='row justify-content-ceneter px-4'>
                                <hr ></hr>
                                {savedCollection?.length > 0 ?
                                  savedCollection?.map((res) =>
                                  (
                                    <CollectionComponent
                                      collection={res}
                                      profile={true}
                                      key={res?.id}
                                      savedCollection={data?.user?.saved_collection ? data?.user?.saved_collection : []}
                                      liked_collection={data?.user?.liked_collection ? data?.user?.liked_collection : []}
                                      user={data?.user}
                                      editOrDelete={false}

                                    />
                                  )) : <>
                                    <div className='container mt-100'>
                                      <div className='row'>
                                        <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                                          <p>You Don't Have Any Saved Collection</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>}
                              </div>
                            </div>
                          </div>

                          <div className='row pt-3 pb-70s'>
                            <div className='' align="center">
                              <div className='border border-red'>
                                <p className='justify-content-left pt-4'>Saved NFTS</p>
                                <div className='row justify-content-ceneter px-4'>
                                  <hr ></hr>
                                  {savedNfts?.length > 0 ?
                                    savedNfts?.map((nft) => (
                                      <NFTComponentDatabase
                                        nft={nft}
                                        key={nft?.id}
                                        openDialogTitle={"Open NFT"}
                                        saved_nfts={data?.user?.saved_nfts ? data?.user?.saved_nfts : []}
                                        liked_nfts={data?.user?.liked_nfts ? data?.user?.liked_nfts : []}
                                        user={data?.user}
                                        editOrDelete={false}
                                      />
                                    )) : <div className='container mt-100'>
                                      <div className='row'>
                                        <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                                          <p>You Don't Have Any Saved Collection</p>
                                        </div>
                                      </div>
                                    </div>}
                                </div>
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

export default UserProfile;
