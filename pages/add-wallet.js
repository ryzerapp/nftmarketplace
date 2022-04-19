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
import mixpanel from 'mixpanel-browser';

const AddWallet = () => {
  const router = useRouter();
  const { mutate, isLoading: loading } = useRegisterMutation()
  const [selectchain, setSelectchain] = useState()
  console.log(selectchain);
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const { state: { networkId } } = useWeb3();
  const { switchNetwork } = useChain();
  const { dispatch } = useWeb3();

  React.useEffect(() => {
    const newSelected = menuItems.find((item) => item.key === networkId);
    setSelectchain(newSelected?.value)
  }, [])
  const handleConnect = async () => {
    if (!selectchain && !isAuthenticated) {
      toast.error("Please Choose Blockchain")
      return;
    }
    if (!isAuthenticated && selectchain) {
      await switchNetwork(selectchain)
      await authenticate({ signingMessage: "My custom message" })
        .then(async (user) => {
          if (authError)
            toast.error(authError.message)
          else
          {
            await dispatch({ type: Actions.SET_NETWORK_ID, networkId: selectchain });
            mutate(
              { "walletAddress": user?.get('ethAddress') },
              {
                onSuccess: (res) => {
                  if (res?.data?.statusCode == 200) {
                    if (process.env.NEXT_PUBLIC_ENV == 'production') {
                      mixpanel.init(process.env.NEXT_PUBLIC_MXTOOL, { debug: process.env.NEXT_PUBLIC_ENV == 'production' ? false : true });
                      mixpanel.track('Sign up', {
                        walletAddress: user?.get('ethAddress'),
                        chainId: selectchain
                      });
                    }
                    handleLogin(res?.data);
                    router.replace('/profile')
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
      <>
        <div className='collection-widget-area pt-70 pb-70'>
          <div className='container'>
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="text-center">
                <h2 style={{ color: "white" }}>Connect Your wallet</h2>
                <p style={{ color: "white" }}>
                  Connect with one of available wallet providers.
                </p>
                <p style={{ color: "white" }}>
                  Select available Chains
                </p>
              </div>
              <div className="col-md-10 search-engine">
                <div className='collection-category text-center pt-3 pb-3'>
                  <ul>
                    {menuItems?.map((item, index) => {
                      return (
                        <li key={index} style={{
                          backgroundColor: selectchain == item?.key ? '#f6f6f6' : '#0c0d23',
                          border: selectchain == item?.key ? '1px solid white' : '1px solid white',
                        }}>
                          <div
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectchain(item?.key)}
                          >
                            {item?.icon}
                            <a
                              className='ml-2'
                              style={{
                                color: selectchain == item?.key ? '#0c0d23' : '#8d99ff',
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
                <div className="text-center">
                  <button className="btnnew"
                    style={{
                      padding: 10,
                      width: "20%",
                      backgroundColor: '#f14d5d'
                    }}
                    onClick={() => handleConnect()}
                  >{isAuthenticated ? "Disconnect" : "Connect"}</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
      {/* <div className='container'>
        <div className='row'>

          <Chains
            selectchain={selectchain}
            setSelectchain={setSelectchain}
          ></Chains>
            <button className="btn btn-danger"
              onClick={() => handleConnect()}
          >{isAuthenticated ? "Disconnect" : "Connect"}</button>
        </div>
      </div> */}
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

