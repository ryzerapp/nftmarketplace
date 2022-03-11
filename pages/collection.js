import React, { useState } from 'react';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import RenderCollectionInTabs from '../components/Tabs/RenderCollectionInTabs';
import { useCollectionByUser } from '../hooks/Web2/useCollectionByUser';
import { useMeQuery } from '../hooks/Web2/useMeQuery';

const Collection = () => {
  const { data, isLoading } = useCollectionByUser();
  const { data: users } = useMeQuery()
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center  pt-70'>
          <RenderCollectionInTabs
            user={users?.user}
            collections={data?.collections ? data?.collections : []}
            message="You Don't Have Any Collection"
          />
        </div>
      </div>
      <InvolvedArea />
    </>
  );
};

export default Collection;
