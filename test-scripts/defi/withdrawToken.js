const MyToken = artifacts.require("MyToken");
const DepositedToken = artifacts.require("DepositedToken");

module.exports = async function(callback) {
    const accounts = await new web3.eth.getAccounts();
    const myToken = await MyToken.deployed(); 
    const depositedToken = await DepositedToken.deployed(); 

    // Verify accounts[0] and DepositedToken balance of MyToken before and after the transfer
    balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0]);
    balanceMyTokenBeforeDepositedToken = await myToken.balanceOf(depositedToken.address);
    console.log('*** My Token ***')
    console.log('Balance MyToken Before accounts[0] ' + web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString()))
    console.log('Balance MyToken Before TokenFarm ' + web3.utils.fromWei(balanceMyTokenBeforeDepositedToken.toString()))

    console.log('*** Farm Token ***')
    balanceDepositedTokenBeforeAccounts0 = await depositedToken.balanceOf(accounts[0]);
    balanceDepositedTokenBeforeDepositedToken = await depositedToken.balanceOf(depositedToken.address);
    console.log('Balance DepositedToken Before accounts[0] ' + web3.utils.fromWei(balanceDepositedTokenBeforeAccounts0.toString()))
    console.log('Balance DepositedToken Before TokenFarm ' + web3.utils.fromWei(balanceDepositedTokenBeforeDepositedToken.toString()))

    // Call Deposit function from DepositedToken
    console.log('Call Withdraw Function')
    await depositedToken.withdraw(web3.utils.toWei('1', 'ether'));

    console.log('*** My Token ***')
    balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0]);
    balanceMyTokenAfterDepositedToken = await myToken.balanceOf(depositedToken.address);
    console.log('Balance MyToken After accounts[0] ' + web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString()))
    console.log('Balance MyToken After TokenFarm ' + web3.utils.fromWei(balanceMyTokenAfterDepositedToken.toString()))

    console.log('*** Farm Token ***')
    balanceDepositedTokenAfterAccounts0 = await depositedToken.balanceOf(accounts[0]);
    balanceDepositedTokenAfterDepositedToken = await depositedToken.balanceOf(depositedToken.address);
    console.log('Balance DepositedToken After accounts[0] ' + web3.utils.fromWei(balanceDepositedTokenAfterAccounts0.toString()))
    console.log('Balance DepositedToken After TokenFarm ' + web3.utils.fromWei(balanceDepositedTokenAfterDepositedToken.toString()))

    // End function
    callback();
}