import React from 'react';
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" index element={<MainPage />} />
    <Route path="/login" index element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
