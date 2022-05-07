// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMarketplace
{
    using SafeMath for uint256;

    struct Auction {
        uint256 auctionStart; 
        uint256 auctionEnd;
        uint256 minPrice;
        uint256 buyNowPrice;
        uint256 nftHighestBid;
        address nftHighestBidder;
        address nftSeller;
    }

    struct FixedSale
    {
       address nftSeller;
       address nftBuyer;
       uint256 salePrice;
       uint256 timeOfBuy;
       uint256 timeOfSale;
    }

    mapping(address => mapping(uint256=>FixedSale)) nftContractFixedSale;
    mapping(address => mapping(uint256=>Auction)) nftContractAuctionSale;
    mapping(address => mapping(uint256=>uint256)) public nftSaleStatus;
    mapping(address => mapping(uint256=>bool)) public nftStatus;
    mapping(address => mapping(uint256=>mapping(address=>uint256))) public userBidPriceOnNFT;

    event NftFixedSale(
        address nftContractAddress,
        uint256 tokenId,
        uint256 salePrice,
        address nftSeller,
        uint256 timeOfSale
    );

    event CancelNftFixedSale(
        address nftContractAddress,
        uint256 tokenId,
        address nftSeller
    );

    event NftFixedSalePriceUpdated( 
        address nftContractAddress,
        uint256 tokenId,
        uint256 updateSalePrice
    );

    event NftBuyFromFixedSale(
        address nftContractAddress,
        uint256 tokenId,
        uint256 nftBuyPrice,
        address nftBuyer
    );
    
    event NftAuctionSale(
        address nftContractAddress,
        uint256 tokenId,
        uint256 auctionStart,
        uint256 auctionEnd,
        uint256 minPrice,
        uint256 buyNowPrice,
        address nftSeller
    );

    event NftBidPrice(
        address nftContractAddress,
        uint256 tokenId,
        uint256 bidPrice,
        address nftBidder
    );

    event NftAuctionBidPriceUpdate(
        address nftContractAddress,
        uint256 tokenId,
        uint256 finalBidPrice,
        address nftBidder
    );
    
    event CancelNftAuctionSale(
        address nftContractAddress,
        uint256 tokenId,
        address nftSeller
    );

    event NftBuyNowPriceUpdate ( 
        address nftContractAddress,
        uint256 tokenId,
        uint256 updateBuyNowPrice,
        address nftOwner
    );

    event NftAuctionSettle(
        address nftContractAddress, 
        uint256 tokenId,
        address nftHighestBidder,
        uint256 nftHighestBid,
        address nftSeller
    );

    event withdrawNftBid(
        address nftContractAddress, 
        uint256 tokenId,
        address bidClaimer
    );

    modifier isNftAlreadyInSale(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(!nftStatus[_nftContractAddress][_tokenId],"Nft already in sale");
        _;
    }

    modifier isNftInSale(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(nftStatus[_nftContractAddress][_tokenId],"Nft not in sale");
        _;
    }

    modifier isNftInFixedSale(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(nftSaleStatus[_nftContractAddress][_tokenId]==1,"Nft not in fixed sale");
        _;
    }

    modifier isNftInAuctionSale(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(nftSaleStatus[_nftContractAddress][_tokenId]==2,"Nft not in auction sale");
        _;
    }

    modifier isSaleStartByOwner(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(msg.sender == IERC721(_nftContractAddress).ownerOf(_tokenId),"You are not nft owner");
        _;
    }

    modifier isSaleResetByOwner(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(msg.sender ==nftContractFixedSale[_nftContractAddress][_tokenId].nftSeller,"You are not nft owner");
        _;
    }
    
    modifier isContractApprove(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(msg.sender == IERC721(_nftContractAddress).getApproved(_tokenId),"Nft not approved to contract");
        _;
    }

    modifier isAuctionOver(
        address _nftContractAddress, 
        uint256 _tokenId
    )
    {
        require(block.timestamp > nftContractAuctionSale[_nftContractAddress][_tokenId].auctionEnd,"Auction not end");
        _;
    }

    modifier islatestBidGreaterPreviousOne(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _bidPrice
    )
    {
        require(_bidPrice>nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBid,"Bid Greater than Previous Bid");
        _;
    }
    
    modifier isAuctionOngoing(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(block.timestamp < nftContractAuctionSale[_nftContractAddress][_tokenId].auctionEnd,"Auction end");
        _;
    }

    modifier isAuctionResetByOwner(
        address _nftContractAddress,
        uint256 _tokenId
    )
    {
        require(msg.sender == nftContractAuctionSale[_nftContractAddress][_tokenId].nftSeller,"not nft owner");
        _;
    }

    modifier isUpdatedBidGreaterPreviousOne(
        address _nftContractAddress, 
        uint256 _tokenId, 
        uint256 _updateBidPrice
    )
    {
        uint256 _finalBidPrice =  userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender].add(_updateBidPrice);
        require(_finalBidPrice>nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBid,"Bid Greater than Previous Bid");
        _;   
    }

    modifier isbidNotMakeTillNow(
        address _nftContractAddress, 
        uint256 _tokenId
    )
    {
        require(address(0) == nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBidder,"bid make");
        _;
    }
    
    modifier buyPriceMeetSalePrice(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _buyPrice
    )
    {
        require(_buyPrice>=nftContractFixedSale[_nftContractAddress][_tokenId].salePrice,"buy Price not enough");
        _;
    }

    modifier priceGreaterThanZero(
        uint256 _price
    ) 
    {
        require(_price > 0, "Price cannot be 0");
        _;
    }

    // NFT FIXED SALE

    function nftFixedSale(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _salePrice
    ) external 
      isSaleStartByOwner(_nftContractAddress,_tokenId)
      isNftAlreadyInSale(_nftContractAddress, _tokenId)
      isContractApprove(_nftContractAddress, _tokenId)
      priceGreaterThanZero(_salePrice)
    { 

        nftContractFixedSale[_nftContractAddress][_tokenId] = FixedSale(msg.sender,address(0),_salePrice,0,block.timestamp);
        
        nftStatus[_nftContractAddress][_tokenId] = true; 
        nftSaleStatus[_nftContractAddress][_tokenId] = 1;

        IERC721(_nftContractAddress).safeTransferFrom(msg.sender,address(this),_tokenId);    

        emit NftFixedSale(_nftContractAddress, _tokenId, _salePrice, msg.sender, block.timestamp);              
    }

    function cancelFixedsale(
        address _nftContractAddress,
        uint256 _tokenId
    ) external
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInFixedSale(_nftContractAddress, _tokenId)
      isSaleResetByOwner(_nftContractAddress, _tokenId)
    {
        IERC721(_nftContractAddress).safeTransferFrom(address(this),msg.sender,_tokenId);

        nftStatus[_nftContractAddress][_tokenId] = false; 
        nftSaleStatus[_nftContractAddress][_tokenId] = 0;

        nftContractFixedSale[_nftContractAddress][_tokenId] = FixedSale(address(0),address(0),0,0,0); 

        emit CancelNftFixedSale(_nftContractAddress, _tokenId,msg.sender); 
    }

    function updateFixedSalePrice(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _updateSalePrice
    ) external
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInFixedSale(_nftContractAddress, _tokenId)
      isSaleResetByOwner(_nftContractAddress, _tokenId)
      priceGreaterThanZero(_updateSalePrice)
    {
       nftContractFixedSale[_nftContractAddress][_tokenId].salePrice = _updateSalePrice;

       emit NftFixedSalePriceUpdated( _nftContractAddress, _tokenId, _updateSalePrice);
    }

    function buyFromFixedSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) external payable
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInFixedSale(_nftContractAddress, _tokenId)
      priceGreaterThanZero(msg.value)
      buyPriceMeetSalePrice(_nftContractAddress, _tokenId, msg.value)
    {
        IERC721(_nftContractAddress).safeTransferFrom(address(this),msg.sender,_tokenId);

        nftStatus[_nftContractAddress][_tokenId] = false;
        nftSaleStatus[_nftContractAddress][_tokenId] = 0;

        nftContractFixedSale[_nftContractAddress][_tokenId].timeOfBuy = block.timestamp;
        nftContractFixedSale[_nftContractAddress][_tokenId].nftBuyer  = msg.sender;

        _amountTransfer(nftContractFixedSale[_nftContractAddress][_tokenId].nftSeller,
                          nftContractFixedSale[_nftContractAddress][_tokenId].salePrice);
        
        emit NftBuyFromFixedSale(_nftContractAddress, _tokenId, msg.value, msg.sender);
    }
 
    // NFT AUCTION SALE

    function createNftAuctionSale(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _auctionStart,
        uint256 _auctionEnd,
        uint256 _minPrice,
        uint256 _buyNowPrice
    ) external
      isSaleStartByOwner(_nftContractAddress,_tokenId)
      isNftAlreadyInSale(_nftContractAddress, _tokenId)
      isContractApprove(_nftContractAddress, _tokenId)
      priceGreaterThanZero(_buyNowPrice)
    {
        nftContractAuctionSale[_nftContractAddress][_tokenId] = Auction(_auctionStart,_auctionEnd,
                                    _minPrice,_buyNowPrice,_minPrice,address(0),msg.sender);  

        nftStatus[_nftContractAddress][_tokenId] = true; 
        nftSaleStatus[_nftContractAddress][_tokenId] = 2;

        IERC721(_nftContractAddress).safeTransferFrom(msg.sender,address(this),_tokenId);  

        emit NftAuctionSale(_nftContractAddress, _tokenId, _auctionStart, _auctionEnd, _minPrice, _buyNowPrice, msg.sender);
    }
    
    function makeBid(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _bidPrice
    ) external payable
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInAuctionSale(_nftContractAddress, _tokenId)
      isAuctionOngoing(_nftContractAddress, _tokenId)
      priceGreaterThanZero(msg.value)
      islatestBidGreaterPreviousOne(_nftContractAddress, _tokenId, msg.value)
    {
        
        nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBid = _bidPrice;
        nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBidder = msg.sender;
        
        
        if(_isNftBuyNowPrice(_nftContractAddress,_tokenId,msg.value))
        {
            _transferNftAndPaySeller(_nftContractAddress,_tokenId,msg.value,msg.sender);
            userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender] = 0;
        }
        else
        {
            userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender] = _bidPrice;
        }

        emit NftBidPrice(_nftContractAddress, _tokenId, _bidPrice,msg.sender);
    }

    function updateTheBidPrice(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _updateBidPrice
    ) external payable
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInAuctionSale(_nftContractAddress, _tokenId)
      isAuctionOngoing(_nftContractAddress, _tokenId)
      priceGreaterThanZero(msg.value)
      isUpdatedBidGreaterPreviousOne(_nftContractAddress, _tokenId, msg.value)
    {
        address nftContractAddress = _nftContractAddress;
        uint256 tokenId = _tokenId;
        uint256 finalBidPrice =  userBidPriceOnNFT[nftContractAddress][tokenId][msg.sender].add(_updateBidPrice);

        nftContractAuctionSale[nftContractAddress][tokenId].nftHighestBid = finalBidPrice;
        nftContractAuctionSale[nftContractAddress][tokenId].nftHighestBidder = msg.sender;
        
        if(_isNftBuyNowPrice(nftContractAddress,tokenId,finalBidPrice))
        {
            _transferNftAndPaySeller(nftContractAddress,tokenId,finalBidPrice,msg.sender);
            userBidPriceOnNFT[nftContractAddress][tokenId][msg.sender] = 0;
        }
        else
        {
            userBidPriceOnNFT[nftContractAddress][tokenId][msg.sender] = finalBidPrice;
        }

        emit NftAuctionBidPriceUpdate(nftContractAddress, tokenId, finalBidPrice, msg.sender);
    }

    function _cancelAuctionSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) external
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInAuctionSale(_nftContractAddress, _tokenId)
      isAuctionResetByOwner(_nftContractAddress,_tokenId)
      isAuctionOngoing(_nftContractAddress, _tokenId)
      isbidNotMakeTillNow(_nftContractAddress, _tokenId)
    {
        nftStatus[_nftContractAddress][_tokenId] = false; 
        nftSaleStatus[_nftContractAddress][_tokenId] = 0;

        IERC721(_nftContractAddress).safeTransferFrom(address(this),msg.sender,_tokenId);

        emit CancelNftAuctionSale(_nftContractAddress, _tokenId,msg.sender);
    }

    function updateBuyNowPrice(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _updateBuyNowPrice
    ) external 
      isNftInSale(_nftContractAddress, _tokenId)
      isNftInAuctionSale(_nftContractAddress, _tokenId)
      isAuctionResetByOwner(_nftContractAddress,_tokenId)
      isAuctionOngoing(_nftContractAddress, _tokenId)
      priceGreaterThanZero(_updateBuyNowPrice)
    {
        nftContractAuctionSale[_nftContractAddress][_tokenId].buyNowPrice = _updateBuyNowPrice;

        emit NftBuyNowPriceUpdate (_nftContractAddress, _tokenId, _updateBuyNowPrice, msg.sender);
    }  

    function settleAuction(
        address _nftContractAddress, 
        uint256 _tokenId
    )
        external
        isNftInSale(_nftContractAddress, _tokenId)
        isNftInAuctionSale(_nftContractAddress, _tokenId)
        isAuctionOver(_nftContractAddress, _tokenId)
    {
        address nftBuyer = nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBidder;

        _transferNftAndPaySeller(_nftContractAddress, _tokenId,
                nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBid,nftBuyer);
        
        userBidPriceOnNFT[_nftContractAddress][_tokenId][nftBuyer] = 0;

        emit NftAuctionSettle( _nftContractAddress, _tokenId, nftBuyer,
           nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBid,
           nftContractAuctionSale[_nftContractAddress][_tokenId].nftSeller);
    }

    function withdrawBid(
        address _nftContractAddress, 
        uint256 _tokenId
    ) external 
      isAuctionOver(_nftContractAddress, _tokenId)
    { 
       require(msg.sender != nftContractAuctionSale[_nftContractAddress][_tokenId].nftHighestBidder,"You are highest bidder");
       require(userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender]>0,"nothing to withdraw");
       
       _amountTransfer(msg.sender,userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender]);

       userBidPriceOnNFT[_nftContractAddress][_tokenId][msg.sender] = 0;

       emit withdrawNftBid(_nftContractAddress, _tokenId, msg.sender);
    }

    function getNftAuctionSaleDetails(
        address _nftContractAddress,
        uint256 _tokenId
    ) external view returns(
        Auction memory
    )
    {
        return nftContractAuctionSale[_nftContractAddress][_tokenId];
    }

    function getNftFixedSaleDetails(
        address _nftContractAddress,
        uint256 _tokenId
    ) external view returns(
        FixedSale memory
    )
    {
        return nftContractFixedSale[_nftContractAddress][_tokenId];
    }

    function _isNftBuyNowPrice(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _bidPrice 
    ) internal view returns(
        bool
    )
    {
        if(nftContractAuctionSale[_nftContractAddress][_tokenId].buyNowPrice == _bidPrice)
        {
            return true;
        }
        else
        {
            return false;
        }        
    }

    function _transferNftAndPaySeller(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _bidPrice,
        address _nftBuyer
    ) internal
    {
       IERC721(_nftContractAddress).safeTransferFrom(address(this),_nftBuyer,_tokenId);
       
       nftStatus[_nftContractAddress][_tokenId] = false;
       nftSaleStatus[_nftContractAddress][_tokenId] = 0;

       _amountTransfer(nftContractAuctionSale[_nftContractAddress][_tokenId].nftSeller,_bidPrice);
    }
    
    function _amountTransfer(
        address _nftSeller,
        uint256 _buyAmount
    ) internal
    {
        (bool success,)  = _nftSeller.call{value: _buyAmount}("");
        require(success, "refund failed");
    }

    receive() payable external {}
}