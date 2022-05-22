import React, { useState } from "react";
import { Token } from "../Main"
import { Box, Tab } from "@material-ui/core"
import { TabList, TabPanel, TabContext } from "@material-ui/lab"

interface yourWalletProps {
    allowedTokens: Array<Token>
}


export default function YourWallet({ allowedTokens }: yourWalletProps) {

    const [tokenIndex, setTokenIndex] = useState("0")
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


    return (
        <Box>
            <h1>Your wallet:</h1>
            <Box>
                <TabContext value={tokenIndex}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tokenList}

                    </TabList>

                </TabContext>

            </Box>
        </Box>
    )
}