// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoniumToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;

  uint256 fee = 0.01 ether;

  struct Nft {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
  }

  Nft[] public nfts;

  event NewNft(address indexed owner, uint256 id, uint256 dna);

  // Helpers
  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function updateFee(uint256 _fee) external onlyOwner {
    fee = _fee;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  // Creation
  function _createNft(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    Nft memory newNft = Nft(_name, COUNTER, randDna, 1, randRarity);
    nfts.push(newNft);
    _safeMint(msg.sender, COUNTER);
    emit NewNft(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomNft(string memory _name) public payable {
    require(msg.value >= fee);
    _createNft(_name);
  }

  // Getters
  function getNfts() public view returns (Nft[] memory) {
    return nfts;
  }

  function getOwnerNfts(address _owner) public view returns (Nft[] memory) {
    Nft[] memory result = new Nft[](balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < nfts.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = nfts[i];
        counter++;
      }
    }
    return result;
  }

  // Actions
  function levelUp(uint256 _nftId) public {
    require(ownerOf(_nftId) == msg.sender);
    Nft storage nft = nfts[_nftId];
    nft.level++;
  }
}
