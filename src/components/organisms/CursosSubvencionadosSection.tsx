import React from 'react';
import { Link } from 'react-router-dom';
import { ocupadosDefaultConfig } from '../../config/cursos-ocupados';
import { desempleadosDefaultConfig } from '../../config/cursos-desempleados';

const CursosSubvencionadosSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Cursos Subvencionados 100% Gratuitos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Financiados por el SEPE y SCE. Mejora tu perfil profesional sin coste alguno.
          </p>
        </div>

        <div className="my-12">
          <img 
            src="/images/formacion-gratuita.jpg" 
            alt="Formación Gratuita para trabajadores y desempleados" 
            className="rounded-lg shadow-lg w-full object-cover h-auto max-h-60"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Cursos para Ocupados */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{ocupadosDefaultConfig.icons.main}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Para Trabajadores
                    </h3>
                    <p className="text-green-100">
                      {ocupadosDefaultConfig.messaging.subheadline}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {ocupadosDefaultConfig.icons.features.map((icon, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="mr-2">{icon}</span>
                      <span>{['Profesional', 'Crecimiento', 'Certificado', 'Flexible'][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Características principales:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Horarios compatibles con trabajo</li>
                  <li>• Financiación 100% SEPE</li>
                  <li>• Certificación oficial reconocida</li>
                  <li>• Aplicación práctica inmediata</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Próximo curso destacado:</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-800 mb-1">Prevención de Riesgos Ambientales</h5>
                  <p className="text-sm text-green-700 mb-2">📅 Inicio: 11 de Agosto 2025</p>
                  <p className="text-sm text-green-700 mb-2">📍 Sede: CEP Santa Cruz</p>
                  <p className="text-sm text-green-700">⏰ Horario: Tardes (compatible con trabajo)</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/cursos-ocupados"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
                >
                  Ver Cursos Ocupados
                </Link>
                <a
                  href={`mailto:${ocupadosDefaultConfig.contact.email}`}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-center"
                >
                  Consultar
                </a>
              </div>
            </div>
          </div>

          {/* Cursos para Desempleados */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{desempleadosDefaultConfig.icons.main}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Para Desempleados
                    </h3>
                    <p className="text-blue-100">
                      {desempleadosDefaultConfig.messaging.subheadline}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {desempleadosDefaultConfig.icons.features.map((icon, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="mr-2">{icon}</span>
                      <span>{['Fortaleza', 'Formación', 'Prácticas', 'Crecimiento'][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Características principales:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Certificados de profesionalidad</li>
                  <li>• Prácticas en empresas incluidas</li>
                  <li>• Orientación laboral personalizada</li>
                  <li>• Financiación 100% SEPE/SCE</li>
                </ul>
              </div>


              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/cursos-desempleados"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                >
                  Ver Cursos Desempleados
                </Link>
                <a
                  href={`mailto:${desempleadosDefaultConfig.contact.email}`}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-center"
                >
                  Pre-inscripción
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Información Importante sobre Cursos Subvencionados
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-semibold text-gray-800 mb-1">100% Gratuitos</h4>
              <p className="text-sm text-gray-600">
                Financiados por el SEPE y SCE. No hay coste para el alumno.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📜</div>
              <h4 className="font-semibold text-gray-800 mb-1">Certificación Oficial</h4>
              <p className="text-sm text-gray-600">
                Reconocida en todo el territorio nacional y europeo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800 mb-1">Orientados al Empleo</h4>
              <p className="text-sm text-gray-600">
                Diseñados para mejorar tu empleabilidad y competitividad.
              </p>
            </div>
          </div>
        </div>

        {/* Logos oficiales */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <img 
              src="/images/certificaciones/sepe.png" 
              alt="SEPE" 
              className="h-12 object-contain"
            />
            <img 
              src="/images/certificaciones/gobierno-canarias.png" 
              alt="Gobierno de Canarias" 
              className="h-12 object-contain"
            />
            <img 
              src="/images/certificaciones/ministerio-educacion.png" 
              alt="Ministerio de Educación" 
              className="h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CursosSubvencionadosSection;