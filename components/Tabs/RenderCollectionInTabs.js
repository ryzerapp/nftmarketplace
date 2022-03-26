import React from 'react'
import { XMasonry, XBlock } from "react-xmasonry";
import CollectionDetails from '../Collection/CollectionDetails';

export default function RenderCollectionInTabs({ collections }) {
    return (
        <>
            <>
                <XMasonry>
                    {collections?.map((res) => (
                        <XBlock key={res?.id}>
                            {
                                < CollectionDetails
                                    collection={res}
                                />
                            }

                        </XBlock>
                    ))}
                </XMasonry>
            </>
        </>
    )
}


