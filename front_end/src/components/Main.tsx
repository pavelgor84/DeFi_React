import React from "react"
import { useEthers } from "@usedapp/core"
import helper_config from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"


export default function Main() {
    //show token values from the wallet
    //Get the address of different tokens
    //Get the balance of the users wallets

    //Send the brownie-config to our 'src' folder
    //Send the build folder

    const { chainId, error } = useEthers()
    const network_name = chainId ? helper_config[chainId] : "dev"
    const dappTokenAddress = chainId ? networkMapping[chainId]["DappToken"][0] : constants.AddressZero
    console.log(typeof (chainId), chainId, dappTokenAddress)

    return (
        <div>
            main content

        </div>
    )
}