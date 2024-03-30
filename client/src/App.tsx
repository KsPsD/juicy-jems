import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Invest from "./invest";
import Shopping from "./Shopping";
import WalletConnect, { WalletConnectProvider } from './walletConnect';

const Home = () => (
  <div>
    <WalletConnect />
    <h1>Home</h1>
  </div>
);



function App() {
  return (
    <WalletConnectProvider>
   <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
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
