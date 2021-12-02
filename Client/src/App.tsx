import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/main"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="//*" element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
