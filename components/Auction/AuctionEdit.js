import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import http from '../../utils/http'
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { useRouter } from 'next/router';
import { useModalAction, useModalState } from '../ui/modal/modal.context';
import formatDate from '../../utils/formatDate';

// export default function EditAuction( data ) {
export default function EditAuction() {

  const {
    data,
  } = useModalState();
  const { closeModal } = useModalAction();

  console.log('state data', data);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: data?.name ? data?.name : '',
      description: data?.description ? data?.description : '',
      auctionDate: data?.auctionDate ? data?.auctionDate : '',
      start_bid: data?.start_bid ? data?.start_bid : '',
      nfts: ''
    }
  });

  const router = useRouter()
  const onSubmit = async (submittedData) => {
    let dataTemp = { ...submittedData, id: data.id };
    try {
      await http.put('/auctions', dataTemp).then(async (res) => {
        if (res?.data?.statusCode == 201) {
          notify("Auction Edited.")
          router.push(`/auction/${data.id}`)
          closeModal();
        }
        else {
          notify(res?.data?.message)
        }
      })
    } catch (error) {
      console.log('error', error)
    }
  };
  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='collection-form-area'>
            <div className='collection-form'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Auction Name</label>
                      <input
                        type='text'
                        {...register("name")}
                        className='form-control'
                        placeholder='e. g. “walking in the air”'
                      />
                    </div>
                  </div>

                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <input
                        type='text'
                        {...register("description")}
                        className='form-control'
                        placeholder='e. g. “after purchasing you’ll able to get the real product”'

                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Select Date</label>
                      <input
                        type='date'
                        {...register("auctionDate")}
                        className='form-control'
                        placeholder='e. g. “after purchasing you’ll able to get the real product”'

                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Starting Bid</label>
                      <input
                        type='text'
                        {...register("start_bid")}
                        className='form-control'
                        placeholder='e. g. “after purchasing you’ll able to get the real product”'

                      />
                    </div>
                  </div>
                </div>
                {/* <div className='col-lg-12 col-md-12'>
                  <div className='form-group'>
                    <label>Choose Auction Image</label>
                    <select {...register("nfts")} className="mp-1">
                      {nfts && nfts.length > 0 && nfts.map((nft) => {
                        return (
                          <option
                            key={nft?.id}
                            value={nft?.id}>{nft?.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div> */}
                <div className='col-lg-12 col-md-12 text-center'>
                  <button
                    className='default-btn border-radius-5'
                    onClick={onSubmit}
                  >
                    Update Auction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  )
}
