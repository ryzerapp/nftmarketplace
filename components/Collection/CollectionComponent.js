import React from 'react'
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useUpdateCollectionData, useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';

export default function CollectionComponent({ collection, profile, savedCollection = [], liked_collection = [], user, editOrDelete, author_name }) {
    const router = useRouter()
    const queryClient = useQueryClient();
    const { mutate: updateUser } = useUpdateUserData()
    const { mutate: updateCollection } = useUpdateCollectionData()
    const onSavedCollection = async (ids) => {
        if (savedCollection?.indexOf(`${ids}`) > -1) {
            await updateUser({
                saved_collection: savedCollection?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    queryClient.invalidateQueries('savedcollection')
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (savedCollection?.indexOf(`${ids}`) > -1) {
                        await updateCollection({
                            total_bookmark: -1,//in backend we write update code
                            collection_id: ids
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
            let lastValue = []
            if (savedCollection)
                lastValue = [...savedCollection]

            await updateUser({
                saved_collection: [ids, lastValue],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    queryClient.invalidateQueries('savedcollection')
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (savedCollection?.indexOf(`${ids}`) == -1) {
                        await updateCollection({
                            total_bookmark: 1,//in backend we write update code
                            collection_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Added to Saved Collecton")
                }
            })
        }
    }
    const onLikedNfts = async (ids) => {
        if (liked_collection?.indexOf(`${ids}`) > -1) {
            await updateUser({
                liked_collection: liked_collection?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (liked_collection?.indexOf(`${ids}`) > -1) {
                        await updateCollection({
                            total_like: -1,//in backend we write update code
                            collection_id: ids
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

            await updateUser({
                liked_collection: liked_collection.length == 0 ? [ids] : [ids, ...liked_collection],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (liked_collection?.indexOf(`${ids}`) == -1) {
                        await updateCollection({
                            total_like: 1,//in backend we write update code
                            collection_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Added to Liked Nft's")
                }
            })
        }
    }
    return (
        <div className={!profile ? 'col-lg-4 col-md-6' : 'col-lg-6'} key={collection?.id}>
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={collection?.collection_cover_image}
                        alt='Images' />
                    <p>
                        <i className='ri-heart-line'></i> 122
                    </p>
                    <button type='button' className='default-btn border-radius-5' onClick={() =>
                        router.push({
                            pathname: '/collection-nft-details',
                            query: { collection: collection?.id, collection_name: collection?.collection_name },
                        })}>
                        Open Collection
                    </button>
                </div>
                <div className='content'>
                    <h3>
                        <span>{collection?.collection_name}</span>
                    </h3>
                    <div className='content-in'>
                        <div className='featured-card-left'>
                            <h4 className="py-1" >Category: {collection?.category}</h4>
                            <h4 className="py-1" >Created Date: {new Date(collection?.created_at).toDateString()}</h4>
                            <h4 className="py-1" >Description: {collection?.description}</h4>
                        </div>

                        <i className='ri-arrow-right-line featured-content-btn'></i>
                    </div>
                    <div className='row align-items-center '>
                        <div className='col-md-7 col-sm-12'>
                            <a href={`author-profile?author_name=${collection?.created_by}`} className='featured-user-option'>
                                <img
                                    src={user?.profile_photo ? user?.profile_photo : "../images/author/author-user13.png"}
                                    alt='Images' />
                                <span>Created by @{collection?.created_by}</span>
                            </a>
                        </div>
                        <div className='d-flex flex-row ri-xl col-md-5 col-sm-12 '>
                            <i
                                onClick={() => onLikedNfts(collection?.id)}
                                style={{
                                    color: '#f14d5d', cursor: 'pointer', width: "30px",
                                }}
                                className={(liked_collection.indexOf(`${collection?.id}`)) > -1 ? 'ri-heart-fill' : 'ri-heart-line'}></i>

                            <i style={{ cursor: 'pointer' }}
                                onClick={() => onSavedCollection(collection?.id)}
                                className={(savedCollection.indexOf(`${collection?.id}`)) > -1 ?
                                    'ri-bookmark-fill px-1' : "ri-bookmark-line px-1"}>
                            </i>

                            <i style={{ color: '#0D6EfD', cursor: 'pointer' }}
                                className='ri-share-box-line px-1'></i>
                            {collection?.collection_name != 'cryptonium' && editOrDelete && (
                                <>
                                    <i style={{ color: '#f14d5d', cursor: 'pointer' }} className='ri-delete-bin-fill px-1'></i>
                                    <i style={{ color: '#0D6EfD', cursor: 'pointer' }} className='ri-settings-5-line px-1'></i>
                                </>
                            )}


                        </div>
                    </div>
                    {/* {(
                        <div className='row d-flex justify-content-center pt-2'>
                            <div className='col-lg-6'>
                                <button className='btn btn-outline-primary w-100'>Update Collection </button>
                            </div>
                            <div className='col-lg-6'>
                                <button
                                    onClick={() => onClickRemoveCollection()}
                                    className='btn btn-outline-danger w-100 mt-sm-1 mt-lg-0 mt-xs-1'>Remove Collection</button>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div >
    )
}
