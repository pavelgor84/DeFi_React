// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFarm is Ownable {
    //stake tokens
    //unstake tokens
    //issue tokens
    //add allowed tokens
    //getEthValue

    address[] public allowedTokens;

    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "The amount must be greather than 0");
        require(isTokenAllowed(_token) == true);
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
