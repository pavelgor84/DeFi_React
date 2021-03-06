import React from 'react';
import { DAppProvider, Config, Kovan } from "@usedapp/core"
import Header from './components/Header';
import Main from './components/Main';
import { getDefaultProvider } from 'ethers';


const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: getDefaultProvider('kovan'),
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000
  }
}

export default function App() {

  return (
    <DAppProvider config={config}>
      <Header />
      <Main />
    </DAppProvider>
  );

}

