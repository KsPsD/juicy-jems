import { Routes, Route } from "react-router-dom";
import Invest from "./invest";
import Shopping from "./Shopping";
import { WalletConnectProvider } from "./walletConnect";
import { Home } from "./Home";
import { initLocalStorage } from "./utils/localStorage";
import { useEffect, useState } from "react";

import { abi_json } from "./consts";
import Web3 from "web3";

import Header from "./Header";

function App() {
  useEffect(() => {
    initLocalStorage();
    initWeb3();
  }, []);

  const [totalSupply, setTotalSupply] = useState<number>(0);
  const initWeb3 = async () => {
    try {
      const web3 = new Web3("https://rpc.zkatana.gelato.digital");
      const abi:any = abi_json;
      const contractAddress = "0x8Fba1359F081F96Eb02c602DEDd5722cF50ACC74";

      const contract = new web3.eth.Contract(abi, contractAddress);

      console.log(contract);
      console.log("123");
      const supply = await contract.methods
        .deposit(100)
        .send({
          from: "0x33cA2A83053925995233594E79EBa44F14A8d387",
          gas: "500000",
          type: "0",
  
        });
      console.log(supply);
      console.log(contract.options);
    } catch (error) {
      console.error("Web3 초기화 오류:", error);
    }
  };

  return (
    <WalletConnectProvider>
      <Header />

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
