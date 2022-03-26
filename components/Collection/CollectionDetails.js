import React from 'react'
import { useRouter } from 'next/router';

export default function CollectionDetails({ collection }) {
    const router = useRouter()
    return (
        <div className="article">
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={collection?.collection_cover_image}
                        alt='Images' />
                    <p>
                        <i className='ri-heart-line'></i>
                        {collection?.total_like ? collection?.total_like : 0}
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
                </div>
            </div>
        </div >
    )
}
