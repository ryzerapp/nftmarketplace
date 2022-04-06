import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import { useWeb3 } from "../Web3Context";
import { Actions } from "../Web3Context/reducer";
import { useRegisterMutation } from "../../hooks/Web2/mutations/useRegisterMutation";
import { handleLogin, handleLogout } from "../../utils/auth";
import { useRouter } from "next/router";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user, chainId } = useMoralis();
  const router = useRouter();
  const { mutate, isLoading: loading } = useRegisterMutation()
  const { dispatch } = useWeb3();
  const changeAddress = () => {
    if (chainId == "0x4") {
      dispatch({
        type: Actions.SET_SMARTCONTACT_ADDRESS,
        address: {
          nftTokenAddress: process.env.NEXT_PUBLIC_NFTTOKEN_RINKEYBY_ADDRESS,
          marketPlaceAddress: process.env.NEXT_PUBLIC_NFTMARKETPLACE_RINKEYBY_ADDRESS
        }
      })
    }
    else if (chainId == "0x13881") {
      dispatch({
        type: Actions.SET_SMARTCONTACT_ADDRESS,
        address: {
          nftTokenAddress: process.env.NEXT_PUBLIC_NFTTOKEN_MUMBAI_ADDRESS,
          marketPlaceAddress: process.env.NEXT_PUBLIC_MARKETPLACE_MUMBAI_CONTRACT_ADDRESS
        }
      })
    }
    else if (chainId == "0xa869") {
      dispatch({
        type: Actions.SET_SMARTCONTACT_ADDRESS,
        address: {
          nftTokenAddress: process.env.NEXT_PUBLIC_NFTTOKEN_AVAX_ADDRESS,
          marketPlaceAddress: process.env.NEXT_PUBLIC_NFTMARKETPLACE_AVAX_ADDRESS
        }
      })
    }
  }

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      if (chain) {
        dispatch({ type: Actions.SET_NETWORK_ID, networkId: chain })
        changeAddress()
      }
    });

    Moralis.onAccountChanged(function (address) {
      if (address)
      {
        dispatch({ type: Actions.SET_USER_ADDRESS, walletAddress: address })
        mutate(
          { "walletAddress": address },
          {
            onSuccess: (res) => {
              if (res?.data?.statusCode == 200) {
                handleLogout()
                handleLogin(res?.data);
                router.replace('/profile')
                dispatch({ type: Actions.SET_USER, user: res?.data?.user })
              }
            },
            onError: (error) => {
              console.log(error)
            }
          }
        );
      }
    });
  }, []);


  useEffect(() => {
    dispatch({
      type: Actions.SET_NETWORK_ID,
      networkId: chainId
    })
    dispatch({
      type: Actions.SET_USER_ADDRESS,
      walletAddress: web3?.givenProvider?.selectedAddress || user?.get("ethAddress")
    })
    changeAddress()
  }, [user, web3, chainId]);

  return (
    <MoralisDappContext.Provider
      value={{
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
