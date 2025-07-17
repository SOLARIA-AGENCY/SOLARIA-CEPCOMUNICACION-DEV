import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ContactoPage from './pages/ContactoPage';
import QuienesSomosPage from './pages/QuienesSomosPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';

// --- ESTRUCTURA DINÁMICA ---
import TodosLosCursosPage from './pages/TodosLosCursosPage';
import CiclosPage from './pages/CiclosPage';
import CursoPageComponent from './components/templates/CursoPageComponent';
import DirectCourseWrapper from './components/templates/DirectCourseWrapper';
import SemanticCourseWrapper from './components/templates/SemanticCourseWrapper';
import { cursosMaestro } from './config/cursos-maestro';
import type { CursoMaestro } from './config/cursos-maestro';
import SolariaStatusPage from './pages/SolariaStatusPage';
import useTracking from './utils/useTracking';
import ThankYouPage from './pages/ThankYouPage';
import GraciasSuscripcionPage from './pages/GraciasSuscripcionPage';
import GraciasInscripcionPage from './pages/GraciasInscripcionPage';
import SedePage from './pages/SedePage';
import LoginPage from './pages/admin/LoginPage';
import GestionCursosPage from './pages/admin/GestionCursosPage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import SedesPage from './pages/SedesPage';
import CursosOcupadosPage from './pages/CursosOcupadosPage';
import CursosDesempleadosPage from './pages/CursosDesempleadosPage';
import CursoOcupadosPageComponent from './templates/CursoOcupadosPageComponent';
import { cursosOcupadosConfig } from './config/cursos-ocupados';
import { cursosDesempleadosConfig } from './config/cursos-desempleados';
// --- FIN ESTRUCTURA ---

import './index.css';

// Componente "Wrapper" que extrae el slug de la URL y renderiza la página
const DynamicCoursePageWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/cursos" replace />;
  
  const curso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
  
  if (!curso) {
    // Si no se encuentra el curso, redirigir a la página de todos los cursos.
    return <Navigate to="/cursos" replace />;
  }
  
  return <CursoPageComponent curso={curso} />;
};

// Componente wrapper para cursos de ocupados
const CursoOcupadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/cursos-ocupados" replace />;
  
  const curso = cursosOcupadosConfig.find(c => c.id === id);
  
  if (!curso) {
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  return <CursoOcupadosPageComponent curso={curso} />;
};

// Componente wrapper para cursos de desempleados
const CursoDesempleadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/cursos-desempleados" replace />;
  
  const curso = cursosDesempleadosConfig.find(c => c.id === id);
  
  if (!curso) {
    return <Navigate to="/cursos-desempleados" replace />;
  }
  
  // Por ahora usa el mismo template de ocupados hasta que se cree uno específico
  return <CursoOcupadosPageComponent curso={curso} />;
};

