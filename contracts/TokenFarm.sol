// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TokenFarm {
    //stake tokens
    //unstake tokens
    //issue tokens
    //add allowed tokens
    //getEthValue

    address[] allowedTokens;

    function addAllowedTokens(address _token) public {
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

    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "The amount must be greather than 0");
        require(isTokenAllowed(_token) == true);
    }
}
