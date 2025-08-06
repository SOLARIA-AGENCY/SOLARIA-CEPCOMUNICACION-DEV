import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import useTracking from './utils/useTracking';
import type { CursoMaestro } from './config/cursos-maestro';

// 🚀 LAZY LOADING - CRITICAL BUNDLE OPTIMIZATION
// Core pages (most used)
const HomePage = lazy(() => import('./pages/HomePage'));
const TodosLosCursosPage = lazy(() => import('./pages/TodosLosCursosPage'));
const ContactoPage = lazy(() => import('./pages/ContactoPage'));

// Course system (heavy components)
const CursoPageComponent = lazy(() => import('./components/templates/CursoPageComponent'));
const DirectCourseWrapper = lazy(() => import('./components/templates/DirectCourseWrapper'));
const SemanticCourseWrapper = lazy(() => import('./components/templates/SemanticCourseWrapper'));

// Employment courses (heavy configs)
const CursosOcupadosPage = lazy(() => import('./pages/CursosOcupadosPage'));
const CursosDesempleadosPage = lazy(() => import('./pages/CursosDesempleadosPage'));
const CursoOcupadosPageComponent = lazy(() => import('./templates/CursoOcupadosPageComponent'));
const DirectEmploymentWrapper = lazy(() => import('./components/templates/DirectEmploymentWrapper'));
const SemanticEmploymentWrapper = lazy(() => import('./components/templates/SemanticEmploymentWrapper'));
const LegacyEmploymentRedirect = lazy(() => import('./components/templates/LegacyEmploymentRedirect'));

// Secondary pages
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CiclosPage = lazy(() => import('./pages/CiclosPage'));
const QuienesSomosPage = lazy(() => import('./pages/QuienesSomosPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const SedesPage = lazy(() => import('./pages/SedesPage'));
const SedePage = lazy(() => import('./pages/SedePage'));

// Legal pages (rarely accessed)
const AvisoLegalPage = lazy(() => import('./pages/AvisoLegalPage'));
const PoliticaPrivacidadPage = lazy(() => import('./pages/PoliticaPrivacidadPage'));
const ProteccionDatosPage = lazy(() => import('./pages/ProteccionDatosPage'));
const PoliticaCookiesPage = lazy(() => import('./pages/PoliticaCookiesPage'));

// System pages
const SolariaStatusPage = lazy(() => import('./pages/SolariaStatusPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const GraciasSuscripcionPage = lazy(() => import('./pages/GraciasSuscripcionPage'));
const GraciasInscripcionPage = lazy(() => import('./pages/GraciasInscripcionPage'));

// Admin pages (heavy and rarely used)
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const GestionCursosPage = lazy(() => import('./pages/admin/GestionCursosPage'));
const ProtectedRoute = lazy(() => import('./components/utils/ProtectedRoute'));

// Lazy load heavy configs only when needed
const loadCursosMaestro = () => import('./config/cursos-maestro');
const loadCursosOcupados = () => import('./config/cursos-ocupados');
const loadCursosDesempleados = () => import('./config/cursos-desempleados');

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cep-primary"></div>
  </div>
);

import './index.css';

// Dynamic wrapper with lazy config loading
const DynamicCoursePageWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const [curso, setCurso] = React.useState<CursoMaestro | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (!slug) return;
    
    loadCursosMaestro().then(({ cursosMaestro }) => {
      const foundCurso = cursosMaestro.find((c: CursoMaestro) => c.slug === slug);
      setCurso(foundCurso || null);
      setLoading(false);
    });
  }, [slug]);
  
  if (!slug) return <Navigate to="/cursos" replace />;
  if (loading) return <LoadingSpinner />;
  if (!curso) return <Navigate to="/cursos" replace />;
  
  return <CursoPageComponent curso={curso} />;
};

// Lazy wrapper for ocupados courses
const CursoOcupadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [curso, setCurso] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (!id) return;
    
    loadCursosOcupados().then(({ cursosOcupadosConfig }) => {
      const foundCurso = cursosOcupadosConfig.find((c: { id: string }) => c.id === id);
      setCurso(foundCurso || null);
      setLoading(false);
    });
  }, [id]);
  
  if (!id) return <Navigate to="/cursos-ocupados" replace />;
  if (loading) return <LoadingSpinner />;
  if (!curso) return <Navigate to="/cursos-ocupados" replace />;
  
  return <CursoOcupadosPageComponent curso={curso} />;
};

// Lazy wrapper for desempleados courses
const CursoDesempleadosDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [curso, setCurso] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (!id) return;
    
    loadCursosDesempleados().then(({ cursosDesempleadosConfig }) => {
      const foundCurso = cursosDesempleadosConfig.find((c: { id: string }) => c.id === id);
      setCurso(foundCurso || null);
      setLoading(false);
    });
  }, [id]);
  
  if (!id) return <Navigate to="/cursos-desempleados" replace />;
  if (loading) return <LoadingSpinner />;
  if (!curso) return <Navigate to="/cursos-desempleados" replace />;
  
  return <CursoOcupadosPageComponent curso={curso} />;
};

function App() {
  useTracking();

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
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

        {/* 🎯 RUTAS DUALES EMPLEO - SISTEMA SEO AVANZADO */}
        
        {/* CURSOS OCUPADOS - Rutas Duales */}
        <Route path="/prevencion-riesgos-ambientales-ocupados" element={<DirectEmploymentWrapper />} />
        <Route path="/cursos-empleo/prevencion-riesgos-ambientales-ocupados" element={<SemanticEmploymentWrapper />} />
        
        {/* CURSOS DESEMPLEADOS - Rutas Duales (Preparado para futuros cursos) */}
        {/* <Route path="/curso-desempleado-slug" element={<DirectEmploymentWrapper />} /> */}
        {/* <Route path="/cursos-empleo/curso-desempleado-slug" element={<SemanticEmploymentWrapper />} /> */}
        
        {/* 🔄 REDIRECCIONES LEGACY - Preservación SEO */}
        <Route path="/legacy-curso-ocupado/:id" element={<LegacyEmploymentRedirect />} />
        <Route path="/legacy-curso-desempleado/:id" element={<LegacyEmploymentRedirect />} />

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
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute>
                <GestionCursosPage />
              </ProtectedRoute>
            </Suspense>
          } 
        />

        {/* Wildcard para cualquier otra ruta no definida */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;