import React, { useState } from "react";
import { Token } from "../Main"
import { Box, Tab } from "@material-ui/core"
import { TabList, TabPanel, TabContext } from "@material-ui/lab"
import WalletBalance from "./WalletBalance"
import StakeForm from "./StakeForm"

interface yourWalletProps {
    allowedTokens: Array<Token>
}


export default function YourWallet({ allowedTokens }: yourWalletProps) {

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
                    <div>
                        <WalletBalance token={token} />
                        <StakeForm token={token} />

                    </div>
                </TabPanel>
            )
        }
    )



    return (
        <Box>
            <h1>Your wallet:</h1>
            <Box>
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