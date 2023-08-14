// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address _to, uint256 _tokenId, string memory _tokenURI) external {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    mapping(uint256 => string) private _tokenURIs;
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return _tokenURIs[_tokenId];
    }
}
