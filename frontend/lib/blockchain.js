import { ethers } from 'ethers';
import { chain, configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// Replace 'your-alchemy-key' and the contract address with your actual values
const alchemyKey = 'your-alchemy-key';
const contractABI = require('../contracts/PatientRecords.json'); // Assuming ABI is available in this path
const contractAddress = 'your-contract-address';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism],
  [
    alchemyProvider({ alchemyId: alchemyKey }),
    publicProvider()
  ]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider: provider,
});

const getContract = (signerOrProvider) => new ethers.Contract(contractAddress, contractABI, signerOrProvider);

export { wagmiClient, getContract };
