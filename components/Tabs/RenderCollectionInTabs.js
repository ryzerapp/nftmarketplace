import React from 'react'
import CollectionComponent from '../Collection/CollectionComponent'
import { XMasonry, XBlock } from "react-xmasonry";
import CollectionDetails from '../Collection/CollectionDetails';

export default function RenderCollectionInTabs({ collections }) {
    return (
        <>
            <>
                <XMasonry>
                    {collections?.map((res) => (
                        <XBlock>
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


