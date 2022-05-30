import { useEthers, useTokenBalance, } from "@usedapp/core";
import React, { useState } from "react";
import { Token } from "../Main"
import { formatUnits } from "ethers/lib/utils";
import { Button, Input } from "@material-ui/core";
import { useStakeToken } from "../../hooks/useStakeTokens";
import { utils } from "ethers"

export interface TokenFormProps {
    token: Token
}

export default function StakeForm({ token }: TokenFormProps) {

    const { address: tokenAddress, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(tokenAddress, account);
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0;

    const [amount, setAmount] = useState<number | string>(0)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const stakeAmonut: number = event.target.value == "" ? 0 : Number(event.target.value);
        setAmount(stakeAmonut);
    }

    const { sendApproveAndStake, approveErc20State } = useStakeToken(tokenAddress)
    const handleClick = () => {
        const amounInWei = utils.parseEther(amount.toString())
        return sendApproveAndStake(amounInWei.toString())
    }

    return (
        <div>
            <Input onChange={handleChange} />
            <Button onClick={handleClick} color="primary" size="large"> Stake asset</Button>

        </div>
    )
}