import React from 'react'
import CollectionComponent from '../Collection/CollectionComponent'

export default function RenderCollectionInTabs({ openDialogTitle, editOrDelete, user, collections, message, profile }) {
    return (
        <>
            {collections?.length > 0 ?
                collections?.map((res) =>
                (
                    <CollectionComponent
                        collection={res}
                        profile={profile}
                        key={res?.id}
                        user={user}
                        editOrDelete={editOrDelete}
                    />
                )) : <div className='container mt-100'>
                    <div className='row'>
                        <div className='col-xs-1 section-title pb-70 pt-50' align="center">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}


