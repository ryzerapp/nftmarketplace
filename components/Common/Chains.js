import React, { useEffect, useState } from "react";
import useChain from "../../hooks/Web3/useChain";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";

import 'react-dropdown/style.css';
import { useWeb3 } from "../../providers/Web3Context";
import { Actions } from "../../providers/Web3Context/reducer";


const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  }
];

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="pt-20">
      <label>
        {label}
        <select className="form-select-lg" aria-label="Default select example" value={value} onChange={onChange}>
          {options.map((option) => (
            <option
              key={option.key} value={option.key}>{option.value}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

function Chains() {
  const { switchNetwork } = useChain();
  const { chainId } = useMoralisDapp();
  const [selected, setSelected] = useState();

  const { dispatch } = useWeb3();

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleChange = (event) => {
    setSelected(event.target.value)
    if (selected)
      dispatch({ type: Actions.SET_NETWORK_ID, chainId: selected });
    switchNetwork(event.target.value);
  };
  return (
    <div className="container text-center">
      <h2 style={{ color: "#666666" }}>Connect Your wallet</h2>
      <p>
        Connect with one of available wallet providers.
      </p>
      <p>
        Select available Chains
      </p>
      <Dropdown
        label=""
        options={menuItems}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
}

export default Chains;
