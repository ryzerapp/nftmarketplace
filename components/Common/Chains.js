import React, { useEffect, useState } from "react";
import useChain from "../../hooks/Web3/useChain";

import 'react-dropdown/style.css';
import { menuItems } from "../../utils/constants";
function Chains({ setSelectchain, selectchain }) {
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
                  backgroundColor: selectchain?.value == item?.value ? '#f6f6f6' : '#0c0d23',
                  border: selectchain?.value == item?.value ? '1px solid white' : '1px solid white',
                }}>
                  <div
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectchain(item)}
                  >
                    {item?.icon}
                    <a
                      className='ml-2'
                      style={{
                        color: selectchain?.value == item?.value ? '#0c0d23' : '#8d99ff',
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
