import { Routes, Route } from "react-router-dom";
import Invest from "./invest";
import Shopping from "./Shopping";
import { WalletConnectProvider } from "./walletConnect";
import { Home } from "./Home";
import { initLocalStorage } from "./utils/localStorage";
import { useEffect, useState } from "react";

import { abi_json } from "./consts";
import {stnpt_json} from "./stnptabi";
import { random_json } from "./randomabi";
import Web3 from "web3";

import Header from "./Header";


function App() {
  const  [curBalance, setBalance] = useState<number>(0);

  useEffect(() => {
    initLocalStorage();
    initWeb3();
  }, []);
  
  useEffect(() => {
    initWeb3();
  },[curBalance])

  const PRIVATE_KEY =
    "7085b5b3d28e4fe3b8879f9e3255740bcc4475e82735ed81448c731c5a9028ca";
  const User = "0x40BEa87Bc6d629FFE827c46f3191553358742aB8";
  const CA = "0xf55de014Cc9dD632dd00a65f482381C04e1E64d2"
  const stnpTokenAddr="0xAa13a89Fc1529e9b22D2eae6A892c172b7B4D13e";
  const randomAddr="0x944742D2d70D9820C9C79E01fe3cE63D114a4f2a";



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
      const contract = new web3.eth.Contract(abi,CA);

        console.error("Web3 초기화 오류:", error);
      })
      console.log(contract)
      const npttoken= await contract.methods.balanceOf(User).call()
      console.log("ntp balance",npttoken)

      const stnpt=stnpt_json;
      const contract2 = new web3.eth.Contract(stnpt,stnpTokenAddr);
      const stnpttoken= await contract2.methods.balanceOf(User).call();
      console.log("stnpt balance", stnpttoken)

      const random=random_json;
      const contract3= new web3.eth.Contract(random,randomAddr);
      const ownTokenNum= await contract3.methods.balanceOf(User,1).call()
      console.log("random balance",ownTokenNum)

    } catch (error) {
      console.error("Web3 초기화 오류:", error);
    }
  };

 

  // random value return tx

  // async function withdrawTransaction() {

  //   const encodedData = '0x' + web3.eth.abi.encodeFunctionCall({
  //       "inputs": [],
  //       "name": "selectItem",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function",
      
  //   // 트랜잭션 객체 생성
  //   const txObject = {
  //     nonce: web3.utils.toHex(await web3.eth.getTransactionCount(User)),
  //     gasLimit: web3.utils.toHex(500000), // 충분한 가스 한도 설정
  //     gasPrice: web3.utils.toHex(10e9), // 가스 가격 (10 Gwei)
  //     to: randomAddr, // 대상 스마트 계약 주소
  //     value: '0x00', // 이더 전송 없음
  //     data: encodedData
  //   };

  //   const signedTx = await web3.eth.accounts.signTransaction(txObject, PRIVATE_KEY);

  //   web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  // }

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
