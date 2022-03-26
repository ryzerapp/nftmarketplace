import React from 'react'
import { XMasonry, XBlock } from "react-xmasonry";
import NFTDetails from '../NFTS/NFTDetails';

export default function RenderNFTInTabs({ openDialogTitle, editOrDelete, user, nfts, message, profile, formCollection }) {
    return (
        <>
            <XMasonry>
                {nfts?.map((nft) => (
                    <XBlock key={nft?.id}>
                        {
                            nft?.image_url ? (
                                <NFTDetails
                                    nft={nft}
                                />
                            ) : null
                        }

                    </XBlock>
                ))}
            </XMasonry>
        </>
    )
}


