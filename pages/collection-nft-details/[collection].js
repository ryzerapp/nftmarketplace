import { useRouter } from 'next/router';
import React, { useState } from 'react';
import NFTComponentDatabase from '../../components/NFTS/NFTComponentDatabase';
import Loader from '../../components/Common/Loader';
import Layout from '../../components/Layout/Layout';
import { useMeQuery } from '../../hooks/Web2/useMeQuery';
import { useNftOfCollection } from '../../hooks/Web2/useNftOfCollection';
import RenderNFTInTabs from '../../components/Tabs/RenderNFTInTabs';

const Collection = ({ collection }) => {

  const router = useRouter()
  const { data, isLoading } = useNftOfCollection({
    collection_name: collection
  })
  const { data: users, isFetched } = useMeQuery()
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
                  <RenderNFTInTabs
                    openDialogTitle={"Open Now"}
                    editOrDelete={false}
                    user={users?.user}
                    nfts={data?.nfts ? data?.nfts : []}
                    message="This Collection Don't Have Any NFT"
                  />
                </div>
              </>
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
