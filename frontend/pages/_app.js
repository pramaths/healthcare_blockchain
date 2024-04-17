
// frontend/pages/_app.js
import '../styles/globals.css';
import { ChainId, DAppProvider, Config } from '@usedapp/core';
import { ConnectKitProvider, getDefaultClient } from '@connectkit/client';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${alchemyId}`,
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${alchemyId}`,
  },
};

function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ConnectKitProvider client={getDefaultClient(config)}>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </DAppProvider>
  );
}

export default App;
