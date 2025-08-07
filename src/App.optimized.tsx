import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import useTracking from './utils/useTracking';
import { cursosMaestro } from './config/cursos-maestro';
import type { CursoMaestro } from './config/cursos-maestro';
import { cursosOcupadosConfig } from './config/cursos-ocupados';
import { cursosDesempleadosConfig } from './config/cursos-desempleados';

// 🚀 LAZY LOADING - Páginas principales
const HomePage = lazy(() => import('./pages/HomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ContactoPage = lazy(() => import('./pages/ContactoPage'));
const QuienesSomosPage = lazy(() => import('./pages/QuienesSomosPage'));

// 📄 Páginas legales (baja prioridad)
const AvisoLegalPage = lazy(() => import('./pages/AvisoLegalPage'));
const PoliticaPrivacidadPage = lazy(() => import('./pages/PoliticaPrivacidadPage'));
const ProteccionDatosPage = lazy(() => import('./pages/ProteccionDatosPage'));
const PoliticaCookiesPage = lazy(() => import('./pages/PoliticaCookiesPage'));

// 📝 Blog y FAQ
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));

// 🎓 Páginas de cursos
const TodosLosCursosPage = lazy(() => import('./pages/TodosLosCursosPage'));
const CiclosPage = lazy(() => import('./pages/CiclosPage'));
const CursosOcupadosPage = lazy(() => import('./pages/CursosOcupadosPage'));
const CursosDesempleadosPage = lazy(() => import('./pages/CursosDesempleadosPage'));

// 📍 Sedes
const SedesPage = lazy(() => import('./pages/SedesPage'));
const SedePage = lazy(() => import('./pages/SedePage'));

// 🙏 Páginas de agradecimiento
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const GraciasSuscripcionPage = lazy(() => import('./pages/GraciasSuscripcionPage'));
const GraciasInscripcionPage = lazy(() => import('./pages/GraciasInscripcionPage'));

// 🔧 Páginas de sistema y admin
const SolariaStatusPage = lazy(() => import('./pages/SolariaStatusPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const GestionCursosPage = lazy(() => import('./pages/admin/GestionCursosPage'));

// 📚 Templates de cursos
const CursoPageComponent = lazy(() => import('./components/templates/CursoPageComponent'));
const CursoOcupadosPageComponent = lazy(() => import('./templates/CursoOcupadosPageComponent'));
const CursoDesempleadosPageComponent = lazy(() => import('./templates/CursoDesempleadosPageComponent'));
const DirectCourseWrapper = lazy(() => import('./components/templates/DirectCourseWrapper'));
const SemanticCourseWrapper = lazy(() => import('./components/templates/SemanticCourseWrapper'));
const DirectEmploymentWrapper = lazy(() => import('./components/templates/DirectEmploymentWrapper'));
const SemanticEmploymentWrapper = lazy(() => import('./components/templates/SemanticEmploymentWrapper'));
const LegacyEmploymentRedirect = lazy(() => import('./components/templates/LegacyEmploymentRedirect'));

// 🔒 Componente de ruta protegida (crítico, no lazy)
import ProtectedRoute from './components/utils/ProtectedRoute';

import './index.css';

// 🌀 Componente de carga personalizado
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

// 🎯 Wrapper Components con lazy loading interno
const DynamicCoursePageWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/cursos" replace />;
  
  const curso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
  
  if (!curso) {
    return <Navigate to="/cursos" replace />;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CursoPageComponent curso={curso} />
    </Suspense>
  );
};

const CursoOcupadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/cursos-ocupados" replace />;
  
  const curso = cursosOcupadosConfig.find(c => c.id === id);
  
  if (!curso) {
    return <Navigate to="/cursos-ocupados" replace />;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CursoOcupadosPageComponent curso={curso} />
    </Suspense>
  );
};

const CursoDesempleadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/cursos-desempleados" replace />;
  
  const curso = cursosDesempleadosConfig.find(c => c.id === id);
  
  if (!curso) {
    return <Navigate to="/cursos-desempleados" replace />;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CursoDesempleadosPageComponent curso={curso} />
    </Suspense>
  );
};

