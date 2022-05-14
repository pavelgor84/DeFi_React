from scripts.helpful_scripts import get_account, get_contract
from brownie import DappToken, TokenFarm, network, config
from web3 import Web3

import yaml, json, os, shutil

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy_token_farm_and_dapp_token(update_frontend=False):
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    tokenFarm = TokenFarm.deploy(
        dapp_token.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    tx = dapp_token.transfer(
        tokenFarm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account}
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
    if update_frontend:
        update_frontend()

    return tokenFarm, dapp_token


def add_allowed_tokens(token_farm, token_dictionary, account):
    for token in token_dictionary:
        tx_allow = token_farm.addAllowedTokens(token.address, {"from": account})
        tx_allow.wait(1)
        tx_feed = token_farm.addPriceFeed(
            token.address, token_dictionary[token], {"from": account}
        )
        tx_feed.wait(1)
    return token_farm


def update_frontend():
    # Send buld folder
    copy_folder_to_front_end("./build", "./front_end/src/chain-info")

    # send to front_end our config in json format
    with open("brownie-config.yaml", "r") as brownie_config:
        conf_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
    with open("./front_end/src/brownie-config.json", "w") as brownie_config_json:
        json.dump(conf_dict, brownie_config_json)
    print("Frontend updated!")


def copy_folder_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_token_farm_and_dapp_token(update_frontend=True)
