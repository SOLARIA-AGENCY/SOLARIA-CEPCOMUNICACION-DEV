import React, { useState, useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { CheckCircle, XCircle, AlertTriangle, Power, PowerOff, Mail, Key } from 'lucide-react';

interface TrackingConfig {
  ga4?: string;
  pixel?: string;
  gtm?: string;
}

interface AppConfig {
  tracking: TrackingConfig;
}

const StatusIndicator: React.FC<{ active: boolean }> = ({ active }) => (
  active 
    ? <CheckCircle className="w-5 h-5 text-green-500" /> 
    : <XCircle className="w-5 h-5 text-red-500" />
);

const ValueDisplay: React.FC<{ value?: string }> = ({ value }) => (
  value 
    ? <span className="font-mono bg-gray-200 px-2 py-1 rounded">{value}</span>
    : <span className="text-gray-400 italic">No configurado</span>
);

const SolariaStatusPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/config/config.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Config file not found');
          }
          return response.json();
        })
        .then(data => setConfig(data))
        .catch(() => setConfig(null)) // Si hay error, config es null
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') { // La contraseña debería estar en una variable de entorno en un caso real
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const renderDashboard = () => {
    if (loading) {
      return <p>Cargando estado del sistema...</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card: Configuración de Formularios */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Configuración de Formularios
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Servicio de Envío:</span>
              <strong className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">FormSubmit.co</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email Principal (To):</span>
              <ValueDisplay value="agency.solaria@gmail.com" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email en Copia (CC):</span>
              <ValueDisplay value="cepformacion.admi@hotmail.com" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Página de "Gracias":</span>
              <a href="/thank-you" target="_blank" className="text-blue-500 hover:underline">/thank-you</a>
            </div>
          </div>
        </div>

        {/* Card: Tracking y Analíticas */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Tracking y Analíticas (desde config.json)
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Google Tag Manager:</span>
              <ValueDisplay value={config?.tracking.gtm} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Google Analytics 4:</span>
              <ValueDisplay value={config?.tracking.ga4} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Meta Pixel:</span>
              <ValueDisplay value={config?.tracking.pixel} />
            </div>
          </div>
        </div>
        
        {/* Card: Estado de Scripts Cargados */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Power className="w-5 h-5 mr-2" />
            Estado de Scripts (en esta sesión)
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">DataLayer (GTM):</span>
              <StatusIndicator active={!!(window as any).dataLayer} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">gtag (GA4):</span>
              <StatusIndicator active={typeof (window as any).gtag === 'function'} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">fbq (Pixel):</span>
              <StatusIndicator active={typeof (window as any).fbq === 'function'} />
            </div>
          </div>
        </div>
        
      </div>
    );
  };
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <CepHeader />
        <main className="flex-grow flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Acceso al Panel de Estado</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuario</label>
                <input
                  type="text"
                  id="user"
                  value="admin"
                  readOnly
                  className="w-full px-3 py-2 mt-1 text-gray-500 bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-cep-primary focus:border-cep-primary"
                  placeholder="********"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-cep-primary rounded-md hover:bg-cep-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cep-primary"
              >
                Acceder
              </button>
            </form>
          </div>
        </main>
        <CepFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CepHeader />
      <main className="flex-grow p-4 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Estado Técnico</h1>
          {renderDashboard()}
        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default SolariaStatusPage;
