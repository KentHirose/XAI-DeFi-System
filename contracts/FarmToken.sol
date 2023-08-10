// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token) ERC20("FarmToken", "FRM") {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function deposit(uint256 _amount) public {
        // 金額はゼロより大きくなければならない
        require(_amount > 0, "amount cannot be 0");

        // MyTokenをスマートコントラクトに転送する
        token.safeTransferFrom(msg.sender, address(this), _amount);

        // Mint FarmToken を msg の送信者に送る
        _mint(msg.sender, _amount);
    }

    function depositAll() public {
        // msg 送信者から MyTokens をすべて預ける。
        deposit(token.balanceOf(msg.sender));
    }

    function withdraw(uint256 _amount) public {
        // msg 送信者から FarmTokens を焼く
        _burn(msg.sender, _amount);

        // このスマートコントラクトからMyTokensをmsg送信者に転送する。
        token.safeTransfer(msg.sender, _amount);
    }
}