import React, { useEffect,useState } from "react";
import { createWeb3Modal ,useWeb3Modal} from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider ,useBalance} from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BigNumberish} from "ethers";
import { useAccount, useConnect, useDisconnect } from "wagmi";



const queryClient = new QueryClient();

const projectId = "247aaa33eb367c83b0a41d9db3c1e316";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://ffc3-182-208-87-6.ngrok-free.app",
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
  const { data: balance } = useBalance({ address });

  const [userAccount, setUserAccount] = useState<{ address?: `0x${string}`; balance?: BigNumberish }>({});
  

  const { open } = useWeb3Modal()


  const connectWallet = async () => {
    try {
    connect({ connector: connectors[0] })
      
      console.log("Connected wallet:", connectors);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setUserAccount({}); 
  };

  useEffect(() => {
    if (isConnected && address && balance) {
      setUserAccount({ address, balance: balance.value }); 
      console.log(address, balance)

    } else {
      setUserAccount({});
    }
  }, [isConnected, address, balance]);

  return (
    <div>
      <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
    </div>
  );
};

export default WalletConnect;
