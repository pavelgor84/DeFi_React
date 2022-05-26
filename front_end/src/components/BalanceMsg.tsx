import React from "react";
import { makeStyles } from "@material-ui/core"

interface BalanceMsgProps {
    label: string,
    amount: number,
    imageSrc: string

}

const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    },
    tokenImg: {
        width: "25px"
    },
    amount: {
        fontWeight: 700
    }
}))


export default function BalanceMsg({ label, amount, imageSrc }: BalanceMsgProps) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            {label}
            <div className={classes.amount}>{amount}</div>
            <img className={classes.tokenImg} src={imageSrc} alt="Token logo"></img>

        </div>
    )
}