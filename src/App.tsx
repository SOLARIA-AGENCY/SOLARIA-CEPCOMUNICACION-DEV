import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdiestramientoCanino from './pages/ContactPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adiestramiento-canino" element={<AdiestramientoCanino />} />
        <Route path="/contacto" element={<AdiestramientoCanino />} />
        <Route path="/inicio" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;