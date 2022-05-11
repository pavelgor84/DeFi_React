import { useEthers } from "@usedapp/core";
import React from "react";


export default function Header() {
    const { account, activateBrowserWallet, deactivate } = useEthers()

    return (
        <div>
            <div>
                <button onClick={() => activateBrowserWallet()}>Connect</button>
            </div>
            {account && <p>Account: {account}</p>}
        </div>
    )
}