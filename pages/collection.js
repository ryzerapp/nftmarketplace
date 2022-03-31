import React, { useEffect, useState } from 'react';
import { XBlock, XMasonry } from 'react-xmasonry';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import Layout from '../components/Layout/Layout'
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../providers/Web3Context';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const Collection = () => {
  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const router = useRouter()
  const setData = async () => {
    const options = { chain: networkId, address: walletAddress };
    console.log(options)
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    var dataArr = polygonNFTs?.result?.map(item => {
      return [item.token_address, {
        token_address: item?.token_address,
        name: item?.name,
        symbol: item?.symbol,
        contract_type: item?.contract_type,
      }]
    });
    var maparr = new Map(dataArr); // create key value pair from array of array
    return [...maparr.values()];
  };
  const { data: collections, isLoading, refetch } = useQuery(['usercollection'], setData, {
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
      <div className='container'>
        <div className='row justify-content-center  pt-70'>
          <XMasonry>
            {collections?.map((collection) => (
              <XBlock key={collection?.token_address}>
                {
                  <div className="article">
                    <div className='featured-card box-shadow'>
                      <div className='featured-card-img'>
                        <button type='button' className='default-btn border-radius-5' onClick={() =>
                          router.push(`/collection-nft-details/${collection?.token_address}`)}>
                          Open Collection
                        </button>
                      </div>
                      <div className='content'>
                        <h3>
                          <span>{collection?.name}</span>
                        </h3>
                        <p>{collection?.contract_type}</p>
                      </div>
                    </div>
                  </div >
                }
              </XBlock>
            ))}
          </XMasonry>
        </div>
      </div>
      <InvolvedArea />
    </Layout>
  );
};

export default Collection;
