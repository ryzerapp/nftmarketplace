import React from 'react'
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';

export default function CollectionComponent({ collection, profile, savedCollection = [], user_id }) {
    const router = useRouter()
    const queryClient = useQueryClient();
    const { mutate: updateUser } = useUpdateUserData()
    const onBookMarkCollection = async (ids) => {
        if (savedCollection?.indexOf(`${ids}`) > -1) {
            await updateUser({
                saved_collection: savedCollection?.filter((id) => parseFloat(id) != ids),
                user_id: user_id
            }, {
                onSuccess: (res) => {
                    queryClient.invalidateQueries('savedcollection')
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
                user_id: user_id
            }, {
                onSuccess: (res) => {
                    queryClient.invalidateQueries('savedcollection')
                    toast.success("Successfully Added to Saved Collecton")
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
                            <a href='author-profile.html' className='featured-user-option'>
                                <img
                                    src={collection?.collection_logo_image}

                                    alt='Images' />
                                <span>Created by @{collection?.created_by}</span>
                            </a>
                        </div>
                        <div className='d-flex flex-row ri-xl col-md-5 col-sm-12 '>
                            <i style={{
                                color: '#f14d5d', cursor: 'pointer', width: "30px",
                            }}
                                className='ri-heart-line'></i>

                            <i style={{ cursor: 'pointer' }}
                                onClick={() => onBookMarkCollection(collection?.id)}
                                className={(savedCollection.indexOf(`${collection?.id}`)) > -1 ?
                                    'ri-bookmark-fill px-1' : "ri-bookmark-line px-1"}>
                            </i>

                            <i style={{ color: '#0D6EfD', cursor: 'pointer' }}
                                className='ri-share-box-line px-1'></i>
                            {collection?.collection_name != 'cryptonium' && (
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
