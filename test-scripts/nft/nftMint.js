const NFT = artifacts.require("NFT");

module.exports = async function (callback) {
    try {
        const nftInstance = await NFT.deployed();
        const accounts = await new web3.eth.getAccounts();

        // StockDataの初期化
        await nftInstance.initStockData();
        // StockDataの追加
        // 所持者 accounts[0] 権利割合50 権利者 accounts[1] 権利割合 25 権利者 accounts[2] 権利割合 25
        await nftInstance.addStockData(accounts[0], 50);
        await nftInstance.addStockData(accounts[1], 25);
        await nftInstance.addStockData(accounts[2], 25);

        // NFTの発行
        await nftInstance.safeMint(
          accounts[0],
          "学生MTG", 
          "https://bafybeibsc746kbb4gya4fzqg2zvgfvabfxvgcrn4djx6winjdqqtyzg7ge.ipfs.w3s.link/gakusei_mtg.png", 
          "学生がMTGをしているイラストのNFT",
          1000,
          accounts[0],
          );

        // NFTのURIを取得
        const URI = await nftInstance.tokenURI(1);
        console.log(URI);
        console.log("NFT minted successfully!");
    } catch (error) {
        console.error(error);
    }
    callback();
};
