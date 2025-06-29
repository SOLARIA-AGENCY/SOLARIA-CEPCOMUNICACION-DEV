import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import ContactPage from './pages/ContactPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';
import AdiestramientoCaninoPage from './pages/AdiestramientoCaninoPage';
import AgenteFunerarioPage from './pages/AgenteFunerarioPage';
import AuxiliarEnfermeriaPage from './pages/AuxiliarEnfermeriaPage';
import AuxiliarEsteticasPage from './pages/AuxiliarEsteticasPage';
import AuxiliarFarmaciaPage from './pages/AuxiliarFarmaciaPage';
import AuxiliarVeterinarioPage from './pages/AuxiliarVeterinarioPage';
import CFGMFarmaciaParafarmaciaPage from './pages/CFGMFarmaciaParafarmaciaPage';
import CFGSHigieneBucodentalPage from './pages/CFGSHigieneBucodentalPage';

// --- NUEVA ESTRUCTURA DINÁMICA (EN PARALELO) ---
import NuevosCursosIndexPage from './pages/NuevosCursosIndexPage';
import PaginaCursoDinamica from './pages/PaginaCursoDinamica';
// --- FIN NUEVA ESTRUCTURA ---

import CepHeader from './components/organisms/CepHeader';
import CepFooter from './components/organisms/CepFooter';
import CursoInscripcionModal from './components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, User, Book, ChevronDown, ChevronUp } from 'lucide-react';
import { cursoData } from './config/cursos-otono-2025';
import CursoPageComponent from './components/templates/CursoPageComponent';

import './index.css';

// --- COMPONENTES DE PÁGINA DE CURSO REUTILIZABLES ---
const AdiestramientoCaninoNortePage = () => <CursoPageComponent curso={cursoData[0]} />;
const AgenteFunerarioSantaCruzPage = () => <CursoPageComponent curso={cursoData[1]} />;
const AuxiliarClinicoVeterinarioNortePage = () => <AuxiliarVeterinarioPage />;
const AuxiliarClinicoVeterinarioSantaCruzPage = () => <CursoPageComponent curso={cursoData[3]} />;
const AuxiliarClinicasEsteticasPage = () => <AuxiliarEsteticasPage />;
const AuxiliarEnfermeriaNortePage = () => <AuxiliarEnfermeriaPage />;
const AuxiliarEnfermeriaSantaCruzPage = () => <CursoPageComponent curso={cursoData[6]} />;
const AuxiliarFarmaciaDermoPage = () => <AuxiliarFarmaciaPage />;
const AuxiliarOdontologiaNortePage = () => <CursoPageComponent curso={cursoData[8]} />;
const AuxiliarOdontologiaSantaCruzPage = () => <CursoPageComponent curso={cursoData[9]} />;
const DieteticaNutricionPage = () => <CursoPageComponent curso={cursoData[10]} />;
const PeluqueriaCaninaNortePage = () => <CursoPageComponent curso={cursoData[11]} />;
const PeluqueriaCaninaSantaCruzPage = () => <CursoPageComponent curso={cursoData[12]} />;
const QuiromasajeNivel1Page = () => <CursoPageComponent curso={cursoData[13]} />;
const QuiromasajeNivel2Page = () => <CursoPageComponent curso={cursoData[14]} />;
const QuiromasajeNivel2NortePage = () => <CursoPageComponent curso={cursoData[15]} />;
const CFGSHigieneBucodentalOficialPage = () => <CursoPageComponent curso={cursoData[16]} />;
const CFGMFarmaciaParafarmaciaOficialPage = () => <CursoPageComponent curso={cursoData[17]} />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/adiestramiento-canino" element={<AdiestramientoCaninoPage />} />
        <Route path="/agente-funerario" element={<AgenteFunerarioPage />} />
        <Route path="/auxiliar-enfermeria" element={<AuxiliarEnfermeriaPage />} />
        <Route path="/auxiliar-clinicas-esteticas" element={<AuxiliarEsteticasPage />} />
        <Route path="/auxiliar-farmacia-dermo" element={<AuxiliarFarmaciaPage />} />
        <Route path="/auxiliar-clinico-veterinario" element={<AuxiliarVeterinarioPage />} />
        <Route path="/cfgm-farmacia-parafarmacia" element={<CFGMFarmaciaParafarmaciaPage />} />
        <Route path="/cfgs-higiene-bucodental" element={<CFGSHigieneBucodentalPage />} />

        {/* --- NUEVAS RUTAS EN /new/ --- */}
        <Route path="/new/cursos" element={<NuevosCursosIndexPage />} />
        <Route path="/new/cursos/:slug" element={<PaginaCursoDinamica />} />
        {/* --- FIN NUEVAS RUTAS --- */}
        
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        
        {/* LANDINGS DIRECTAS - TODAS LAS RUTAS DE LOS 14 CURSOS */}
        <Route path="/adiestramiento-canino-norte" element={<AdiestramientoCaninoNortePage />} />
        <Route path="/agente-funerario-santacruz" element={<AgenteFunerarioSantaCruzPage />} />
        <Route path="/auxiliar-clinico-veterinario-norte" element={<AuxiliarClinicoVeterinarioNortePage />} />
        <Route path="/auxiliar-clinico-veterinario-santacruz" element={<AuxiliarClinicoVeterinarioSantaCruzPage />} />
        <Route path="/auxiliar-clinicas-esteticas-santacruz" element={<AuxiliarClinicasEsteticasPage />} />
        <Route path="/auxiliar-enfermeria-norte" element={<AuxiliarEnfermeriaNortePage />} />
        <Route path="/auxiliar-enfermeria-santacruz" element={<AuxiliarEnfermeriaSantaCruzPage />} />
        <Route path="/auxiliar-farmacia-dermo-norte" element={<AuxiliarFarmaciaDermoPage />} />
        <Route path="/auxiliar-odontologia-norte" element={<AuxiliarOdontologiaNortePage />} />
        <Route path="/auxiliar-odontologia-santacruz" element={<AuxiliarOdontologiaSantaCruzPage />} />
        <Route path="/dietetica-nutricion-norte" element={<DieteticaNutricionPage />} />
        <Route path="/peluqueria-canina-felina-norte" element={<PeluqueriaCaninaNortePage />} />
        <Route path="/peluqueria-canina-felina-santacruz" element={<PeluqueriaCaninaSantaCruzPage />} />
        <Route path="/quiromasaje-nivel1-norte" element={<QuiromasajeNivel1Page />} />
        <Route path="/quiromasaje-nivel2-santacruz" element={<QuiromasajeNivel2Page />} />
        <Route path="/quiromasaje-nivel2-norte" element={<QuiromasajeNivel2NortePage />} />
        <Route path="/cfgs-higiene-bucodental-santacruz" element={<CFGSHigieneBucodentalOficialPage />} />
        <Route path="/cfgm-farmacia-parafarmacia-santacruz" element={<CFGMFarmaciaParafarmaciaOficialPage />} />

        {/* --- NUEVA ESTRUCTURA DINÁMICA (EN PARALELO) --- */}
        <Route path="/cursos-v2" element={<NuevosCursosIndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;