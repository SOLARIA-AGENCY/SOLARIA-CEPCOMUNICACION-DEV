import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import AdiestramientoCanino from './pages/ContactPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import AdiestramientoCaninoPage from './pages/AdiestramientoCaninoPage';

import CepHeader from './components/organisms/CepHeader';
import CepFooter from './components/organisms/CepFooter';
import CursoInscripcionModal from './components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, Euro, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cursoData } from './config/cursos-otono-2025';

import './index.css';

// --- COMPONENTE DE PÁGINA DE CURSO REUTILIZABLE ENRIQUECIDO ---
const CursoPageComponent: React.FC<{ curso: typeof cursoData[0] }> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temarioExpanded, setTemarioExpanded] = useState(false);
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const { nombre, sede, inicio, imagen, copy, temario, duracion, precio, practicas, profesor, certificacion } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        {/* Hero Section */}
        <div className="relative h-96 bg-black">
          <img src={imagen} alt={`Imagen de ${nombre}`} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Info Bar Enriquecida */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12 flex flex-wrap items-center justify-around gap-6 -mt-32 relative z-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Inicio</p>
                  <p className="font-bold text-gray-900">{inicio}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Sede</p>
                  <p className="font-bold text-gray-900">{sede}</p>
                </div>
              </div>
              {duracion && (
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-cep-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Duración</p>
                    <p className="font-bold text-gray-900">{duracion}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Certificación</p>
                  <p className="font-bold text-gray-900">{certificacion || 'Diploma CEP'}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900">Sobre el curso</h2>
                <p>{copy.textosPrincipales[0]}</p>
                <p>{copy.textosPrincipales[1]}</p>
                
                <h3 className="text-2xl font-bold mt-10">¿Qué aprenderás?</h3>
                <ul className="space-y-2">
                  {copy.titulos.map((titulo, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{titulo}</span>
                    </li>
                  ))}
                </ul>
                
                {copy.textosPrincipales[2] && <p className="mt-6">{copy.textosPrincipales[2]}</p>}

                {/* Temario Detallado */}
                {temario && temario.length > 0 && (
                  <div className="mt-10">
                    <div 
                      className="flex items-center justify-between cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setTemarioExpanded(!temarioExpanded)}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2" />
                        Temario Completo
                      </h3>
                      {temarioExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                    
                    {temarioExpanded && (
                      <div className="mt-4 bg-white p-6 rounded-lg border border-gray-200">
                        <ul className="space-y-3">
                          {temario.map((modulo, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-cep-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-gray-700">{modulo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Información adicional */}
                {practicas && (
                  <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-900 mb-2">Experiencia Práctica</h4>
                    <p className="text-blue-800">{practicas}</p>
                  </div>
                )}

                {profesor && (
                  <div className="mt-6 bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-green-900 mb-2 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profesor/a Especialista
                    </h4>
                    <p className="text-green-800">{profesor}</p>
                  </div>
                )}

              </div>

              {/* CTA Sidebar Enriquecido */}
              <aside className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900">¿Listo para empezar?</h3>
                  <p className="text-gray-600 mt-2 mb-6">Solicita información sin compromiso y reserva tu plaza.</p>

                  {/* Información de Precio */}
                  {precio && (
                    <div className="bg-cep-primary/10 p-4 rounded-lg mb-6">
                      <div className="flex items-center mb-2">
                        <Euro className="w-5 h-5 text-cep-primary mr-2" />
                        <span className="font-bold text-gray-900">Información Económica</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>{precio.cuotas} cuotas</strong> de <strong>{precio.importe}€</strong>
                      </p>
                      <p className="text-sm text-gray-700">
                        + Matrícula: <strong>{precio.matricula}€</strong>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    ¡Inscríbete Ahora!
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">Plazas limitadas. Grupos reducidos.</p>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>
      
      <CursoInscripcionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={{ nombre: curso.nombre, sede: curso.sede, tag: curso.tag }}
      />
      
      <CepFooter />
    </div>
  );
};

// --- PÁGINAS INDIVIDUALES (GENERADAS) ---
const AgenteFunerarioPage = () => <CursoPageComponent curso={cursoData[1]} />;
const AuxiliarClinicoVeterinarioNortePage = () => <CursoPageComponent curso={cursoData[2]} />;
const AuxiliarClinicoVeterinarioSantaCruzPage = () => <CursoPageComponent curso={cursoData[3]} />;
const AuxiliarClinicasEsteticasPage = () => <CursoPageComponent curso={cursoData[4]} />;
const AuxiliarEnfermeriaNortePage = () => <CursoPageComponent curso={cursoData[5]} />;
const AuxiliarEnfermeriaSantaCruzPage = () => <CursoPageComponent curso={cursoData[6]} />;
const AuxiliarFarmaciaDermoPage = () => <CursoPageComponent curso={cursoData[7]} />;
const AuxiliarOdontologiaNortePage = () => <CursoPageComponent curso={cursoData[8]} />;
const AuxiliarOdontologiaSantaCruzPage = () => <CursoPageComponent curso={cursoData[9]} />;
const DieteticaNutricionPage = () => <CursoPageComponent curso={cursoData[10]} />;
const PeluqueriaCaninaNortePage = () => <CursoPageComponent curso={cursoData[11]} />;
const PeluqueriaCaninaSantaCruzPage = () => <CursoPageComponent curso={cursoData[12]} />;
const QuiromasajeNivel2Page = () => <CursoPageComponent curso={cursoData[13]} />;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/adiestramiento-canino" element={<AdiestramientoCaninoPage />} />
        <Route path="/contacto" element={<AdiestramientoCanino />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        
        {/* LANDINGS DIRECTAS - RUTAS CORREGIDAS SIN /curso/ PREFIJO */}
        <Route path="/adiestramiento-canino-norte" element={<AdiestramientoCaninoPage />} />
        <Route path="/agente-funerario-santacruz" element={<AgenteFunerarioPage />} />
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
        <Route path="/quiromasaje-nivel2-norte" element={<QuiromasajeNivel2Page />} />

      </Routes>
    </Router>
  );
}

export default App;