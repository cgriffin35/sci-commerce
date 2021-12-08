import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Checkout from "./components/Checkout"
import Purchased from './components/Purchased'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/purchased" element={<Purchased/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
