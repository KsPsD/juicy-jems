import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Invest from './invest';

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const About = () => (
  <div>
    <h1>About</h1>
  </div>
);



function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path= "invest" element= {<Invest/>}/>

      </Routes>
    </div>
    </div>
  );
}

export default App;
