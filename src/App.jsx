import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
