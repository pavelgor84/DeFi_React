import { useEthers, useTokenBalance } from "@usedapp/core";
import React from "react";
import { Token } from "../Main";

export interface WalletBalanceProps {
    token: Token
}

export default function WalletBalance({ token }: WalletBalanceProps) {

    const { address, image, name } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(address, account);
    console.log(tokenBalance);

    return (
        <div>
            Address of the token {address}
        </div>
    )
}