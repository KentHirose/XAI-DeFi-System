const MyToken = artifacts.require('MyToken');
const DepositedToken = artifacts.require("DepositedToken");

module.exports = async function(callback) {
    myToken = await MyToken.deployed()
    depositedToken = await DepositedToken.deployed()
    balance = await myToken.balanceOf(depositedToken.address)
    console.log(web3.utils.fromWei(balance.toString()))
    callback();
}
