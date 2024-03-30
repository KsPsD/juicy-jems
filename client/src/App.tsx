import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Invest from "./invest";
import Shopping from "./Shopping";
import { WalletConnectProvider } from "./walletConnect";
import { Home } from "./Home";
import { initLocalStorage } from "./utils/localStorage";
import { useEffect } from "react";
import { useReadContract } from 'wagmi'
import {abi_json } from './consts'



function App() {
  useEffect(() => {
    initLocalStorage();
  }, []);

  const result = useReadContract({
    abi: abi_json,
    address: "0x587D35Eb8A43e2A469eB402a2626F5D9356C112b",
    functionName: 'name'
  })

  return (
    <WalletConnectProvider>
      <Sidebar />

      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="invest" element={<Invest />} />
            <Route path="shopping" element={<Shopping />} />
          </Routes>
        </div>
      </div>
    </WalletConnectProvider>
  );
}

export default App;
