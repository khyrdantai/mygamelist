import React from 'react';
import './App.css';
import image from './green.jpg';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import MainPage from './pages/MainPage';



function App() {

  

  return (
    <div style={{ backgroundImage:`url(${image})`,backgroundSize: 'contain' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/games" index element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
