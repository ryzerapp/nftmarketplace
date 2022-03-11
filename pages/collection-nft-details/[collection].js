import React, { useState } from 'react';
import Loader from '../../components/Common/Loader';
import Layout from '../../components/Layout/Layout';
import { useMeQuery } from '../../hooks/Web2/useMeQuery';
import { useNftOfCollection } from '../../hooks/Web2/useNftOfCollection';
import RenderNFTInTabs from '../../components/Tabs/RenderNFTInTabs';

const Collection = ({ collection }) => {
  const { data, isLoading } = useNftOfCollection({
    collection_name: collection
  })
  const { data: users } = useMeQuery()
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
            <div className='row'>
              <>
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
