import { useState, useEffect } from 'react';
import { XMasonry, XBlock } from "react-xmasonry";
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useQuery } from 'react-query';
import { useIPFS } from '../../hooks/Web3/useIPFS';
import { useWeb3 } from '../../providers/Web3Context';
import Loader from '../Common/Loader';
import NFTMasonry from './NFTMasonry';

const NFTListComponentBlockChain = ({ brefetch, walletAddressPassed }) => {

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
    const options = { chain: networkId, address: walletAddressPassed ? walletAddressPassed : walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    const data = await nftBalanceJson(polygonNFTs)
    return data;
  };


  const { data: nftBalance, isLoading, refetch } = useQuery(['USERBlockChainNFTs'], setData, {
    keepPreviousData: true,
    enabled: false
  });

  useEffect(() => {
    if (brefetch)
      refetch()
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
        <XMasonry  >
          {
            nftBalance?.map((nft) => (
              <XBlock key={nft?.token_uri}>
                {
                  nft?.image_url ? (
                    <NFTMasonry
                      nft={nft}
                    />
                  ) : null
                }

              </XBlock>
            ))}
        </XMasonry>
      </div>
    </>
  );
};

export default NFTListComponentBlockChain;
