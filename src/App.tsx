import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import ContactPage from './pages/ContactPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';

// Componentes de página estáticos (se mantienen para rutas genéricas/legacy)
import AdiestramientoCaninoPage from './pages/AdiestramientoCaninoPage';
import AgenteFunerarioPage from './pages/AgenteFunerarioPage';
import AuxiliarEnfermeriaPage from './pages/AuxiliarEnfermeriaPage';
import AuxiliarEsteticasPage from './pages/AuxiliarEsteticasPage';
import AuxiliarFarmaciaPage from './pages/AuxiliarFarmaciaPage';
import AuxiliarVeterinarioPage from './pages/AuxiliarVeterinarioPage';
import CFGMFarmaciaParafarmaciaPage from './pages/CFGMFarmaciaParafarmaciaPage';
import CFGSHigieneBucodentalPage from './pages/CFGSHigieneBucodentalPage';

// --- NUEVA ESTRUCTURA DINÁMICA ---
import NuevosCursosIndexPage from './pages/NuevosCursosIndexPage';
import PaginaCursoDinamica from './pages/PaginaCursoDinamica';
import CursoPageComponent from './components/templates/CursoPageComponent';
import { cursosMaestro } from './config/cursos-maestro';
// --- FIN NUEVA ESTRUCTURA ---

import './index.css';

// Componente "Wrapper" que busca el curso por slug y renderiza la página
// o redirige si no lo encuentra.
const DynamicCoursePageWrapper = ({ slug }: { slug: string }) => {
  const curso = cursosMaestro.find(c => c.slug === slug);
  if (!curso) {
    // Si no se encuentra el curso, redirigir a la página principal de nuevos cursos.
    return <Navigate to="/new/cursos" replace />;
  }
  return <CursoPageComponent curso={curso} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
        
        {/* Rutas genéricas que apuntan a páginas estáticas legacy */}
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
        
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        
        {/* LANDINGS DIRECTAS - Ahora todas usan la estructura dinámica */}
        <Route path="/adiestramiento-canino-norte" element={<DynamicCoursePageWrapper slug="adiestramiento-canino-norte" />} />
        <Route path="/agente-funerario-santacruz" element={<DynamicCoursePageWrapper slug="agente-funerario-santacruz" />} />
        <Route path="/auxiliar-clinico-veterinario-norte" element={<DynamicCoursePageWrapper slug="auxiliar-clinico-veterinario-norte" />} />
        <Route path="/auxiliar-clinico-veterinario-santacruz" element={<DynamicCoursePageWrapper slug="auxiliar-clinico-veterinario-santacruz" />} />
        <Route path="/auxiliar-clinicas-esteticas-santacruz" element={<DynamicCoursePageWrapper slug="auxiliar-clinicas-esteticas-santacruz" />} />
        <Route path="/auxiliar-enfermeria-norte" element={<DynamicCoursePageWrapper slug="auxiliar-enfermeria-norte" />} />
        <Route path="/auxiliar-enfermeria-santacruz" element={<DynamicCoursePageWrapper slug="auxiliar-enfermeria-santacruz" />} />
        <Route path="/auxiliar-farmacia-dermo-norte" element={<DynamicCoursePageWrapper slug="auxiliar-farmacia-dermo-norte" />} />
        <Route path="/auxiliar-odontologia-norte" element={<DynamicCoursePageWrapper slug="auxiliar-odontologia-norte" />} />
        <Route path="/auxiliar-odontologia-santacruz" element={<DynamicCoursePageWrapper slug="auxiliar-odontologia-santacruz" />} />
        <Route path="/dietetica-nutricion-norte" element={<DynamicCoursePageWrapper slug="dietetica-nutricion-norte" />} />
        
        {/* Rutas deprecadas de peluquería se pueden omitir o redirigir si se desea */}
        {/* <Route path="/peluqueria-canina-felina-norte" element={<Navigate to="/new/cursos" />} /> */}
        {/* <Route path="/peluqueria-canina-felina-santacruz" element={<Navigate to="/new/cursos" />} /> */}
        
        <Route path="/quiromasaje-nivel1-norte" element={<DynamicCoursePageWrapper slug="quiromasaje-nivel1-norte" />} />
        <Route path="/quiromasaje-nivel2-santacruz" element={<DynamicCoursePageWrapper slug="quiromasaje-nivel2-santacruz" />} />
        <Route path="/quiromasaje-nivel2-norte" element={<DynamicCoursePageWrapper slug="quiromasaje-nivel2-norte" />} />
        <Route path="/cfgs-higiene-bucodental-santacruz" element={<DynamicCoursePageWrapper slug="cfgs-higiene-bucodental-santacruz" />} />
        <Route path="/cfgm-farmacia-parafarmacia-santacruz" element={<DynamicCoursePageWrapper slug="cfgm-farmacia-parafarmacia-santacruz" />} />
        <Route path="/cfgm-farmacia-parafarmacia-norte" element={<DynamicCoursePageWrapper slug="cfgm-farmacia-parafarmacia-norte" />} />
        <Route path="/cfgs-higiene-bucodental-norte" element={<DynamicCoursePageWrapper slug="cfgs-higiene-bucodental-norte" />} />

      </Routes>
    </Router>
  );
}

export default App;