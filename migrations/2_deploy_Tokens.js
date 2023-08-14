const MyToken = artifacts.require('MyToken');
const DepositedToken = artifacts.require('DepositedToken');
const NFT = artifacts.require('NFT');

module.exports = async function(deployer, network, accounts) {
    // Deploy MyToken
    await deployer.deploy(MyToken);
    const myToken = await MyToken.deployed();

    // Deploy Farm Token
    await deployer.deploy(DepositedToken, myToken.address);
    const depositedToken = await DepositedToken.deployed();

    // Deploy NFT
    await deployer.deploy(NFT, "MyNFT", "NFT");
    const nft = await NFT.deployed();
};
