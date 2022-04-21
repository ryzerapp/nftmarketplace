import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Loader from '../components/Common/Loader';
import { useIPFS } from '../hooks/Web3/useIPFS';
const category = ['Search by Title', 'Search by Author Address', 'Search by Contract Address']
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./../components/Common/Logos";
import NFTHeadlessDesign from '../components/NFTS/NFTHeadlessDesign';
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
import ReactPaginate from 'react-paginate';
const SearchEngine = ({ }) => {
    const [searchValue, setsearchValue] = useState("")
    const [searchResultNFTs, setsearchResultNFTs] = useState([])
    const [chainId, setchainId] = useState("eth")
    const [placeholder, setplaceholder] = useState("Search anything...")
    const [loader, setLoader] = useState(false)
    const [selectedCategory, setselectedCategory] = useState('Search by Title');
    const { resolveLink } = useIPFS();
    const [pageCount, setpageCount] = useState(0);

    let limit = 12;

    useEffect(() => {
    }, [searchResultNFTs]);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setLoader(true)
        await setData(searchValue, currentPage);
    };
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
    const setData = async (search, currentPage = 1) => {
        var data;
        if (selectedCategory == "Search by Title") {
            let cursor = null
            let owners = {}

            const options = {
                q: search,
                chain: chainId,
                offset: (currentPage - 1) * limit + 1,
                limit: limit,
                order: 'DESC',
                filter: "name"
            };
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            setpageCount(Math.ceil(NFTs?.total / limit));
            data = await nftBalanceJson(NFTs)
            console.log(data);
        }
        else if (selectedCategory == "Search by Author Address") {
            const options = { chain: chainId, address: search };
            const NFTs = await Moralis.Web3API.account.getNFTs(options);
            data = await nftBalanceJson(NFTs)
        }
        else if (selectedCategory == "Search by Contract Address") {
            const options = { chain: chainId, address: search };
            const NFTs = await Moralis.Web3API.account.getNFTs(options);
            data = await nftBalanceJson(NFTs)
        }
        if (data)
            data = data?.filter((nft) => nft.image_url !== undefined)
        setLoader(false)
        setsearchResultNFTs([]);
        setsearchResultNFTs(data);
    };
    const { Moralis } = useMoralis();

    const handleClick = async () => {
        if (selectedCategory != "Search by Title") {
            // if (!web3.utils.isAddress(searchValue)) {
            //     toast.error("Please add valid web 3 address.");
            //     return false;
            // }
        }
        setLoader(true)
        await setData(searchValue)
        setLoader(false)
    }
    const handleClickFilter = async (item) => {
        setselectedCategory(item)
        setplaceholder(item)
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
                                                    onClick={() => handleClickFilter(item)}>
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
                            <div className="form pb-3">
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
                                                    <div className='row justify-content-left'>
                                                        <div align="center">
                                                            <div className='row justify-content-ceneter px-4'>
                                                                <div className="row mt-2 mt-md-5">
                                                                    {
                                                                        searchResultNFTs?.map((nft) => (
                                                                            <>
                                                                                <NFTHeadlessDesign
                                                                                    key={nft?.token_uri}
                                                                                    title={"Open NFT"}
                                                                                    price={false}
                                                                                    nft={nft} />
                                                                            </>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) :
                                            <><h1 className='text-center pt-5'>Try Another Search</h1></> 
                                    }
                                </>
                        }
                    </div>
                </div>
                {/* {searchResultNFTs && searchResultNFTs?.length > 0
                    && */}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
                {/* } */}

            </div>
        </>
    );
};

export default SearchEngine;
