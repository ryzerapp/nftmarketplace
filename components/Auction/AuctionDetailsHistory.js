import React from 'react';
import { useBids } from '../../hooks/Web2/useAuctions';

const AuctionDetailsHistory = ({ data }) => {

  const { nfts } = data;
  const { data: bids } = useBids({
    nft_id: nfts[0]?.id
  })

  return (
    <>
      <div className='item-details-content'>
        <h3>Bid History</h3>
        <div className='item-details-into'>
          <div className='row'>
            {bids && bids.length > 0 ? bids.map((bid) => {
              return (
                <div className='col-lg-12' key={bid?.id}>
                  <div className='item-details-card'>
                    <div className='item-details-card-img'>
                      <img
                        src={bid?.created_user_photo ? bid?.created_user_photo : '../images/Item-details/Item-details2.jpg'}
                        alt='Images'
                      />
                      <i className='ri-check-line'></i>
                    </div>
                    <div className='item-details-card-content'>
                      <h3>
                        Bid Placed For <b>{bid?.cryptoCost} ETH</b>
                      </h3>
                      <span>@{bid?.created_by}</span>
                    </div>
                    <div className='work-hours'>{new Date(bid?.created_at).toDateString()}</div>
                  </div>
                </div>
              )
            }) : <>
              <p>
                Bid Not Placed Yet
              </p>
            </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionDetailsHistory;
