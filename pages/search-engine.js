import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Loader from '../components/Common/Loader';
import NFTComponentBlockChainSearch from '../components/NFTS/NFTComponentBlockChainSearch';
import { useIPFS } from '../hooks/Web3/useIPFS';

const SearchEngine = ({ }) => {
    const [searchValue, setsearchValue] = useState("")
    const [searchResultNFTs, setsearchResultNFTs] = useState([])
    const [loader, setLoader] = useState(false)
    const { resolveLink } = useIPFS();

    const nftBalanceJson = async (data) => {
        if (data?.result) {
            let NFTs = data?.result;
            for (let NFT of NFTs) {
                if (NFT?.metadata) {
                    NFT.metadata = JSON.parse(NFT.metadata);
                    NFT.image_url = resolveLink(NFT.metadata?.image ?
                        NFT.metadata?.image : NFT.metadata?.image_url);
                } else if (NFT?.token_uri) {
                    try {
                        await fetch(NFT.token_uri)
                            .then(async (response) => await response.json())
                            .then((data) => {
                                NFT.image_url = resolveLink(data.image);
                            });
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            return NFTs;
        }
    };
    const setData = async (search) => {
        const options = { q: search, chain: "eth", filter: "name" };
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        const data = await nftBalanceJson(NFTs)

        setLoader(false)
        setsearchResultNFTs(data);
    };
    console.log(searchResultNFTs)
    const { Moralis } = useMoralis();

    const handleClick = async () => {
        setLoader(true)
        await setData(searchValue)
        setLoader(false)
    }
    return (
        <>
            <div className='collection-widget-area pt-70 pb-70'>
                <div className='container'>
                    <div className="row height d-flex justify-content-center align-items-center">
                        <h1 className='text-center pb-4'>Search Engine For NFT's</h1>
                        <div className="col-md-10 search-engine">
                            <div className="form">
                                <i className="fa fa-search"></i>
                                <input type="text"
                                    value={searchValue}
                                    onChange={(e) => setsearchValue(e.target.value)}
                                    className="form-control form-input"
                                    placeholder="Search anything..."
                                />
                                <span className="left-pan">
                                    <i
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleClick()}
                                        className="fa fa-arrow-circle-right "></i>
                                </span>
                            </div>
                        </div>
                        {
                            loader ? <Loader></Loader> :
                                <>
                                    {
                                        searchResultNFTs && searchResultNFTs?.length > 0
                                            ? (
                                                <>
                                                    <div className='row justify-content-center mt-5'>
                                                        {
                                                            searchResultNFTs?.length < 100
                                                                ?
                                                                searchResultNFTs?.map((nft) => {
                                                                    return (
                                                                        <NFTComponentBlockChainSearch nft={nft} key={nft?.token_uri} />
                                                                    )
                                                                })
                                                                :
                                                                (searchResultNFTs.length == 500 ? (
                                                                    searchResultNFTs?.map((nft) => {
                                                                        return (
                                                                            <NFTComponentBlockChainSearch nft={nft} key={nft?.token_uri} />
                                                                        )
                                                                    })
                                                                ) : <h1>Hello</h1>)
                                                        }
                                                    </div>
                                                </>
                                            ) : <><h1 className='text-center pt-5'>Try Another Search</h1></>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchEngine;
