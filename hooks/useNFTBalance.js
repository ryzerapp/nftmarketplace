import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTBalance = (options) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  console.log(chainId)
  const { resolveLink } = useIPFS();
  const [NFTBalance, setNFTBalance] = useState([]);
  const {
    fetch: getNFTBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTs, {
    chain: "80001", chain: chainId,
    address: "0x1D5E50754b504A6893E692C92aFeB2d530E79FB1",
    limit: 10,
  });
  console.log(data);
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const nftBalance = async () => {
    if (data?.result) {
      const NFTs = data.result;
      console.log(NFTs)
      setFetchSuccess(true);
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image = resolveLink(NFT.metadata?.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(NFT.token_uri)
              .then((response) => response.json())
              .then((data) => {
                NFT.image = resolveLink(data.image);
              });
          } catch (error) {
            setFetchSuccess(false);
          }
        }
      }
      console.log('Nfts', NFTs)
      setNFTBalance(NFTs);
    }
  };
  useEffect(() => {
    nftBalance();
  }, [data]);

  return { getNFTBalance, NFTBalance, fetchSuccess, error, isLoading };
};
