import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./componants/Home";
import Menu from "./componants/Menu";
import Item from "./componants/Item";
import Navbar from "./componants/Navbar";
import Cart from "./componants/Cart";
import LoginSignUp from "./componants/login/LoginSignUp";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LoginSignUp />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/menu" element={<Menu />}></Route>
        <Route path="menu/item/:id" element={<Item />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
