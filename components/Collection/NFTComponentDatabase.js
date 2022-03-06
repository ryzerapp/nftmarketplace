import React from 'react'
import { useQueryClient } from 'react-query';
import { useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';

export default function NFTComponentDatabase({ nft, openDialogTitle, saved_nfts = [], user_id, editOrDelete }) {
    const { mutate: updateSavednft } = useUpdateUserData()
    const queryClient = useQueryClient();


    const onBookMarkCollection = async (ids) => {
        if (saved_nfts?.indexOf(`${ids}`) > -1) {
            await updateSavednft({
                saved_nfts: saved_nfts?.filter((id) => parseFloat(id) != ids),
                user_id: user_id
            }, {
                onSuccess: (res) => {
                    queryClient.invalidateQueries('useSavednftsQuery')
                    toast.success("Successfully Removed from Saved Nft's")
                }
            })
        }
        else {

            let lastValue = []
            if (saved_nfts)
                lastValue = [...saved_nfts]

            await updateSavednft({
                saved_nfts: [ids, lastValue],
                user_id: user_id
            }, {
                onSuccess: (res) => {
                    queryClient.invalidateQueries('useSavednftsQuery')
                    toast.success("Successfully Added to Saved Nft's")
                }
            })
        }
    }

    return (
        <div className='col-lg-4 col-md-6'>
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <a href='/item-details'>
                        <img src={nft?.image_url} alt='Images' />
                    </a>
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
                            <a href='author-profile.html' className='featured-user-option'>
                                <img src='../images/featured/featured-user1.jpg' alt='Images' />
                                <span>Created by @{nft?.created_by}</span>
                            </a>
                        </div>
                        <div className='col-lg-12 justify-content-center text-center'>
                            <div className='pt-20 ri-xl'>
                                <i style={{
                                    color: '#f14d5d', cursor: 'pointer', width: "30px",
                                }}
                                    className='ri-heart-line'></i>

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
