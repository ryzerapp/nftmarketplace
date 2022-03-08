import React from 'react'
import { useQueryClient } from 'react-query';
import { useUpdateCollectionData, useUpdatenftsData, useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';

export default function NFTComponentDatabase({ nft, openDialogTitle, saved_nfts = [], user, editOrDelete, liked_nfts = [], author_name }) {
    const { mutate: updateUserData } = useUpdateUserData()
    const { mutate: updateNfts } = useUpdatenftsData()
    const queryClient = useQueryClient();

    const onBookMarkCollection = async (ids) => {
        if (saved_nfts?.indexOf(`${ids}`) > -1) {
            await updateUserData({
                saved_nfts: saved_nfts?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    queryClient.invalidateQueries('useSavednftsQuery')
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (saved_nfts?.indexOf(`${ids}`) > -1) {
                        await updateNfts({
                            total_bookmark: -1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Removed from Saved Nft's")
                }
            })
        }
        else {

            await updateUserData({
                saved_nfts: saved_nfts.length == 0 ? [ids] : [ids, ...saved_nfts],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    queryClient.invalidateQueries('useSavednftsQuery')
                    if (saved_nfts?.indexOf(`${ids}`) == -1) {
                        await updateNfts({
                            total_bookmark: 1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Added to Saved Nft's")
                }
            })
        }
    }
    const onLikedNfts = async (ids) => {
        if (liked_nfts?.indexOf(`${ids}`) > -1) {
            await updateUserData({
                liked_nfts: liked_nfts?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)
                    // queryClient.invalidateQueries('useSavednftsQuery')
                    if (liked_nfts?.indexOf(`${ids}`) > -1) {
                        await updateNfts({
                            total_like: -1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Removed from Liked Nft's")
                }
            })
        }
        else {

            await updateUserData({
                liked_nfts: liked_nfts.length == 0 ? [ids] : [ids, ...liked_nfts],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (liked_nfts?.indexOf(`${ids}`) == -1) {
                        await updateNfts({
                            total_like: 1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    // queryClient.invalidateQueries('useSavednftsQuery')
                    toast.success("Successfully Added to Liked Nft's")
                }
            })
        }
    }
    return (
        <div className='col-lg-4 col-md-6'>
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={nft?.image_url} alt='Images' />
                    <p>
                        <i className='ri-heart-line'></i> 122
                    </p>
                    <button type='button' className='default-btn border-radius-5'>
                        {openDialogTitle ? openDialogTitle : "Place Bid"}
                    </button>
                </div>
                <div className='content'>
                    <h3>
                        <a href='/item-details'>{nft?.name}</a>
                    </h3>
                    <div className='content-in'>
                        <div className='featured-card-left'>
                            <span>Name:{nft?.name}</span>
                            <h4>Token Id: {nft?.id}</h4>
                            <h4>Created Date: {new Date(nft?.created_at).toDateString()}</h4>
                        </div>

                        <a href='/item-details' className='featured-content-btn'>
                            <i className='ri-arrow-right-line'></i>
                        </a>
                    </div>
                    <div className='row text-center'>
                        <div className='col-lg-12'>
                            <a href={`/author-profile?author_name=${nft?.created_by}`} className='featured-user-option'>
                                <img src={user?.profile_photo ? user?.profile_photo : "../images/author/author-user13.png"} alt='Images' />
                                <span>Created by @{nft?.created_by}</span>
                            </a>
                        </div>
                        <div className='col-lg-12 justify-content-center text-center'>
                            <div className='pt-20 ri-xl'>
                                <i
                                    onClick={() => onLikedNfts(nft?.id)}
                                    style={{
                                    color: '#f14d5d', cursor: 'pointer', width: "30px",
                                }}
                                    className={(liked_nfts.indexOf(`${nft?.id}`)) > -1 ? 'ri-heart-fill' : 'ri-heart-line'}></i>

                                <i style={{ cursor: 'pointer' }}
                                    onClick={() => onBookMarkCollection(nft?.id)}
                                    className={(saved_nfts.indexOf(`${nft?.id}`)) > -1 ?
                                        'ri-bookmark-fill px-1' : "ri-bookmark-line px-1"}>
                                </i>
                                <i style={{ color: '#0D6EfD', cursor: 'pointer' }}
                                    className='ri-share-box-line px-1'></i>
                                {editOrDelete ? (
                                    <><i style={{ color: '#f14d5d', cursor: 'pointer' }} className='ri-delete-bin-fill px-1'></i>
                                        <i style={{ color: '#0D6EfD', cursor: 'pointer' }} className='ri-settings-5-line px-1'></i></>
                                ) : null}


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
