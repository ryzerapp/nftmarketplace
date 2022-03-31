import { useMoralis } from 'react-moralis';
import Chains from '../components/Common/Chains';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import { useWeb3 } from '../providers/Web3Context';
import useChain from "../hooks/Web3/useChain";

const notify = (message) => toast(message);
const AddWallet = () => {
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const { state: { networkId } } = useWeb3();
  const { switchNetwork } = useChain();

  React.useEffect(() => {
    if (networkId) {
      switchNetwork(networkId)
    }
  }, [networkId])

  const handleConnect = async () => {
    if (!isAuthenticated) {
      const data = await authenticate()
      if (authError && data == undefined)
        notify(authError.message)
      else
        if (data != undefined)
          notify("Wallet Connected.")
    }
    else
    {
      await logout()
      notify("Wallet Disconnected.")
    }
  }
  return (
    <>
      <div className='wallet-area pt-50 pb-70'>
        <div className='container'>
          <Chains></Chains>
          <div className='row pt-100'>
            <button className="btn btn-danger"
              onClick={() => handleConnect()}
            >{isAuthenticated ? "Disconnect" : "Connect"}</button>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default AddWallet;
{/* <div className='row pt-5'>
            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img1.png' alt='Images' />
                <h3>
                  <a >MetaMask</a>
                </h3>
                <button className='btn btn-primary p-2 mt-2' onClick={() => handleConnect()}>
                  {isAuthenticated ? "Disconnect" : "Connect"}</button>
                <div className='top-btn'>Web 3 Wallet</div>
              </div>
            </div>
            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img6.png' alt='Images' />
                <h3>
                  <a>Cryptonium</a>
                </h3>
                <button className='btn btn-primary p-2 mt-2' disabled>
                  Connect</button>
                <div className='top-btn'>Cryptonium Wallet</div>
              </div>
            </div>
          </div> */}