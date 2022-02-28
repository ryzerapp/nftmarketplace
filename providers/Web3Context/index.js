import React, { createContext, useReducer, useContext } from "react";
import { reducer, initialState, Actions } from "./reducer";

const Web3Context = createContext({ state: initialState, dispatch: () => null });

const updateNetworkId = async (dispatch, networkId) => {
  try {
    dispatch({ type: Actions.SET_NETWORK_ID, networkId });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, error })
  }
}

const Web3ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3 = () => useContext(Web3Context);

export default Web3ContextProvider;
export { useWeb3, updateNetworkId };
