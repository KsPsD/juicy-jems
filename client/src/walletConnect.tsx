import React, { useEffect } from "react";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, useAccount } from "wagmi";
import { astar, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent as HomeImage } from "./assets/home.svg";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const projectId = "247aaa33eb367c83b0a41d9db3c1e316";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://ffc3-182-208-87-6.ngrok-free.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, astar] as const;

export const config = defaultWagmiConfig({
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
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate("/invest");
    }
  }, [isConnected]);

  return (
    <HomeImage
      style={{
        maxHeight: "calc(100vh - 80px)",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={async () => {
        await open();
      }}
    />
  );
};

export default WalletConnect;
