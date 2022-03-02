import CryptoniumTokenABI from '../../contracts_abi/CryptoniumToken.json';
import MarketPlaceABI from '../../contracts_abi/MarketPlace.json';
import nftTokenABIJson from '../../contracts_abi/NFT.json';
import Cookies from 'js-cookie';
import { AUTH_CRED } from '../../utils/constants';

export const initialState = {
  loading: false,
  error: "",
  networkId: "",

  walletAddress: "",

  marketPlaceABI: MarketPlaceABI,
  nftTokenABI: nftTokenABIJson,
  cryptoniumTokenABI: CryptoniumTokenABI,

  isAuthenticated: Cookies.get(AUTH_CRED) != undefined ? true : false,
  nftTokenAddress: "",
  marketPlaceAddress: "",
  user: {}
}
export const Actions = {
  SET_NETWORK_ID: "SET_NETWORK_ID",
  SET_SMARTCONTACT_ADDRESS: "SET_SMARTCONTACT_ADDRESS",
  SET_USER_ADDRESS: "SET_USER_ADDRESS",
  SET_ERROR: "SET_ERROR",
  SET_USER: "SET_USER",

}
export const reducer = (state, action) => {
  switch (action.type) {
    case `${Actions.SET_SMARTCONTACT_ADDRESS}`: {
      return {
        ...state,
        nftTokenAddress: action.address.nftTokenAddress,
        marketPlaceAddress: action.address.marketPlaceAddress,
      };
    }
    case `${Actions.SET_USER_ADDRESS}`: {
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    }
    case `${Actions.SET_ERROR}`: {
      return {
        ...state,
        error: action.error,
      };
    }
    case `${Actions.SET_NETWORK_ID}`: {
      return {
        ...state,
        networkId: action.networkId,
      };
    }
    case `${Actions.SET_USER}`: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      throw new Error("Bad action type");
  }
};
