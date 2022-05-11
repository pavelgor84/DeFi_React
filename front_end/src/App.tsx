import React from 'react';
import { DAppProvider, ChainId } from "@usedapp/core"
import Header from './components/Header';

export default function App() {


  return (
    <DAppProvider config={{}}>
      <Header />
    </DAppProvider>
  );

}

