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
import Loader from '../Common/Loader';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import { useQueryClient } from 'react-query';
import CreateAuction from '../../pages/auction/create';
import AuthorLeftSide from '../Authors/AuthorLeftSide';
import RenderNFTInTabs from '../Tabs/RenderNFTInTabs';
import RenderCollectionInTabs from '../Tabs/RenderCollectionInTabs';
import NFTListComponentBlockChain from '../NFTS/NFTListComponentBlockChain';
import NFTComponentDatabase from '../NFTS/NFTComponentDatabase';
import { XBlock, XMasonry } from 'react-xmasonry';
import AuctionNFTPrivate from '../Auction/AuctionNFTPrivate';
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
            <AuthorLeftSide user={data?.user} />
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
                      <div className='tabs_item'>
                        <CreateAuction nfts={data?.user?.nfts?.filter((nft) => !nft.auction_iscreated)}></CreateAuction>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className='tabs_item pb-70'>
                        <div className='row justify-content-left'>
                          <div className='' align="center">
                            <div className='border border-red'>
                              <div className='row justify-content-ceneter px-4'>
                                <div className='pt-4'></div>
                                <XMasonry>
                                  {data?.user?.nfts?.filter((nft) => !nft.nft_is_minted).map((nft) => (
                                    <XBlock key={nft?.id}>
                                      {
                                        <NFTComponentDatabase
                                          nft={nft}
                                          openDialogTitle={"Mint NFT"}
                                          user={data?.user}
                                          editOrDelete={true}
                                          profile={true}
                                          formCollection={false}
                                        />
                                      }

                                    </XBlock>
                                  ))}
                                </XMasonry>
                              </div>
                              <div className='border border-red'>
                                <div className='row justify-content-ceneter px-4'>
                                  <div className='pt-4'></div>
                                  <NFTListComponentBlockChain></NFTListComponentBlockChain>
                                </div>
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
                                  message="You Don't Have Any Collection"
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
                                {data?.user?.auctions?.length > 0 ?
                                  data?.user?.auctions?.map((auction) =>
                                  (
                                    <AuctionNFTPrivate key={auction.id} data={auction} isfromProfile={true} />
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
                                <RenderCollectionInTabs
                                  editOrDelete={true}
                                  user={data?.user}
                                  profile={true}
                                  collections={savedCollection ? savedCollection : []}
                                  message="You Don't Have Any Collection"
                                />
                              </div>
                            </div>
                          </div>

                          <div className='row pt-3 pb-70s'>
                            <div className='' align="center">
                              <div className='border border-red'>
                                <p className='justify-content-left pt-4'>Saved NFTS</p>
                                <div className='row justify-content-ceneter px-4'>
                                  <hr ></hr>
                                  <RenderNFTInTabs
                                    openDialogTitle={"Open NFT"}
                                    editOrDelete={true}
                                    user={data?.user}
                                    nfts={savedNfts ? savedNfts : []}
                                    message="You Don't Have Saved NFTs"
                                  />
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
