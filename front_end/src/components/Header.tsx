import { useEthers } from "@usedapp/core";
import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    },
    button: {
        color: "MediumSlateBlue"
    },
}))

export default function Header() {
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div>
                {account ? <p>Account: {account}</p> : <Button variant="contained" onClick={() => activateBrowserWallet()}>Connect your wallet</Button>}
            </div>

        </div>
    )
}