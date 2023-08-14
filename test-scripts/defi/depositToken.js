const MyToken = artifacts.require("MyToken");
const DepositedToken = artifacts.require("DepositedToken");

module.exports = async function(callback) {
    const accounts = await new web3.eth.getAccounts();
    const myToken = await MyToken.deployed(); 
    const depositedToken = await DepositedToken.deployed(); 

    // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom. 
    // This is zero by default.
    // transferFromを通じて、使用者が所有者に代わって使用できる残りのトークン数を返す。
    // デフォルトではゼロです。
    const allowanceBefore = await myToken.allowance(accounts[0], depositedToken.address);
    console.log('Amount of MyToken DepositedToken is allowed to transfer on our behalf Before: ' + allowanceBefore.toString());

    // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf, 
    // we must explicitly allow it.
    // We allow DepositedToken to transfer x amount of MyToken on our behalf
    // スマートコントラクトがアカウント[0]に代わってMyToken (ERC-20)に転送することを許可するには、
    // 明示的に許可する必要があります。
    // DepositedTokenが私たちに代わってx量のMyTokenを送金することを許可します。
    await myToken.approve(depositedToken.address, web3.utils.toWei('1', 'ether'));

    // Validate that the DepositedToken can now move x amount of MyToken on our behalf
    const allowanceAfter = await myToken.allowance(accounts[0], depositedToken.address);
    console.log('Amount of MyToken DepositedToken is allowed to transfer on our behalf After: ' + allowanceAfter.toString());


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
    console.log('Call Deposit Function')
    await depositedToken.deposit(web3.utils.toWei('1', 'ether'));


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