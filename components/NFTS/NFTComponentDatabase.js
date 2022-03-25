import React from 'react'
import { useQueryClient } from 'react-query';
import { useUpdateCollectionData, useUpdatenftsData, useUpdateUserData } from '../../hooks/Web2/mutations/useUpdateUserData';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { useWeb3 } from '../../providers/Web3Context';
import http from '../../utils/http';
export default function NFTComponentDatabase({ nft, openDialogTitle, user, editOrDelete, profile, formCollection }) {
    const { mutate: updateUserData } = useUpdateUserData()
    const { mutate: updateNfts } = useUpdatenftsData()
    const queryClient = useQueryClient();
    const router = useRouter()
    let saved_nfts = user?.saved_nfts ? user?.saved_nfts : [];
    let liked_nfts = user?.liked_nfts ? user?.liked_nfts : [];
    const author_name = user?.username;
    const onBookMarkCollection = async (ids) => {
        if (saved_nfts?.indexOf(`${ids}`) > -1) {
            await updateUserData({
                saved_nfts: saved_nfts?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    queryClient.invalidateQueries('useSavednftsQuery')
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (saved_nfts?.indexOf(`${ids}`) > -1) {
                        await updateNfts({
                            total_bookmark: -1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Removed from Saved Nft's")
                }
            })
        }
        else {

            await updateUserData({
                saved_nfts: saved_nfts.length == 0 ? [ids] : [ids, ...saved_nfts],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    queryClient.invalidateQueries('useSavednftsQuery')
                    if (saved_nfts?.indexOf(`${ids}`) == -1) {
                        await updateNfts({
                            total_bookmark: 1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    toast.success("Successfully Added to Saved Nft's")
                }
            })
        }
    }
    const onLikedNfts = async (ids) => {
        if (liked_nfts?.indexOf(`${ids}`) > -1) {
            await updateUserData({
                liked_nfts: liked_nfts?.filter((id) => parseFloat(id) != ids),
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)
                    // queryClient.invalidateQueries('useSavednftsQuery')
                    if (liked_nfts?.indexOf(`${ids}`) > -1) {
                        await updateNfts({
                            total_like: -1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    if (router.query?.collection)
                        queryClient.invalidateQueries(`collection_${router.query?.collection}`)

                    toast.success("Successfully Removed from Liked Nft's")
                }
            })
        }
        else {

            await updateUserData({
                liked_nfts: liked_nfts.length == 0 ? [ids] : [ids, ...liked_nfts],
                user_id: user?.id
            }, {
                onSuccess: async (res) => {
                    if (liked_nfts?.indexOf(`${ids}`) == -1) {
                        await updateNfts({
                            total_like: 1,//in backend we write update code
                            nft_id: ids
                        }, {
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                    if (author_name)
                        queryClient.invalidateQueries(`user_${author_name}`)

                    if (router.query?.collection)
                        queryClient.invalidateQueries(`collection_${router.query?.collection}`)

                    toast.success("Successfully Added to Liked Nft's")
                }
            })
        }
    }
    const { state: { nftTokenAddress } } =
        useWeb3();
    const { state: { nftTokenABI } } = useWeb3()
    const { Moralis, isAuthenticated } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();
    async function mintNFTHandle() {

        const { attributes, created_at, created_by,
            cryptoCost, cryptoType, description,
            edition, image, name, unique_string } = nft;

        const nftDataJson = {
            attributes, created_at, created_by,
            cryptoCost, cryptoType, description,
            edition, image, name, unique_string,
            image: nft?.image_url,
        };
        if (!isAuthenticated) {
            toast.success("Please Connect Web3.0 Wallet")
            return;
        }
        const file = new Moralis.File("file.json", {
            base64: btoa(JSON.stringify(nftDataJson, undefined, 1)),
            type: 'json'
        });
        const moralisFileJson = await file.saveIPFS();
        await mintNFT(moralisFileJson._ipfs);
    }
    async function mintNFT(tokenURI) {
        let options = {
            contractAddress: nftTokenAddress,
            functionName: "createToken",
            abi: nftTokenABI,
            params: {
                tokenURI: tokenURI,
            },
        };
        await contractProcessor.fetch({
            params: options,
            onSuccess: async (res) => {
                queryClient.invalidateQueries('USER')
                queryClient.invalidateQueries('USERBlockChainNFTs')

                await http.put(`/nfts/update_nft/${nft?.id}`, {
                    "nft_is_minted": true
                }).then((res) => {

                    if (res.data.status_code == 200)
                        toast.success("Your NFT is Created.")

                }).catch((err) => {
                    console.log(err)
                })
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    return (
        <div className='col-lg-3 col-md-4'>
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
                        if (openDialogTitle == "Open NFT") {
                            router.push(`/nft/${nft?.id}`)
                        }
                        else if (openDialogTitle == "Mint NFT") {
                            mintNFTHandle()
                        }
                    }
                    }
                    >
                        {openDialogTitle ? openDialogTitle : "Place Bid"}
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
                            <span>Name:{nft?.name}</span>
                            <h4>Token Id: {nft?.id}</h4>
                            <h4>Created Date: {new Date(nft?.created_at).toDateString()}</h4>
                        </div>

                        <a href='/item-details' className='featured-content-btn'>
                            <i className='ri-arrow-right-line'></i>
                        </a>
                    </div>
                    <div className='row text-center'>
                        {!formCollection ? (
                            <div className='col-lg-12'>
                                <a href={`/author-profile?author_name=${profile ? user?.username : nft?.author?.username}`} className='featured-user-option'>
                                    <img
                                        src={profile ?
                                            (user?.profile_photo ? user?.profile_photo : "../images/author/author-user13.png") :
                                            (nft?.author?.profile_photo ?
                                                nft?.author?.profile_photo : "../images/author/author-user13.png")} />
                                    <span>Created by @{profile ? user?.username : nft?.author?.username}</span>
                                </a>
                            </div>
                        ) : null}
                        <div className='col-lg-12 justify-content-center text-center'>
                            <div className='pt-20 ri-xl'>
                                <i
                                    onClick={() => onLikedNfts(nft?.id)}
                                    style={{
                                        color: '#f14d5d', cursor: 'pointer', width: "30px",
                                    }}
                                    className={(liked_nfts.indexOf(`${nft?.id}`)) > -1 ? 'ri-heart-fill' : 'ri-heart-line'}></i>

                                <i style={{ cursor: 'pointer' }}
                                    onClick={() => onBookMarkCollection(nft?.id)}
                                    className={(saved_nfts.indexOf(`${nft?.id}`)) > -1 ?
                                        'ri-bookmark-fill px-1' : "ri-bookmark-line px-1"}>
                                </i>
                                <i style={{ color: '#0D6EfD', cursor: 'pointer' }}
                                    className='ri-share-box-line px-1'></i>
                                {editOrDelete ? (
                                    <><i style={{ color: '#f14d5d', cursor: 'pointer' }} className='ri-delete-bin-fill px-1'></i>
                                        <i style={{ color: '#0D6EfD', cursor: 'pointer' }} className='ri-settings-5-line px-1'></i></>
                                ) : null}


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
