import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auction from './components/Auction';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<Auction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
