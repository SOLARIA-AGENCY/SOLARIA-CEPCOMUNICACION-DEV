import React, { useState, useEffect } from 'react';
import CepHeader from '../organisms/CepHeader';
import CepFooter from '../organisms/CepFooter';
import CursoInscripcionModal from '../organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle, Clock, User, Book, ChevronDown, ChevronUp, Briefcase, Users, GitCommit, FileText, GraduationCap, Building } from 'lucide-react';
import { CursoMaestro, Modulo, Profesor, Entidad } from '../../config/cursos-maestro';

// El componente recibe el objeto 'curso' como propiedad.
const CursoPageComponent: React.FC<{ curso: CursoMaestro }> = ({ curso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('descripcion');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // Cada vez que el componente se carga, nos aseguramos de que la vista suba al principio.
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };
  
  const { nombre, sede, inicio, imagen, copy, duracion, practicas, certificacion, descripcionDetallada, modulos, salidasProfesionales, profesores, certificaciones, colaboradores } = curso;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-8 h-8 text-cep-primary" />;
      case 'Users': return <Users className="w-8 h-8 text-cep-primary" />;
      case 'Award': return <Award className="w-8 h-8 text-cep-primary" />;
      default: return null;
    }
  };

  // Renderizado del componente con toda la información del curso.
  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      <main>
        {/* Sección Hero */}
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
            
            {/* Barra de Información */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 -mt-32 relative z-10">
              {descripcionDetallada?.puntosClave.map((punto, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  {renderIcon(punto.icono)}
                  <div>
                    <p className="font-bold text-sm sm:text-base text-gray-900">{punto.texto}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contenido Principal con Pestañas */}
            <div className="bg-white rounded-lg shadow-lg">
              {/* Selector de Pestañas */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto px-6" aria-label="Tabs">
                  <button onClick={() => setActiveTab('descripcion')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'descripcion' ? 'border-cep-primary text-cep-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Descripción
                  </button>
                  {modulos && modulos.length > 0 && (
                    <button onClick={() => setActiveTab('temario')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'temario' ? 'border-cep-primary text-cep-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Temario
                    </button>
                  )}
                  {salidasProfesionales && salidasProfesionales.length > 0 && (
                    <button onClick={() => setActiveTab('salidas')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'salidas' ? 'border-cep-primary text-cep-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Salidas Profesionales
                    </button>
                  )}
                  {profesores && profesores.length > 0 && (
                     <button onClick={() => setActiveTab('profesorado')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profesorado' ? 'border-cep-primary text-cep-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Profesorado
                    </button>
                  )}
                   { (certificaciones || colaboradores) && (
                    <button onClick={() => setActiveTab('certificaciones')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'certificaciones' ? 'border-cep-primary text-cep-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      Certificaciones
                    </button>
                  )}
                </nav>
              </div>

              {/* Contenido de las Pestañas */}
              <div className="p-6">
                {activeTab === 'descripcion' && descripcionDetallada && (
                  <div className="prose prose-lg max-w-none">
                     <p>{descripcionDetallada.queAprendes}</p>
                  </div>
                )}

                {activeTab === 'temario' && modulos && (
                  <div className="space-y-4">
                    {modulos.map((modulo, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button onClick={() => toggleModule(index)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none">
                          <h4 className="font-bold text-gray-800 text-left">{modulo.titulo}</h4>
                          {expandedModule === index ? <ChevronUp className="h-5 w-5 text-cep-primary" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                        </button>
                        {expandedModule === index && (
                          <div className="p-4 border-t border-gray-200">
                            <ul className="list-disc list-inside space-y-2">
                              {modulo.contenido.map((item, i) => <li key={i} className="text-gray-700">{item}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'salidas' && salidasProfesionales && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {salidasProfesionales.map((salida, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{salida}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {activeTab === 'profesorado' && profesores && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {profesores.map((profesor, i) => (
                       <div key={i} className="bg-gray-50 rounded-lg p-6 text-center">
                         <img src={profesor.foto} alt={profesor.nombre} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
                         <h4 className="text-lg font-bold text-cep-primary">{profesor.nombre}</h4>
                         <p className="text-gray-600 mt-2">{profesor.bio}</p>
                       </div>
                     ))}
                   </div>
                )}

                {activeTab === 'certificaciones' && (
                  <div>
                    {certificaciones && certificaciones.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Certificaciones Oficiales</h4>
                        <div className="flex flex-wrap items-center gap-8">
                          {certificaciones.map((cert, i) => <img key={i} src={cert.logo} alt={cert.nombre} className="h-16 object-contain"/>)}
                        </div>
                      </div>
                    )}
                     {colaboradores && colaboradores.length > 0 && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Empresas Colaboradoras</h4>
                        <div className="flex flex-wrap items-center gap-8">
                          {colaboradores.map((col, i) => <img key={i} src={col.logo} alt={col.nombre} className="h-12 object-contain"/>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

             {/* Botón flotante de inscripción */}
             <div className="text-center mt-12">
               <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-cep-primary hover:bg-cep-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  ¡RESERVA TU PLAZA AHORA!
                </button>
             </div>
          </div>
        </div>
      </main>

      <CursoInscripcionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={{ nombre: curso.nombre, sede: curso.sede, tag: `otono-2025-${curso.slug}` }}
      />
      <CepFooter />
    </div>
  );
};

export default CursoPageComponent;
