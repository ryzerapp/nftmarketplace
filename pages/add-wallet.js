import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider';

const AddWallet = () => {
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const { setWalletAddress } = useMoralisDapp()
  const router = useRouter();
  const handleConnect = async () => {
    if (!isAuthenticated) {
      await authenticate()
      router.replace('/');
    }
    else
    {
      await logout()
      setWalletAddress("")
    }

    router.replace('/');
  }
  return (
    <>
      {authError && (
        <p >
          {authError.name}
          {authError.message}
        </p>
      )}
      <div className='wallet-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>Connect Your wallet</h2>
            <p>
              Connect with one of available wallet providers or create a new
              wallet. <a href='help-center.html'>What is a wallet?</a>{' '}
            </p>
          </div>

          <div className='row pt-45'>
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
    </>
  );
};

export default AddWallet;
