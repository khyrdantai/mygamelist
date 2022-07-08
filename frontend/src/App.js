import React from 'react';
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import MainPage from './pages/MainPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/cards" index element={<CardPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
