import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import NFTComponentDatabase from '../components/Collection/NFTComponentDatabase';
import Loader from '../components/Common/Loader';
import Layout from '../components/Layout/Layout';
import { useUpdateUserData } from '../hooks/Web2/mutations/useUpdateUserData';
import { useMeQuery, useSavednftsQuery } from '../hooks/Web2/useMeQuery';
import { useNftOfCollection } from '../hooks/Web2/useNftOfCollection';
import toast from 'react-hot-toast';

const Collection = () => {

  const router = useRouter()
  const { data, isLoading } = useNftOfCollection({
    collection_name: router.query?.collection
  })
  const { mutate: updateSavednft } = useUpdateUserData()
  const queryClient = useQueryClient();
  const { data: users, isFetched } = useMeQuery()

  const onClickRemovedCollection = async (ids) => {
    await updateSavednft({
      saved_nfts: users?.user?.saved_nfts?.filter((id) => parseFloat(id) != ids),
    }, {
      onSuccess: (res) => {
        queryClient.invalidateQueries('useSavednftsQuery')
        toast.success("Successfully Removed from Saved Nft's")
      }
    })
  }
  const onClickSavedCollection = async (id) => {
    let lastValue = []
    if (users?.user?.saved_nfts)
      lastValue = [...users?.user?.saved_nfts]

    await updateSavednft({
      saved_nfts: [id, lastValue],
      user_id: users?.user?.id
    }, {
      onSuccess: (res) => {
        queryClient.invalidateQueries('useSavednftsQuery')
        toast.success("Successfully Added to Saved Nft's")
      }
    })
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <>
        <div className='collection-widget-area pt-70 pb-70'>
          <div className='container'>
            <div className='row'>
              <>
                <div className='row justify-content-left'>
                  <div className=''>
                    <h2>Created Nft Of Collection {router.query?.collection_name}</h2>
                  </div>
                  <hr className=''
                    style={{ color: '#f14d5d', height: "5px", borderRadius: "20px" }}></hr>
                  <div className='pb-70'></div>
                  {data?.nfts?.length > 0 ?
                    data?.nfts?.map((res) =>
                    (
                      <NFTComponentDatabase
                        nft={res}
                        key={res?.id}
                        openDialogTitle={"Mint Now"}
                        savedNfts={users?.user?.saved_nfts}
                        onClickRemovedCollection={() => onClickRemovedCollection(res?.id)}
                        onClickSavedCollection={() => onClickSavedCollection(res?.id)}
                      />
                    )
                    ) : <>
                      <div className='container mt-100'>
                        <div className='row'>
                          <div className='col-xs-1 section-title  pt-70 pb-70' align="center">
                            <h2>This Collection Don't Have Any NFT</h2>
                          </div>
                        </div>
                      </div>
                    </>}
                </div>
              </>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Collection;
