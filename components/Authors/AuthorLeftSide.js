import { useQueryClient } from "react-query";
import React, { useEffect } from 'react'
import { useUpdateFollow } from '../../hooks/Web2/mutations/useFollowMutation'
import { useFollowerQuery, useMeQuery } from '../../hooks/Web2/useMeQuery'
import toast from 'react-hot-toast';

export default function AuthorLeftSide({ user }) {
    const queryClient = useQueryClient();
    const { data, isFetched, isLoading } = useMeQuery()
    const { data: dataFollow, isFetched: isFetchedFollow, isLoading: isLoadingFollow } = useFollowerQuery({
        me: data?.user?.id,
        author: user?.id
    })
    const { mutate: updateFollower } = useUpdateFollow()
    const followButton = async (obj) => {
        await updateFollower({
            followeeId: obj.followeeId,
            followerId: data?.user?.id,
        }, {
            onSuccess: async (res) => {
                queryClient.invalidateQueries(`user_${obj.userName}`)
                queryClient.invalidateQueries(`USER`)
                queryClient.invalidateQueries(`isfollow`)
                toast.success("Followed")
            }
        })
    }
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
                            <h4>{user?.total_followers ? user.total_followers : 0}</h4>
                        </div>

                        <div>
                            <button className='content-right' disabled={dataFollow} onClick={() => { followButton({ followeeId: user.id, userName: user?.username }) }}>
                            {/* <button className='content-right' disabled={dataFollow ? "true" : "false"} onClick={() => { followButton({ followeeId: user.id, userName: user?.username }) }}> */}
                                {dataFollow ?
                                    <div>following</div> :
                                    <div>follow</div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
