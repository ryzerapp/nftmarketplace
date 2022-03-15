import React from 'react'

export default function AuthorLeftSide({ user }) {
    return (
        <>
            <div className='col-lg-3'>
                <div className='author-profile-sidebar  mr-20'>
                    <div className='author-user'>
                        <img
                            src={(user?.profile_photo) ? (user?.profile_photo) : "../images/author/author-user13.png"}
                            alt='Images' />
                        <i className='ri-check-line'></i>
                    </div>

                    <h3>
                        <a href='author-profile'>{user?.first_name} {user?.last_name}</a>
                    </h3>
                    <span>@{user?.username}</span>
                    <div className="d-flex .flex-wrap">
                        <p style={{
                            overflow: "hidden"
                        }}>
                            {user?.professional_summery}

                        </p>
                    </div>
                    <span>Wallet Address:</span>

                    <p > {user?.walletAddress ? ((user?.walletAddress).substr(0, 10)) + ".........." +
                        (user?.walletAddress).split("").reverse().join("").substr(0, 10).split("").reverse().join("") : "Plase Update Your Address"}</p>
                    <div className='author-content'>
                        <div className='content-left'>
                            <span>Followers</span>
                            <h4>2941</h4>
                        </div>

                        <div className='content-right'>
                            Follow
                            <ul className='author-social'>
                                <li>
                                    <a href='https://www.facebook.com/' target='_blank'>
                                        <i className='ri-facebook-fill'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://www.instagram.com/' target='_blank'>
                                        <i className='ri-instagram-fill'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='https://twitter.com/' target='_blank'>
                                        <i className='ri-twitter-fill'></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