function App() {
  useTracking();

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* 🏠 Páginas principales - Prioridad alta */}
          <Route path="/" element={<HomePage />} />
          <Route path="/inicio" element={<HomePage />} />
          
          {/* 🎓 Rutas de Cursos */}
          <Route path="/cursos" element={<TodosLosCursosPage />} />
          <Route path="/ciclos" element={<CiclosPage />} />
          <Route path="/sedes" element={<SedesPage />} />
          <Route path="/curso/:slug" element={<DynamicCoursePageWrapper />} />
          
          {/* 💼 Rutas de Cursos Subvencionados */}
          <Route path="/cursos-ocupados" element={<CursosOcupadosPage />} />
          <Route path="/cursos-desempleados" element={<CursosDesempleadosPage />} />
          <Route path="/curso-ocupado/:id" element={<CursoOcupadosDetailWrapper />} />
          <Route path="/curso-desempleado/:id" element={<CursoDesempleadosDetailWrapper />} />

          {/* 🎯 RUTAS DUALES EMPLEO */}
          <Route path="/prevencion-riesgos-ambientales-ocupados" element={<DirectEmploymentWrapper />} />
          <Route path="/cursos-empleo/prevencion-riesgos-ambientales-ocupados" element={<SemanticEmploymentWrapper />} />
          
          {/* 🔄 REDIRECCIONES LEGACY */}
          <Route path="/legacy-curso-ocupado/:id" element={<LegacyEmploymentRedirect />} />
          <Route path="/legacy-curso-desempleado/:id" element={<LegacyEmploymentRedirect />} />

          {/* 🏫 RUTAS DE SEDES */}
          <Route path="/sede/:slug" element={<SedePage />} />

          {/* 🎯 RUTAS DOBLES - CAMPAÑAS ACTIVAS */}
          <Route path="/quiromasaje-nivel2-norte" element={<DirectCourseWrapper />} />
          <Route path="/cursos/quiromasaje-nivel2-norte" element={<SemanticCourseWrapper />} />
          
          <Route path="/auxiliar-farmacia-dermo-norte" element={<DirectCourseWrapper />} />
          <Route path="/cursos/auxiliar-farmacia-dermo-norte" element={<SemanticCourseWrapper />} />

          <Route path="/auxiliar-farmacia-parafarmacia-norte" element={<DirectCourseWrapper />} />
          <Route path="/cursos/auxiliar-farmacia-parafarmacia-norte" element={<SemanticCourseWrapper />} />

          <Route path="/auxiliar-farmacia-parafarmacia-santacruz" element={<DirectCourseWrapper />} />
          <Route path="/cursos/auxiliar-farmacia-parafarmacia-santacruz" element={<SemanticCourseWrapper />} />

          <Route path="/adiestramiento-canino-norte" element={<DirectCourseWrapper />} />
          <Route path="/cursos/adiestramiento-canino-norte" element={<SemanticCourseWrapper />} />
          
          <Route path="/agente-funerario-santacruz" element={<DirectCourseWrapper />} />
          <Route path="/cursos/agente-funerario-santacruz" element={<SemanticCourseWrapper />} />

          {/* 📝 Blog y FAQ */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* 📧 Páginas de Contacto */}
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          
          {/* ⚖️ Páginas Legales - Prioridad baja */}
          <Route path="/aviso-legal" element={<AvisoLegalPage />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
          <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
          <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
          
          {/* 🎉 Páginas de agradecimiento */}
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/gracias-suscripcion" element={<GraciasSuscripcionPage />} />
          <Route path="/gracias-inscripcion" element={<GraciasInscripcionPage />} />
          <Route path="/gracias-form-curso" element={<ThankYouPage />} />
          
          {/* 🔧 Sistema */}
          <Route path="/adiestramiento-canino-temp" element={<ContactPage />} />
          <Route path="/solaria-status" element={<SolariaStatusPage />} />

          {/* 🔐 Administración */}
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin/gestion-cursos" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <GestionCursosPage />
                </Suspense>
              </ProtectedRoute>
            } 
          />

          {/* 🔄 Redirecciones */}
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

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;