import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Loader from '../components/Common/Loader';
import NFTComponentBlockChainSearch from '../components/NFTS/NFTComponentBlockChainSearch';
import { useIPFS } from '../hooks/Web3/useIPFS';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./../components/Common/Logos";
const category = ['Search by Title', 'Search by Author Address', 'Search by Contract Address']
const menuItems = [
    {
        key: "eth",
        value: "Ethereum",
        icon: <ETHLogo />,
    },
    {
        key: "bsc",
        value: "Binance",
        icon: <BSCLogo />,
    },
    {
        key: "polygon",
        value: "Polygon",
        icon: <PolygonLogo />,
    },
    {
        key: "0xa86a",
        value: "Avalanche",
        icon: <AvaxLogo />,
    },
];
const SearchEngine = ({ }) => {
    const [searchValue, setsearchValue] = useState("")
    const [searchResultNFTs, setsearchResultNFTs] = useState([])
    const [chainId, setchainId] = useState("eth")
    const [placeholder, setplaceholder] = useState("Search anything...")
    const [loader, setLoader] = useState(false)
    const [selectedCategory, setselectedCategory] = useState('Search by Title');

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
                        setLoader(false)

                    }
                }
            }
            return NFTs;
        }
    };
    const setData = async (search) => {
        const options = { q: search, chain: chainId };
        console.log(options)
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        const data = await nftBalanceJson(NFTs)
        setLoader(false)
        setsearchResultNFTs([]);
        setsearchResultNFTs(data);
    };
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
                        <h1 className='text-center'>Search Engine For NFT's</h1>
                        <div className="col-md-10 search-engine pt-5">
                            <div className='collection-category text-center'>
                                <ul>
                                    {category?.map((item, index) => {
                                        return (
                                            <li key={index} style={{
                                                backgroundColor: selectedCategory == item ? '#f6f6f6' : '#0c0d23',
                                                border: selectedCategory == item ? '1px solid white' : '1px solid white',
                                            }}>
                                                <a
                                                    style={{
                                                        color: selectedCategory == item ? '#0c0d23' : '#8d99ff',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setselectedCategory(item)}>
                                                    {item}
                                                </a>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div className='collection-category text-center pt-3 pb-3'>
                                <ul>
                                    {menuItems?.map((item, index) => {
                                        return (
                                            <li key={index} style={{
                                                backgroundColor: chainId == item?.key ? '#f6f6f6' : '#0c0d23',
                                                border: chainId == item?.key ? '1px solid white' : '1px solid white',
                                            }}>
                                                <div
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setchainId(item?.key)}
                                                >
                                                    {item?.icon}
                                                    <a
                                                        className='ml-2'
                                                        style={{
                                                            color: chainId == item?.key ? '#0c0d23' : '#8d99ff',
                                                        }}
                                                    >
                                                        {item?.value}
                                                    </a>
                                                </div>

                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div className="form">
                                <i className="fa fa-search"></i>
                                <input type="text"
                                    value={searchValue}
                                    onChange={(e) => setsearchValue(e.target.value)}
                                    className="form-control form-input"
                                    placeholder={placeholder}
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
                                                                (searchResultNFTs.length > 100 ? (
                                                                    searchResultNFTs?.map((nft) => {
                                                                        return (
                                                                            <NFTComponentBlockChainSearch nft={nft} key={nft?.token_uri} />
                                                                        )
                                                                    })
                                                                ) : <><h1 className='text-center pt-5'>Try Another Search</h1></>
                                                                )
                                                        }
                                                    </div>
                                                </>
                                            ) :
                                            <><h1 className='text-center pt-5'>Try Another Search</h1></> 
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
