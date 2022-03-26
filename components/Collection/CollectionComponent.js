import React from 'react'
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useUpdateCollectionData, useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';

export default function CollectionComponent({ collection, profile, user, editOrDelete }) {
    const router = useRouter()
    const queryClient = useQueryClient();
    const { mutate: updateUser } = useUpdateUserData()
    const { mutate: updateCollection } = useUpdateCollectionData()
    const savedCollection = user?.saved_collection ? user?.saved_collection : [];
    const liked_collection = user?.liked_collection ? user?.liked_collection : [];
    const author_name = user?.username;
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
        <div className="article">
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={collection?.collection_cover_image}
                        alt='Images' />
                    <p>
                        <i className='ri-heart-line'></i> 122
                    </p>
                    <button type='button' className='default-btn border-radius-5' onClick={() =>
                        router.push(`/collection-nft-details/${collection?.id}`)}>
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
                        </div>
                    </div>
                    <div className='row align-items-center '>
                        {!profile && (
                            <div className='col-md-12 col-sm-12'>
                                <a href={`author-profile?author_name=${profile ? user?.username : collection?.author?.username}`} className='featured-user-option'>
                                    <img
                                        src={profile ?
                                            (user?.profile_photo ? user?.profile_photo : "../images/author/author-user13.png") :
                                            (collection?.author?.profile_photo ?
                                                collection?.author?.profile_photo : "../images/author/author-user13.png")}
                                        alt='Images' />
                                    <span>Created by @{profile ? user?.username : collection?.author?.username}</span>
                                </a>
                            </div>
                        )}
                        {/* <div className='d-flex flex-row ri-xl col-md-5 col-sm-12'>
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


                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}
