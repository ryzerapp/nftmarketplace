import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function NFTDetails({ nft }) {
    const router = useRouter()
    return (
        <div className="article">
            <div className='featured-card box-shadow'>
                <div className='featured-card-img'>
                    <img src={nft?.image_url}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "../images/notfoundimage.png";
                        }}
                        alt='Images' />
                    <p>
                        <i className='ri-heart-line'></i> {nft?.total_like ? nft?.total_like : 0}
                    </p>
                    <button type='button' className='default-btn border-radius-5' onClick={() => {
                        router.push(`/nft/${nft?.id}`)
                    }
                    }
                    >
                        {"Open NFT"}
                    </button>
                </div>
                <div className='content'>
                    <h3>
                        <Link href="/nft/[slug]" as={`/nft/${nft?.id}`}>
                            <a>{nft?.name}</a>
                        </Link>
                    </h3>
                    <div className='content-in'>
                        <div className='featured-card-left'>
                            <h4>Token Id: {nft?.id}</h4>
                            <h4>Created Date: {new Date(nft?.created_at).toDateString()}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
