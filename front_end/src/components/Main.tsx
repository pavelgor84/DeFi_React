import React from "react"
import { useEthers } from "@usedapp/core"
import helper_config from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dai from "../dai.png"
import dapp from "../dapp.png"
import eth from "../eth.png"
import YourWallet from "./yourWallet/YourWllet"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.primary.main,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}));


export type Token = {
    address: string,
    image: string,
    name: string
}


export default function Main() {
    //show token values from the wallet
    //Get the address of different tokens
    //Get the balance of the users wallets

    //Send the brownie-config to our 'src' folder
    //Send the build folder

    const classes = useStyles();
    const { chainId, error } = useEthers()
    const network_name = chainId ? helper_config[chainId] : "dev"
    const dappTokenAddress = chainId ? networkMapping[chainId]["DappToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][network_name]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][network_name]["fau_token"] : constants.AddressZero
    //console.log(typeof (chainId), chainId, dappTokenAddress)

    const allowedTokens: Array<Token> = [
        {
            address: fauTokenAddress,
            image: dai,
            name: "DAI"

        },
        {
            address: dappTokenAddress,
            image: dapp,
            name: "DAPP"
        },
        {
            address: wethTokenAddress,
            image: eth,
            name: "WETH",
        }
    ]

    return (
        <div>
            <h2 className={classes.title}> Staking tokens. TestNet Kovan network.</h2>
            <YourWallet allowedTokens={allowedTokens} />

        </div>
    )
}