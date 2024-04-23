import React from 'react';

import { WagmiProvider, createConfig,fallback,http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { mainnet,sepolia } from 'wagmi/chains';

const config = createConfig(
    getDefaultConfig({
        chains: [sepolia,mainnet],
        transports: [
            { [sepolia.id]: fallback([
                http(`https://eth-mainnet.g.alchemy.com/v2/MLRwSSofmRzvYjyZ0Vtw0EkxL8QviGn0`),
            ]) },
        ],
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};