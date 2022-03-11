import React from 'react'
import NFTComponentDatabase from '../NFTS/NFTComponentDatabase'

export default function RenderNFTInTabs({ openDialogTitle, editOrDelete, user, nfts, message, profile, formCollection }) {
    return (
        <>
            {nfts?.length > 0 ?
                nfts?.map((nft) => (
                    <NFTComponentDatabase
                        nft={nft}
                        key={nft?.id}
                        openDialogTitle={openDialogTitle}
                        user={user}
                        profile={profile}
                        formCollection={formCollection}
                        editOrDelete={editOrDelete}
                    />
                )) : <div className='container mt-100'>
                    <div className='row'>
                        <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


