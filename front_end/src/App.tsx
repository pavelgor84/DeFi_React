import React from 'react';

import { DAppProvider, ChainId } from "@usedapp/core"

function App() {

  const config = {
    supportedChains: [ChainId.Rinkeby, ChainId.Kovan, 1337]
  }

  return (
    <DAppProvider config={config}>
      <div>Test</div>
    </DAppProvider>
  );
}

export default App;