function App() {
  useTracking();

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<HomePage />} />
        
        {/* Rutas de Cursos */}
        <Route path="/cursos" element={<TodosLosCursosPage />} />
        <Route path="/ciclos" element={<CiclosPage />} />
        <Route path="/sedes" element={<SedesPage />} />
        <Route path="/curso/:slug" element={<DynamicCoursePageWrapper />} />
        
        {/* Rutas de Cursos Subvencionados */}
        <Route path="/cursos-ocupados" element={<CursosOcupadosPage />} />
        <Route path="/cursos-desempleados" element={<CursosDesempleadosPage />} />
        <Route path="/curso-ocupado/:id" element={<CursoOcupadosDetailWrapper />} />
        <Route path="/curso-desempleado/:id" element={<CursoDesempleadosDetailWrapper />} />

        {/* 🏫 RUTAS DE SEDES */}
        <Route path="/sede/:slug" element={<SedePage />} />

        {/* 🎯 RUTAS DOBLES - CAMPAÑAS ACTIVAS OTOÑO 2025 */}
        
        {/* CAMPAÑA 1: Quiromasaje Nivel 2 Norte */}
        <Route path="/quiromasaje-nivel2-norte" element={<DirectCourseWrapper />} />
        <Route path="/cursos/quiromasaje-nivel2-norte" element={<SemanticCourseWrapper />} />
        
        {/* CAMPAÑA 2: Auxiliar Farmacia Dermocosmética Norte */}
        <Route path="/auxiliar-farmacia-dermo-norte" element={<DirectCourseWrapper />} />
        <Route path="/cursos/auxiliar-farmacia-dermo-norte" element={<SemanticCourseWrapper />} />

        {/* CAMPAÑA 3: Auxiliar Farmacia y Parafarmacia Norte */}
        <Route path="/auxiliar-farmacia-parafarmacia-norte" element={<DirectCourseWrapper />} />
        <Route path="/cursos/auxiliar-farmacia-parafarmacia-norte" element={<SemanticCourseWrapper />} />

        {/* CAMPAÑA 4: Auxiliar Farmacia y Parafarmacia Santa Cruz */}
        <Route path="/auxiliar-farmacia-parafarmacia-santacruz" element={<DirectCourseWrapper />} />
        <Route path="/cursos/auxiliar-farmacia-parafarmacia-santacruz" element={<SemanticCourseWrapper />} />

        {/* 🔄 RUTAS PREPARADAS - PRÓXIMAS CAMPAÑAS */}
        
        {/* Adiestramiento Canino Norte - Preparado para activación */}
        <Route path="/adiestramiento-canino-norte" element={<DirectCourseWrapper />} />
        <Route path="/cursos/adiestramiento-canino-norte" element={<SemanticCourseWrapper />} />
        
        {/* Agente Funerario Santa Cruz - Preparado para activación */}
        <Route path="/agente-funerario-santacruz" element={<DirectCourseWrapper />} />
        <Route path="/cursos/agente-funerario-santacruz" element={<SemanticCourseWrapper />} />

        {/* Paginas de Contenido y SEO */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/faq" element={<FaqPage />} />

        {/* Páginas Legales y de Contacto */}
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        
        {/* Ruta temporal para el curso de adiestramiento (antes en ContactPage) */}
        <Route path="/adiestramiento-canino-temp" element={<ContactPage />} />
        
        {/* Páginas de Sistema */}
        <Route path="/solaria-status" element={<SolariaStatusPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/gracias-suscripcion" element={<GraciasSuscripcionPage />} />
        <Route path="/gracias-inscripcion" element={<GraciasInscripcionPage />} />
        <Route path="/gracias-form-curso" element={<ThankYouPage />} />

        {/* Redirecciones de rutas antiguas a las nuevas */}
        <Route path="/new/cursos" element={<Navigate to="/cursos" replace />} />
        <Route path="/new/cursos/:slug" element={<Navigate to="/cursos" replace />} />
        <Route path="/adiestramiento-canino" element={<Navigate to="/cursos" replace />} />
        <Route path="/agente-funerario" element={<Navigate to="/cursos" replace />} />
        <Route path="/auxiliar-enfermeria" element={<Navigate to="/cursos" replace />} />
        <Route path="/auxiliar-clinicas-esteticas" element={<Navigate to="/cursos" replace />} />
        <Route path="/auxiliar-farmacia-dermo" element={<Navigate to="/cursos" replace />} />
        <Route path="/auxiliar-clinico-veterinario" element={<Navigate to="/cursos" replace />} />
        <Route path="/cfgm-farmacia-parafarmacia" element={<Navigate to="/cursos" replace />} />
        <Route path="/cfgs-higiene-bucodental" element={<Navigate to="/cursos" replace />} />
        
        {/* Rutas de Administración */}
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin/gestion-cursos" 
          element={
            <ProtectedRoute>
              <GestionCursosPage />
            </ProtectedRoute>
          } 
        />

        {/* Wildcard para cualquier otra ruta no definida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;