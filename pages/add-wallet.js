import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider';
import Chains from '../components/Common/Chains';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import { useWeb3 } from '../providers/Web3Context';
const notify = (message) => toast(message);
const AddWallet = () => {
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const [networkName, setNetworkName] = React.useState("");
  const { state: { networkId } } = useWeb3();

  React.useEffect(() => {
    if (networkId) {
      setNetworkName(networkId);
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
          <p>Networkid: {networkName}</p>
          <Chains></Chains>
          <div className='row pt-70'>
            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img1.png' alt='Images' />
                <h3>
                  <a href='contact.html'>MetaMask</a>
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
                <button className='btn btn-primary p-2 mt-2' onClick={() => handleConnect()}>
                  {isAuthenticated ? "Disconnect" : "Connect"}</button>
                <div className='top-btn'>Web 3 Wallet</div>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img2.png' alt='Images' />
                <h3>
                  <a href='contact.html'>Portol</a>
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
                <div className='top-btn'>Credit Card Follow</div>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img3.png' alt='Images' />
                <h3>
                  <a href='contact.html'> Niktin</a>
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
                <div className='top-btn'>Simple</div>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img4.png' alt='Images' />
                <h3>
                  <a href='contact.html'> Jenmar</a>
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img5.png' alt='Images' />
                <h3>
                  <a href='contact.html'>Denky</a>{' '}
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='wallet-card'>
                <img src='../images/wallet-img/wallet-img6.png' alt='Images' />
                <h3>
                  <a href='contact.html'>Cryptonium</a>
                </h3>
                <p>
                  Connect with your google, facebook, twitter or discord all
                  social media
                </p>
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='wallet-text'>
                <p>
                  We do not own your private keys and cannot access your funds
                  without your confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default AddWallet;
