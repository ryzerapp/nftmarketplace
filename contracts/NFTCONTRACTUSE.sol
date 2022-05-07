// SPDX-License-Identifier: GPL-3.0

// Amended by HashLips
/**
    !Disclaimer!
    These contracts have been used to create tutorials,
    and was created for the purpose to teach people
    how to create smart contracts on the blockchain.
    please review this code on your own before using any of
    the following code for production.
    HashLips will not be liable in any way if for the use 
    of the code. That being said, the code has been tested 
    to the best of the developers' knowledge to work as intended.
*/

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  bool public paused = false;

  mapping(uint256 => string) tokenMetadataCID; 
  
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(address _to, uint256 _mintAmount,string[] memory _cid) public onlyOwner {
    require(_cid.length == _mintAmount,"length not equal");
    uint256 supply = totalSupply();
    require(!paused);
    require(_mintAmount > 0);
    

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
      tokenMetadataCID[(supply + i)] = _cid[i-1];
    }
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    return tokenMetadataCID[tokenId];

    // string memory cid = tokenMetadataCID[tokenId];
    // string memory currentBaseURI = _baseURI();
    // return bytes(currentBaseURI).length > 0
    //     ? string(abi.encodePacked(currentBaseURI, cid))
    //     : "";
    }

   function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
   }

   function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
   }

    function pause(bool _state) public onlyOwner {
     paused = _state;
    }

}