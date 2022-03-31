import React, { useEffect, useState } from "react";
import useChain from "../../hooks/Web3/useChain";

import 'react-dropdown/style.css';
import { useWeb3 } from "../../providers/Web3Context";
import { Actions } from "../../providers/Web3Context/reducer";
import { menuItems } from "../../utils/constants";
import { useMoralis } from "react-moralis";

function Chains() {
  const { switchNetwork } = useChain();
  const { state: { networkId } } = useWeb3();
  const [selectchain, setSelectchain] = useState("Ethereum")
  const { dispatch } = useWeb3();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    const newSelected = menuItems.find((item) => item.value === selectchain);
    dispatch({ type: Actions.SET_NETWORK_ID, networkId: newSelected?.key });
    if (!networkId) return null;
    if (!isAuthenticated)
      switchNetwork(newSelected?.key);
  }, [selectchain]);

  return (
    <div className="container text-center">
      <h2 style={{ color: "white" }}>Connect Your wallet</h2>
      <p style={{ color: "white" }}>
        Connect with one of available wallet providers.
      </p>
      <p style={{ color: "white" }}>
        Select available Chains
      </p>
      <div className="d-flex flex-row justify-content-start align-items-center pt-20" >
        <div
          style={{
            height: 50
          }}
          className='collection-category text-center pb-3 pl-3'>
          <ul>
            {menuItems?.map((item, index) => {
              return (
                <li key={index} style={{
                  backgroundColor: selectchain == item?.value ? '#f6f6f6' : '#0c0d23',
                  border: selectchain == item?.value ? '1px solid white' : '1px solid white',
                }}>
                  <div
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectchain(item?.value)}
                  >
                    {item?.icon}
                    <a
                      className='ml-2'
                      style={{
                        color: selectchain == item?.value ? '#0c0d23' : '#8d99ff',
                      }}
                    >
                      {item?.value}
                    </a>
                  </div>

                </li>
              )
            })}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chains;
