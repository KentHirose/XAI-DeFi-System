// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";
import "./libraries/HexStrings.sol";

contract NFT is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    uint16 public productCount = 0;
    using HexStrings for uint256;

    mapping(uint256 => Product) public products;

    struct Product {
      string name;
      string image;
      string description;
      // 
      // 価格が流動できるようにする
      // 
      uint16 price; 
      address seller;
      address[] stockholders;
      uint16[] stockholding;
    }

    address[] stockholders;
    uint16[] stockholding;

    // stockholdingとstockholdersの初期化
    function initStockData() public {
      stockholders = new address[](0);
      stockholding = new uint16[](0);
    }

    // stockholdingとstockholdersの追加
    function addStockData(address _stockholder, uint16 _stockholding) public {
      stockholders.push(_stockholder);
      stockholding.push(_stockholding);
    }

    function safeMint(
      address _to, 
      string memory _name,
      string memory _image,
      string memory _description,
      uint16 _price,
      address _seller
    ) public {
        productCount++;
        uint256 _tokenId = productCount;
        _safeMint(_to, _tokenId);
        products[_tokenId] = Product(
          _name, 
          _image, 
          _description,
          _price,
          _seller,
          stockholders,
          stockholding
        );
    }

    function tokenURI(uint256 _tokenId) 
    public 
    view 
    override(ERC721)
    returns (string memory) {
        return string(
          abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name":"', products[_tokenId].name, 
                '", "image":"', products[_tokenId].image,
                '", "description":"', products[_tokenId].description,
                '", "price":"', Strings.toString(products[_tokenId].price),
                '", "seller":"', addressToString(products[_tokenId].seller),
                '", "stockholders":"', addressArrayToString(products[_tokenId].stockholders),
                '", "stockholding":"', uintArrayToString(products[_tokenId].stockholding),
                '"}'
              )
            )
          )
        ));
    }

    function addressToString(address addr) internal pure returns (string memory) {
    return  (uint256(uint160(addr))).toHexString(20);
    }

    // HexStringを使う
    function addressArrayToString(address[] memory addrs) internal pure returns (string memory) {
      string memory str = "";
      for (uint i = 0; i < addrs.length; i++) {
        string memory addStr = (uint256(uint160(addrs[i]))).toHexString(20);
        str = string(abi.encodePacked(str,",", addStr));
      }
      return str;
    }

    function uintArrayToString(uint16[] memory uints) internal pure returns (string memory) {
      string memory str = "";
      for (uint i = 0; i < uints.length; i++) {
        string memory addStr = Strings.toString(uints[i]);
        str = string(abi.encodePacked(str,",", addStr));
      }
      return str;
    }


    
}
