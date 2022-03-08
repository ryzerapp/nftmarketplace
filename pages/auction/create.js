import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import http from '../../utils/http'
import toast, { Toaster } from 'react-hot-toast';
const notify = (message) => toast(message);
import { useRouter } from 'next/router';

export default function CreateAuction() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const onSubmit = async (data) => {
        let dataTemp = { ...data };

        try {

            if (dataTemp?.auctionImage?.length > 0) {
                const formData = new FormData();
                formData.append("file", data?.auctionImage[0]);
                formData.append("fileName", data?.auctionImage[0]?.name);
                try {
                    const res = await http.post("/attachments",
                        formData
                    );
                    if (res?.status == 201) {
                        dataTemp.auctionImage = res?.data?.image;
                    }


                } catch (ex) {
                    console.log(ex);
                }
            }

            await http.post('/auctions', dataTemp).then(async (res) => {
                console.log(res)
                if (res?.status == 201) {
                    notify("Auction Created.")
                    router.push('/auction')
                }
                else {
                    notify(res?.data?.message)
                }
            })
                .catch((err) => {
                    notify(err?.response?.data?.message)
                });

        } catch (error) {
            const { data } = error.response.data;
            if (data) {
                notify(data[0].messages[0].message);
            }
        }
    };
    return (
        <>
            <div className="container">
                <div className='user-area pt-100 pb-70'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='collection-form-area'>
                                    <div className='section-title text-center'>
                                        <h2>Create Auction</h2>
                                    </div>
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
                                            <div className='col-lg-12 col-md-12'>
                                                <div className='form-group'>
                                                    <label>Choose Auction Image</label>
                                                    <input
                                                        {...register("auctionImage")}
                                                        className='profileButton-input'
                                                        type='file'
                                                        accept='image/*'
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12 text-center'>
                                                <button
                                                    className='default-btn border-radius-5'
                                                >
                                                    Create Auction
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster></Toaster>
        </>
    )
}
