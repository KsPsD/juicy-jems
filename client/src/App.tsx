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
  const  [curBalance, setBalance] = useState<number>(0);

  useEffect(() => {
    initLocalStorage();
  }, []);
  useEffect(() => {
    initWeb3();
  },[curBalance])

  const PRIVATE_KEY =
    "7085b5b3d28e4fe3b8879f9e3255740bcc4475e82735ed81448c731c5a9028ca";
  const User = "0x40BEa87Bc6d629FFE827c46f3191553358742aB8";
  const CA = "0xf55de014Cc9dD632dd00a65f482381C04e1E64d2";


  const [totalSupply, setTotalSupply] = useState<number>(0);
  const initWeb3 = async () => {
    try {
      // const web3 = new Web3("https://rpc.zkatana.gelato.digital");
      const web3 = new Web3("https://rpc.public.zkevm-test.net");

      const abi = abi_json;

      const contract = new web3.eth.Contract(abi, CA);
      contract.methods.balanceOf(User).call().then((npttoken) => {
        console.log(npttoken);
        const userBalance = Number(npttoken) 
        setBalance(userBalance);
        console.log(userBalance);
      }).catch((error) => {

        console.error("Web3 초기화 오류:", error);
      })
     

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
            <Route path="invest" element={<Invest userBalance={curBalance} setBalance={setBalance}/>} />
            <Route path="shopping" element={<Shopping />} />
          </Routes>
        </div>
      </div>
    </WalletConnectProvider>
  );
}

export default App;
