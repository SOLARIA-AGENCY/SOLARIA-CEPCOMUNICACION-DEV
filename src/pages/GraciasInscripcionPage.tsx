import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Phone, Calendar, Home } from 'lucide-react';

interface GraciasState {
  curso?: string;
  nombre?: string;
  sede?: string;
  provider?: string;
}

export default function GraciasInscripcionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GraciasState;

  // Si no hay state, redirigir a home después de 3 segundos
  useEffect(() => {
    if (!state?.curso) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  const curso = state?.curso || 'tu curso seleccionado';
  const nombre = state?.nombre || '';
  const sede = state?.sede || '';
  const provider = state?.provider || 'sistema';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="/images/logos/CIRCULO CEP FORMACION LOGO.png" 
              alt="CEP Formación" 
              className="h-12"
            />
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-cep-primary transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Inicio
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Icono de éxito animado */}
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-green-600 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>

          {/* Mensaje principal */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¡Plaza Reservada!
          </h1>
          
          {state?.curso && (
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              Tu inscripción para <span className="font-semibold text-cep-primary">{curso}</span> ha sido procesada exitosamente
              {nombre && <span>, {nombre}</span>}.
            </p>
          )}
        </div>

        {/* Cards de información */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card de confirmación */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Confirmación</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Estado:</strong> <span className="text-green-600 font-semibold">Plaza Reservada</span></p>
              {curso && <p><strong>Curso:</strong> {curso}</p>}
              {sede && <p><strong>Sede:</strong> {sede}</p>}
              <p><strong>Prioridad:</strong> <span className="text-orange-600 font-semibold">ALTA</span></p>
              <p><strong>Sistema:</strong> {provider === 'resend' ? 'Resend API' : 'FormSubmit'}</p>
            </div>
          </div>

          {/* Card de próximos pasos */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Próximos Pasos</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong>Llamada de confirmación</strong> en las próximas horas para confirmar detalles</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong>Email con información completa</strong> del curso y proceso de inscripción</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong>Formalización de matrícula</strong> con opciones de pago flexibles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="bg-gradient-to-r from-cep-primary to-blue-700 rounded-xl text-white p-8 mb-12">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-4">¿Tienes alguna pregunta?</h2>
            <p className="text-blue-100 mb-6">
              Nuestro equipo está disponible para resolver cualquier duda sobre el proceso de inscripción
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="font-semibold mb-1">Teléfono</p>
                <p className="text-blue-100">922 123 456</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="font-semibold mb-1">Email</p>
                <p className="text-blue-100">info@cepformacion.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-8 py-4 bg-cep-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al Inicio
          </button>
          
          <p className="text-gray-500 text-sm">
            Gracias por confiar en CEP Formación para tu desarrollo profesional
          </p>
        </div>

        {/* Debug info (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 bg-gray-100 rounded-lg p-4 text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Curso: {curso}</p>
            <p>Nombre: {nombre}</p>
            <p>Sede: {sede}</p>
            <p>Provider: {provider}</p>
            <p>Timestamp: {new Date().toLocaleString()}</p>
          </div>
        )}
      </main>

      {/* Footer simple */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2025 CEP Formación. Todos los derechos reservados.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Sistema de inscripción desarrollado por SOLARIA.AGENCY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 