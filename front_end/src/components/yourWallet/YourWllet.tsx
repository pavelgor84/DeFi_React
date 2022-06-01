import React, { useState } from "react";
import { Token } from "../Main"
import { Box, Tab, makeStyles } from "@material-ui/core"
import { TabList, TabPanel, TabContext } from "@material-ui/lab"
import WalletBalance from "./WalletBalance"
import StakeForm from "./StakeForm"

const useStyles = makeStyles((theme) => ({
    tabPanel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "grey",
        borderRadius: "5px"
    },
    header: {
        color: "#302e2c"
    }
}));

interface yourWalletProps {
    allowedTokens: Array<Token>
}


export default function YourWallet({ allowedTokens }: yourWalletProps) {

    const classes = useStyles();

    const [tokenIndex, setTokenIndex] = useState<string>("0")
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setTokenIndex(newValue);
    };

    const tokenList = allowedTokens.map(
        (token, index) => {
            return (
                <Tab label={token.name} value={index.toString()} key={index} />
            )
        }
    )
    const tokenForm = allowedTokens.map(
        (token, index) => {
            return (
                <TabPanel value={index.toString()} key={index}>
                    <div className={classes.tabPanel}>
                        <WalletBalance token={token} />
                        <StakeForm token={token} />

                    </div>
                </TabPanel>
            )
        }
    )



    return (
        <Box>
            <h3 className={classes.header}>Your wallet:</h3>
            <Box className={classes.box}>
                <TabContext value={tokenIndex}>
                    <TabList onChange={handleChange} aria-label="Stake form tabs">
                        {tokenList}
                    </TabList>
                    {tokenForm}

                </TabContext>

            </Box>
        </Box>
    )
}