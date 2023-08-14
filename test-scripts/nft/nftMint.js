const NFT = artifacts.require("NFT");

module.exports = async function (callback) {
    try {
        const nftInstance = await NFT.deployed();
        const accounts = await new web3.eth.getAccounts();

        // 任意のアドレスとトークンID、メタデータのURLを指定
        const toAddress = accounts[0];
        const tokenId = 1;
        const tokenURI = "./images/gakusei_mtg.png"; // 画像データへのURLを含むメタデータのJSONファイル

        await nftInstance.mint(toAddress, tokenId, tokenURI);
        console.log("NFT minted successfully!");
    } catch (error) {
        console.error(error);
    }
    callback();
};
