from multiprocessing import allow_connection_pickling
from scripts.helpful_scripts import get_account, get_contract
from brownie import DappToken, TokenFarm, network, config
from web3 import Web3

KEPT_BALANCE = Web3.toWhei(100, "ether")


def deploy_token_farm_and_dapp_token():
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    tokenFarm = TokenFarm.deploy(
        dappToken.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    tx = dappToken.transfer(
        tokenFarm.address, dappToken.totalSupply() - KEPT_BALANCE, {"from": account}
    )  # Add own DappTokens to this contract
    tx.wait(1)

    # dapp token, weth token, fau token or DAI
    weth_token = get_contract("weth_token")
    fau_token = get_contract("fau_token")
    allowed_token_dictionary = {
        weth_token: get_contract("eth_usd_price_feed"),
        fau_token: get_contract("dai_usd_price_feed"),
        dapp_token: get_contract("dai_usd_price_feed"),
    }

    add_allowed_tokens(tokenFarm, allowed_token_dictionary, account)


def add_allowed_tokens(token_farm, token_dictionary, account):
    for token in token_dictionary:
        tx_allow = token_farm.addAllowedTokens(token.address, {"from": account})
        tx_allow.wait(1)
        tx_feed = token_farm.addPriceFeed(
            token.address, token_dictionary[token], {"from": account}
        )


def main():
    deploy_token_farm_and_dapp_token()
