import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import AdiestramientoCanino from './pages/ContactPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/adiestramiento-canino" element={<AdiestramientoCanino />} />
        <Route path="/contacto" element={<AdiestramientoCanino />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
      </Routes>
    </Router>
  );
}

export default App;