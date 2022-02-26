import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

const CollectionCard = () => {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  //counter calculation
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [nftBalance, setNftBalance] = useState([]);
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
    const options = { chain: 'mumbai', address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    setNftBalance(polygonNFTs?.result)
  };
  useEffect(() => {
    if (isWeb3Enabled)
      setData()
    comingSoonTime()
  }, [isWeb3Enabled]);

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
                {console.log(JSON.parse(res?.metadata))}
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
          ) : null}
      </div>
    </>
  );
};

export default CollectionCard;
