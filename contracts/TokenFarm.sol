// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract TokenFarm is Ownable {
    //stake tokens
    //unstake tokens
    //issue tokens
    //add allowed tokens
    //getEthValue

    address[] public allowedTokens;
    mapping(address => mapping(address => uint256)) public stakingBalance; //token_address => user_address(wallet) => ammount
    mapping(address => uint256) public uniqueTokenStaked;
    address[] stakers;

    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "The amount must be greather than 0");
        require(isTokenAllowed(_token), "This token is currently not allowed");
        //transferFrom
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        stakingBalance[_token][msg.sender] =
            stakingBalance[_token][msg.sender] +
            _amount;
        checkUniqueStaker(msg.sender, _token);
    }

    function checkUniqueStaker(address user, address token) {
        if (stakingBalance[token][user] <= 0) {
            uniqueTokenStaked[user] = uniqueTokenStaked[user] + 1;
            stakers.push(msg.sender);
        }
    }

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    function isTokenAllowed(address _token) public returns (bool) {
        for (uint256 i; i < allowedTokens.length; i++) {
            if (allowedTokens[i] == _token) {
                return true;
            }
        }
        return false;
    }
}
