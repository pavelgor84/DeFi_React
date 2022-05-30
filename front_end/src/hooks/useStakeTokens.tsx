import { utils } from "ethers";
import { useContractFunction, useEthers } from "@usedapp/core";
import networkmapping from "../chain-info/deployments/map.json"
import { constants } from "ethers";
import tokenFarmABI from "../chain-info/contracts/TokenFarm.json"
import { Contract } from "@ethersproject/contracts";
import ERC20ABI from "../chain-info/contracts/MockERC20.json"
import { useEffect, useState } from "react";

export const useStakeToken = function (tokenAddress: string) {

    const [amountToStake, setAmountToStake] = useState("0")

    const { chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkmapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero;
    const tokenFarmInterface = new utils.Interface(tokenFarmABI.abi); // const {abi} = tokenFarmABI
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

    const ierc20ABI = ERC20ABI.abi;
    const IERC20 = new utils.Interface(ierc20ABI);
    const tokenContract = new Contract(tokenAddress, IERC20);

    const { send: erc20TokenSend, state: approveErc20State } = useContractFunction(tokenContract, "approve", { transactionName: "Approve ERC20 token" })
    const sendApproveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return erc20TokenSend(tokenFarmAddress, amount)
    }

    const { send: sendStake, state: stakeState } = useContractFunction(tokenFarmContract, "stakeTokens", { transactionName: "Stake erc20 tokens" })

    useEffect(() => {
        //console.log("STATE " + approveErc20State.status)
        if (approveErc20State.status === "Success") {
            sendStake(amountToStake, tokenAddress)
        }

    }, [approveErc20State]) //need add amountToStake , tokenAddress

    return { sendApproveAndStake, approveErc20State }
}