const NFT = artifacts.require("NFT");

module.exports = async function (callback) {
    try {
        const nft = await NFT.deployed();
        const accounts = await new web3.eth.getAccounts();

        console.log(accounts[0]);
        const balance = await nft.balance(accounts[0]);
        console.log(balance.toString());
        
    } catch (error) {
        console.error(error);
    }
    callback();
};
