import React from 'react';
import { DAppProvider, ChainId } from "@usedapp/core"
import Header from './components/Header';
import Main from './components/Main';

export default function App() {


  return (
    <DAppProvider config={{}}>
      <Header />
      <Main />
    </DAppProvider>
  );

}

