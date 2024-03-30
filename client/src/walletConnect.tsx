import React from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, Typography } from "@mui/material";
import { useAccount, useConnect, useDisconnect, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

const projectId = "";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "http://localhost:3000",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export const WalletConnectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

const WalletConnect: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = async () => {
    try {
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Wallet Connect
      </Typography>
      {isConnected ? (
        <div>
          <Typography variant="body1">Connected Account: {address}</Typography>
          <Button variant="contained" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
