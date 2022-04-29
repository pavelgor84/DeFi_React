// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenFarm is Ownable {
    //stake tokens
    //unstake tokens
    //issue tokens
    //add allowed tokens
    //getEthValue

    address[] public allowedTokens;
    mapping(address => mapping(address => uint256)) public stakingBalance; //token_address => user_address(wallet) => ammount
    mapping(address => uint256) public uniqueTokenStaked;
    mapping(address => address) public tokenPriceFeed;
    address[] stakers;
    IERC20 public dappToken;

    constructor(address _dappToken) {
        dappToken = IERC20(_dappToken);
    }

    function issueTokens() public onlyOwner {
        // totalAmountEth = for each UniqueToken -> user -> totalAmountEth + amount of Eth(token)
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 userTotalAmount = getUserTotalAmount(recipient); // total amount for a certain user in the stakers array
        }
        //transfer to the user userTotalAmount converted to DAPP token
    }

    function getUserTotalAmount(address _recipient)
        public
        view
        returns (uint256)
    {
        require(uniqueTokenStaked[_recipient] > 0, "Incorrect token");
        uint256 userTotalAmount = 0;
        for (uint256 j = 0; j < allowedTokens.length; j++) {
            address userToken = userTotalAmount +
                userSingleTokenAmount(_recipient, allowedTokens[j]);
        }
    }

    function userSingleTokenAmount(address _user, address _token)
        public
        view
        returns (uint256)
    {
        if (uniqueTokenStaked[_user] <= 0) {
            return 0;
        }
        uint256 tokenPrice = getConvertedPrice(_token);
    }

    function getConvertedPrice(address _token)
        public
        view
        returns (uint256, uint256)
    {
        address priceFeedAddress = tokenPriceFeed[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }

    function addPriceFeed(address _token, address _aggregator)
        public
        onlyOwner
    {
        tokenPriceFeed[_token] = _aggregator;
    }

    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "The amount must be greather than 0");
        require(isTokenAllowed(_token), "This token is currently not allowed");
        //transferFrom
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        checkUniqueStaker(msg.sender, _token); // !!need to revise this funciton, duplicate users = diff tokens
        stakingBalance[_token][msg.sender] =
            stakingBalance[_token][msg.sender] +
            _amount;
    }

    function checkUniqueStaker(address user, address token) internal {
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
