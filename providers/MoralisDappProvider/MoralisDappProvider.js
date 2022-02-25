import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import CryptoniumTokenABI from '../../src/contracts/CryptoniumToken.json';
import MarketPlaceABI from '../../src/contracts/MarketPlace.json';

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  const [marketPlaceABI, setMarketPlaceABI] = useState(MarketPlaceABI);
  const [marketPlaceAddress, setMarketPlaceAddress] = useState(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS);

  const [cryptoniumTokenABI, setCryptoniumTokenABI] = useState(CryptoniumTokenABI)
  const [cryptoniumTokenAddress, setCryptoniumTokenAddress] = useState(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountChanged(function (address) {
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(() => setChainId(web3?.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3?.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketPlaceAddress,
        cryptoniumTokenABI,
        cryptoniumTokenAddress,
        marketPlaceABI,
        setMarketPlaceAddress,
        setCryptoniumTokenAddress,
        setCryptoniumTokenABI,
        setMarketPlaceABI,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
