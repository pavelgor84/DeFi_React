import { useEthers, useTokenBalance } from "@usedapp/core";
import React from "react";
import { Token } from "../Main";
import { formatUnits } from "ethers/lib/utils";
import BalanceMsg from "../BalanceMsg";

export interface WalletBalanceProps {
    token: Token
}

export default function WalletBalance({ token }: WalletBalanceProps) {

    const { address, image, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(address, account);
    const formattedTokenBalance: number = tokenBalance
        ? parseFloat(formatUnits(tokenBalance, 18))
        : 0;
    console.log(formattedTokenBalance);

    return (
        <div>
            <BalanceMsg
                label={`Your unstaked ${name} balance.`}
                imageSrc={image}
                amount={formattedTokenBalance}
            />

        </div>
    )
}