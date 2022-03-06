import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useQuery } from 'react-query';
import { useIPFS } from '../../hooks/Web3/useIPFS';
import { useWeb3 } from '../../providers/Web3Context';
import Loader from '../Common/Loader';
import NFTComponent from './NFTComponent';

const NFT = ({ brefetch }) => {

  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const { resolveLink } = useIPFS();

  const nftBalanceJson = async (data) => {
    if (data?.result) {
      let NFTs = data?.result;
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image_url = resolveLink(NFT.metadata?.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(NFT.token_uri)
              .then(async (response) => await response.json())
              .then((data) => {
                NFT.image_url = resolveLink(data.image);
              });
          } catch (error) {
          }
        }
      }
      return NFTs;
    }
  };

  const setData = async () => {
    const options = { chain: networkId, address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    const data = await nftBalanceJson(polygonNFTs)
    return data;
  };

  const { data: nftBalance, isLoading, refetch } = useQuery(['USERNfts'], setData, {
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
    <>
      <div className='row justify-content-center'>

        {nftBalance?.length > 0 ?
          nftBalance?.map((res) =>
          (
            <NFTComponent
              nft={res}
              key={res?.token_uri}
            />
          )
          ) : <>
            <div className='container mt-100'>
              <div className='row'>
                <div className='col-xs-1 section-title  pb-70' align="center">
                  <h2>You Don't Have Any NFT</h2>
                </div>
              </div>
            </div>
          </>}
      </div>
    </>
  );
};

export default NFT;
