import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import Loader from '../Common/Loader';

const CollectionCard = () => {
  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  //counter calculation
  const [days, setDays] = useState('');
  const [loader, setLoader] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [nftBalance, setNftBalance] = useState([]);
  const router = useRouter()
  const comingSoonTime = () => {
    let endTime = new Date('December 23, 2021 17:00:00 PDT');
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let countdays = Math.floor(timeLeft / 86400);
    let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    let countminutes = Math.floor(
      (timeLeft - countdays * 86400 - counthours * 3600) / 60
    );
    let countseconds = Math.floor(
      timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
    );
    if (counthours < '10') {
      counthours = '0' + counthours;
    }
    if (countminutes < '10') {
      countminutes = '0' + countminutes;
    }
    if (countseconds < '10') {
      countseconds = '0' + countseconds;
    }

    setDays(countdays);
    setHours(counthours);
    setMinutes(countminutes);
    setSeconds(countseconds);
  };
  const setData = async () => {
    setLoader(true)
    const options = { chain: 'mumbai', address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    setNftBalance(polygonNFTs?.result)
    setLoader(false)
  };
  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated)
      setData()
    comingSoonTime()
  }, [isWeb3Enabled]);

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='row justify-content-center'>

        {nftBalance?.length > 0 ?
          nftBalance?.map((res) =>
          (
            <div className='col-lg-4 col-md-6' key={res?.token_uri}>
              <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                  <a href='item-details.html'>
                    <img src={JSON.parse(res?.metadata)?.image} alt='Images' />
                  </a>
                  <p>
                    <i className='ri-heart-line'></i> 122
                  </p>
                  <button type='button' className='default-btn border-radius-5'>
                    Place Bid
                  </button>
                </div>
                <div className='content'>
                  <h3>
                    <a href='item-details.html'>{JSON.parse(res?.metadata)?.name}</a>
                  </h3>
                  <div className='content-in'>
                    <div className='featured-card-left'>
                      <span>100 ETH 12/14</span>
                      <h4>Bid 80 ETH </h4>
                    </div>

                    <a href='item-details.html' className='featured-content-btn'>
                      <i className='ri-arrow-right-line'></i>
                    </a>
                  </div>
                  <a href='author-profile.html' className='featured-user-option'>
                    <img src='../images/featured/featured-user1.jpg' alt='Images' />
                    <span>Created by @Adison</span>
                  </a>
                </div>
              </div>
            </div>
          )
          ) : <>
            <div className='container mt-100'>
              <div className='row'>
                <div className='col-xs-1 section-title  pb-70' align="center">
                  <h2>You Don't Have Any NFT</h2>
                </div>
              </div>
            </div>
          </>}
      </div>
    </>
  );
};

export default CollectionCard;
