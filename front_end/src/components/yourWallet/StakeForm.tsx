import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { Token } from "../Main"
import { formatUnits } from "ethers/lib/utils";
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
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

    const [amount, setAmount] = useState<number | string>(0);

    const { notifications } = useNotifications();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const stakeAmonut: number = event.target.value == "" ? 0 : Number(event.target.value);
        setAmount(stakeAmonut);
    }

    const { sendApproveAndStake, overallState: approveErc20AndStakeState } = useStakeToken(tokenAddress)
    const handleClick = () => {
        const amounInWei = utils.parseEther(amount.toString());
        return sendApproveAndStake(amounInWei.toString())
    }

    const isMinig = approveErc20AndStakeState.status === "Mining";
    const [approveSuccess, setApproveSuccess] = useState(false);
    const [stakeSuccess, setStakeSuccess] = useState(false);
    const handleCloseSnack = () => {
        setApproveSuccess(false);
        setStakeSuccess(false);
    }

    useEffect(() => {
        if (notifications.filter((notification) => notification.type === "transactionSucceed" && notification.transactionName === "Approve ERC20 token").length > 0) {
            setApproveSuccess(true);
            setStakeSuccess(false);
        }
        if (notifications.filter((notification) => notification.type === "transactionSucceed" && notification.transactionName === "Stake erc20 tokens").length > 0) {
            setStakeSuccess(true);
            setApproveSuccess(false);
        }
    }, [notifications])

    return (
        <>
            <div>
                <Input placeholder="Ener amount" onChange={handleChange} />
                <Button
                    disabled={isMinig}
                    onClick={handleClick}
                    color="primary"
                    size="large">
                    {isMinig ? <CircularProgress /> : "Stake tokens"}</Button>
            </div>
            <Snackbar
                open={approveSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">ERC20 Token transfer approved. Now approve stake transaction.</Alert>
            </Snackbar>
            <Snackbar
                open={stakeSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">ERC20 Token staked!</Alert>
            </Snackbar>
        </>
    )
}