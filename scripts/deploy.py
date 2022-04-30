from scripts.helpful_scripts import get_account
from brownie import DappToken, TokenFarm, network, config
from web3 import Web3

KEPT_BALANCE = Web3.toWhei(100, "ether")


def deploy_token_farm_and_dapp_token():
    account = get_account()
    dappToken = DappToken.deploy({"from": account})
    tokenFarm = TokenFarm.deploy(
        dappToken.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    tx = dappToken.transfer(
        tokenFarm.address, dappToken.totalSupply() - KEPT_BALANCE, {"from": account}
    )


def main():
    deploy_token_farm_and_dapp_token()
