import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

const AddWallet = () => {
  const { authenticate, authError, isAuthenticated, logout } = useMoralis();
  const router = useRouter();
  const handleConnect = () => {
    if (!isAuthenticated)
    {
      authenticate()
      router.replace('/');
    }
    else
      logout()
    router.replace('/');
  }
  return (
    <>
      <NavbarTwo />
      <PageBanner
        bannerHeading='Connect Your Wallet'
        parentTitle='Community'
        pageTitle='Add Wallet'
        bg='inner-bg5'
      />
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
                  <a href='contact.html'>Tezor</a>
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
      <Footer />
      <Copyright />
    </>
  );
};

export default AddWallet;
