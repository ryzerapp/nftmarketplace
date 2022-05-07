import React, { useState } from 'react'
const category = ['Art', 'Virtual Worlds', 'Trending Cards', 'Collectibles', 'Music', 'Games', 'Memes', 'NFT Gifts', 'Domains']
import { useForm } from "react-hook-form";
import http from '../utils/http'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
const notify = (message) => toast(message);
import ABI from './../contracts_abi/NFT.json';
import bytecode from './../contracts_abi/bytecode.json';
import { useWeb3 } from '../providers/Web3Context';

export default function CreateNft() {

    const [selectedCategory, setselectedCategory] = useState('Art');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const { state: { walletAddress } } = useWeb3();
    const onSubmit = async (data) => {
        let dataTemp = { ...data };
        delete dataTemp?.collection_cover
        delete dataTemp?.collection_logo
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const factory = new ethers.ContractFactory(ABI, bytecode, signer)
        const contract = await factory.deploy(process.env.NEXT_PUBLIC_NFTTOKEN_RINKEYBY_ADDRESS, dataTemp?.collection_name, dataTemp?.symbol);
        try {
            const payload = {
                ...dataTemp,
                "category": selectedCategory,
                "collection_address": contract?.address
            };
            await http.post('/collection', payload).then(async (res) => {
                if (res?.status == 201) {
                    let collection_id = res?.data?.collection?.id;
                    let finalObj = {}
                    if (data?.collection_cover?.length > 0) {
                        const formData = new FormData();
                        formData.append("file", data?.collection_cover[0]);
                        formData.append("fileName", data?.collection_cover[0]?.name);
                        try {
                            const res = await http.post("/attachments",
                                formData
                            );
                            if (res?.status == 201) {
                                finalObj.collection_cover_image = res?.data?.image;
                            }


                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                    if (data?.collection_logo?.length > 0) {
                        const formData = new FormData();
                        formData.append("file", data?.collection_logo[0]);
                        formData.append("fileName", data?.collection_logo[0]?.name);
                        try {
                            const res = await http.post("/attachments",
                                formData
                            );
                            if (res?.status == 201) {
                                finalObj.collection_logo_image = res?.data?.image;
                            }
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                    try {
                        const res = await http.put(`/collection/${collection_id}`,
                            finalObj
                        );
                        if (res?.status == 200) {
                            router.push('/collection')
                            notify(res?.data?.message)
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
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
                                        <h2>Create Collection</h2>
                                    </div>

                                    <div className='collection-form'>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <div className='form-group'>
                                                        <label>Collection Name</label>
                                                        <input
                                                            type='text'
                                                            {...register("collection_name")}
                                                            className='form-control'
                                                            placeholder='e. g. “walking in the air”'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='col-lg-12 col-md-12'>
                                                    <div className='form-group'>
                                                        <label>Collection Symbol</label>
                                                        <input
                                                            type='text'
                                                            {...register("symbol")}
                                                            className='form-control'
                                                            placeholder='e. g. “after purchasing you’ll able to get the real product”'

                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className='profile-outer'>
                                                    <h3>Upload Collection Coverimage</h3>
                                                    <div className='profileButton'>
                                                        <input
                                                            className='profileButton-input'
                                                            className='profileButton-input'
                                                            type='file'
                                                            accept='image/*'
                                                        />
                                                        <label
                                                            className='profileButton-button ripple-effect'
                                                            htmlFor='upload'
                                                        >
                                                            {file ? fileName : `e. g. Image png/jpeg`}
                                                        </label>
                                                        <span className='profileButton-file-name'></span>
                                                    </div>
                                                </div> */}

                                                <div className='col-lg-12 col-md-12'>
                                                    <div className='form-group'>
                                                        <label>Choose Collection Logo</label>
                                                        <input
                                                            {...register("collection_logo")}
                                                            className='choose-file-btn'
                                                            type='file'
                                                            accept='image/*'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-12 col-md-12'>
                                                    <div className='form-group'>
                                                        <label>Choose Collection Cover</label>
                                                        <input
                                                            {...register("collection_cover")}
                                                            className='choose-file-btn'
                                                            type='file'
                                                            accept='image/*'
                                                        />
                                                    </div>
                                                </div>

                                                <div className='collection-category'>
                                                    <h3>Choose Collection Category</h3>
                                                    <ul>
                                                        {category?.map((item, index) => {
                                                            return (
                                                                <li key={index} style={{ backgroundColor: selectedCategory == item ? '#f14d5d' : '#f6f6f6' }}>
                                                                    <a
                                                                        style={{ color: selectedCategory == item ? 'white' : '#8d99ff' }}
                                                                        onClick={() => setselectedCategory(item)}>
                                                                        {item}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-12 col-md-12 text-center'>
                                                <button
                                                    className='default-btn border-radius-5'
                                                >
                                                    Create Item
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
