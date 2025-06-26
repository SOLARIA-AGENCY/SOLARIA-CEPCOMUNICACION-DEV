import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import ContactPage from './pages/ContactPage';
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage';
import PoliticaCookiesPage from './pages/PoliticaCookiesPage';
import AvisoLegalPage from './pages/AvisoLegalPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import AdiestramientoCaninoPage from './pages/AdiestramientoCaninoPage';
import AuxiliarEnfermeriaPage from './pages/AuxiliarEnfermeriaPage';
import AuxiliarFarmaciaPage from './pages/AuxiliarFarmaciaPage';
import AuxiliarVeterinarioPage from './pages/AuxiliarVeterinarioPage';
import AuxiliarEsteticasPage from './pages/AuxiliarEsteticasPage';
import CFGSHigieneBucodentalPage from './pages/CFGSHigieneBucodentalPage';
import CFGMFarmaciaParafarmaciaPage from './pages/CFGMFarmaciaParafarmaciaPage';
import AgenteFunerarioPage from './pages/AgenteFunerarioPage';

import CepHeader from './components/organisms/CepHeader';
import CepFooter from './components/organisms/CepFooter';
import CursoInscripcionModal from './components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, Euro, User, BookOpen, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { cursoData } from './config/cursos-otono-2025';

import './index.css';

// --- COMPONENTE DE PÁGINA DE CURSO REUTILIZABLE ENRIQUECIDO ---
const CursoPageComponent: React.FC<{ curso: typeof cursoData[0] }> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temarioExpanded, setTemarioExpanded] = useState(false);
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const { nombre, sede, inicio, imagen, copy, temario, duracion, precio, practicas, profesor, certificacion, profesorDetalle, modalidadInfo } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        {/* Hero Section - Mobile First Responsive */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-black">
          <img 
            src={imagen} 
            alt={`Imagen de ${nombre}`} 
            className="w-full h-full object-cover object-center opacity-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Info Bar Enriquecida - Mobile First */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-12 grid grid-cols-2 md:flex md:flex-wrap items-center justify-around gap-4 sm:gap-6 -mt-32 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Inicio</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{inicio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Sede</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{sede}</p>
                </div>
              </div>
              {duracion && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Duración</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">{duracion}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-3">
                <Award className="w-6 sm:w-8 h-6 sm:h-8 text-cep-primary" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Certificación</p>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{certificacion || 'Diploma CEP'}</p>
                </div>
              </div>
            </div>

            {/* Content Section - Mobile First */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sobre el curso</h2>
              <p className="text-sm sm:text-base">{copy.textosPrincipales[0]}</p>
              <p className="text-sm sm:text-base">{copy.textosPrincipales[1]}</p>
              
              <h3 className="text-xl sm:text-2xl font-bold mt-8 sm:mt-10">¿Qué aprenderás?</h3>
              <ul className="space-y-2">
                {copy.titulos.map((titulo, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{titulo}</span>
                  </li>
                ))}
              </ul>
              
              {copy.textosPrincipales[2] && <p className="mt-4 sm:mt-6 text-sm sm:text-base">{copy.textosPrincipales[2]}</p>}

              {/* Temario Detallado - Mobile First */}
              {temario && temario.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <div 
                    className="flex items-center justify-between cursor-pointer bg-gray-100 p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setTemarioExpanded(!temarioExpanded)}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                      <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                      Temario Completo
                    </h3>
                    {temarioExpanded ? <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6" /> : <ChevronDown className="w-5 sm:w-6 h-5 sm:h-6" />}
                  </div>
                  
                  {temarioExpanded && (
                    <div className="mt-4 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                      <ul className="space-y-3">
                        {temario.map((modulo, i) => (
                          <li key={i} className="flex items-start">
                            <span className="bg-cep-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 text-sm sm:text-base">{modulo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Información adicional - Mobile First */}
              {practicas && (
                <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-2">Experiencia Práctica</h4>
                  <p className="text-blue-800 text-sm sm:text-base">{practicas}</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Profesor/a Especialista */}
        {profesorDetalle && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-cep-primary mb-8">
                  {profesorDetalle.nombre.includes('Sara') || profesorDetalle.nombre.includes('Livia') || profesorDetalle.nombre.includes('Nuria') || profesorDetalle.nombre.includes('Esther') || profesorDetalle.nombre.includes('Cecilia') ? 'Tu Profesora Especialista' : 'Tu Profesor Especialista'}
                </h2>
                <div className="bg-gray-50 p-8 rounded-lg">
                  <img 
                    src={profesorDetalle.foto} 
                    alt={profesorDetalle.nombre} 
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-cep-primary mb-2">{profesorDetalle.nombre}</h3>
                  <p className="text-lg text-gray-600 mb-4">{profesorDetalle.especialidad}</p>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    {profesorDetalle.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detalles del curso */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-cep-primary mb-12 text-center">Detalles del Curso</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Modalidad y horarios</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <User className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.tipo || 'Clases presenciales en grupos reducidos'}</span>
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.horario || '2 días por semana - 4 horas por sesión'}</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.sesiones || duracion}</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="w-5 h-5 text-cep-primary mr-3" />
                      <span>{modalidadInfo?.certificacion || certificacion || 'Diploma CEP Formación'}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-cep-primary mb-4">Precio e inscripción</h3>
                  <div className="text-center">
                    {precio && (
                      <>
                        <div className="text-3xl font-bold text-cep-primary mb-2">
                          {precio.cuotas * precio.importe + precio.matricula}€
                        </div>
                        <p className="text-gray-600 mb-4">{precio.cuotas} cuotas de {precio.importe}€ + {precio.matricula}€ matrícula</p>
                      </>
                    )}
                    <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Requisitos:</strong> Acceso con 2º de la ESO o EGB
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Modalidad presencial con prácticas reales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-cep-primary">¡No te quedes fuera!</h2>
            
            {/* Mensaje de urgencia previo */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                🎯 ¡Reserva ahora tu plaza y paga después!
              </p>
              <p className="text-gray-700">
                No pierdas tu lugar: <strong className="text-cep-primary">quedan pocas plazas disponibles</strong>
              </p>
            </div>
            
            <p className="text-xl mb-8 text-gray-700">Reserva ahora mismo tu plaza y asegura tu futuro profesional</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-colors shadow-lg transform hover:scale-105"
            >
              RESERVAR MI PLAZA AHORA
            </button>
            <p className="text-sm mt-4 text-gray-600">
              ¡Los cursos empiezan en {inicio.toLowerCase()}! Contacto en menos de 30 minutos
            </p>
          </div>
        </section>

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
// AgenteFunerarioPage ahora se importa como componente específico
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
// Ahora importamos las páginas específicas desde archivos separados


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/adiestramiento-canino" element={<AdiestramientoCaninoPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        
        {/* LANDINGS DIRECTAS - TODAS LAS RUTAS DE LOS 14 CURSOS */}
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
        <Route path="/quiromasaje-nivel1-norte" element={<QuiromasajeNivel1Page />} />
        <Route path="/quiromasaje-nivel2-santacruz" element={<QuiromasajeNivel2Page />} />
        <Route path="/cfgs-higiene-bucodental-santacruz" element={<CFGSHigieneBucodentalPage />} />
        <Route path="/cfgm-farmacia-parafarmacia-santacruz" element={<CFGMFarmaciaParafarmaciaPage />} />

      </Routes>
    </Router>
  );
}

export default App;