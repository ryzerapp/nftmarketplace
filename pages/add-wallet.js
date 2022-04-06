import { useMoralis } from 'react-moralis';
import Chains from '../components/Common/Chains';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import { useWeb3 } from '../providers/Web3Context';
import useChain from "../hooks/Web3/useChain";
import { Actions } from '../providers/Web3Context/reducer';
import { menuItems } from '../utils/constants';
import Layout from '../components/Layout/Layout';
import { useRegisterMutation } from '../hooks/Web2/mutations/useRegisterMutation';
import { useRouter } from 'next/router';
import { handleLogin, handleLogout } from '../utils/auth';

const AddWallet = () => {
  const router = useRouter();
  const { mutate, isLoading: loading } = useRegisterMutation()
  const [selectchain, setSelectchain] = useState()
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const { state: { networkId } } = useWeb3();
  const { switchNetwork } = useChain();
  const { dispatch } = useWeb3();
  React.useEffect(() => {
    const newSelected = menuItems.find((item) => item.key === networkId);
    setSelectchain(newSelected?.value)
  }, [])
  const handleConnect = async () => {
    if (!selectchain?.key && !isAuthenticated) {
      toast.error("Please Choose Blockchain")
      return;
    }
    if (!isAuthenticated && selectchain?.key) {
      await switchNetwork(selectchain?.key)
      await authenticate({ signingMessage: "My custom message" })
        .then(async (user) => {
          if (authError)
            toast.error(authError.message)
          else
          {
            console.log(user.get('ethAddress'))
            await dispatch({ type: Actions.SET_NETWORK_ID, networkId: selectchain?.key });
            mutate(
              { "walletAddress": user?.get('ethAddress') },
              {
                onSuccess: (res) => {
                  if (res?.data?.statusCode == 200) {
                    handleLogin(res?.data);
                    router.replace('/discover')
                    dispatch({ type: Actions.SET_USER, user: res?.data?.user })
                  }
                  else {
                    toast.error(res?.data?.message)
                  }
                },
                onError: (error) => {

                  const { data } = error.response;

                  if (data) {
                    toast.error(data?.message);
                  }
                }
              }
            );
            toast.success("Wallet Connected.")
          }
        })

    }
    else
    {
      await logout()
      handleLogout()
      toast.success("Wallet Disconnected.")
    }
  }
  return (
    <Layout>
      <div className='wallet-area pt-50 pb-70'>
        <div className='container'>
          <Chains
            selectchain={selectchain}
            setSelectchain={setSelectchain}
          ></Chains>
          <div className='row pt-100'>
            <button className="btn btn-danger"
              onClick={() => handleConnect()}
            >{isAuthenticated ? "Disconnect" : "Connect"}</button>
          </div>
        </div>
      </div>
    </Layout>
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

