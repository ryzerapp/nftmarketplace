import React from 'react'

export default function AuthorLink({ data, classNameData }) {
    return (
        <>
            <a href={`author-profile?author_name=${data?.created_by}`} className={classNameData}>
                <img
                    src={data?.profile_photo ? data?.profile_photo : "../images/author/author-user13.png"}
                    alt='Images' />
                <span>Created by @{data?.created_by}</span>
            </a>
        </>
    )
}
