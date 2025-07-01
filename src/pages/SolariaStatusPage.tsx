import React, { useState, useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { CheckCircle, XCircle, Power, Mail, Key, Users, Eye, BarChartHorizontal, BarChart2, Server, TestTube2 } from 'lucide-react';

interface TrackingConfig {
  ga4?: string;
  pixel?: string;
  gtm?: string;
}

interface AppConfig {
  tracking: TrackingConfig;
}

interface AnalyticsData {
  users: string;
  sessions: string;
  engagementRate: string;
  activeUsers: string;
}

interface DeployReport {
  status: string;
  timestamp: string;
  commit: string;
}

interface TestReport {
  status: string;
  passed: number;
  failed: number;
  coverage: string;
}

const StatusIndicator: React.FC<{ active: boolean; preference?: boolean }> = ({ active, preference }) => {
  if (preference !== undefined) {
    return preference 
      ? <span title="Consentimiento otorgado"><CheckCircle className="w-5 h-5 text-green-500" /></span>
      : <span title="Consentimiento no otorgado o script no cargado"><XCircle className="w-5 h-5 text-gray-400" /></span>;
  }
  return active 
    ? <span title="Activo"><CheckCircle className="w-5 h-5 text-green-500" /></span> 
    : <span title="Inactivo"><XCircle className="w-5 h-5 text-red-500" /></span>;
};

const ValueDisplay: React.FC<{ value?: string | number }> = ({ value }) => (
  value 
    ? <span className="font-mono bg-gray-200 px-2 py-1 rounded">{value}</span>
    : <span className="text-gray-400 italic">No configurado</span>
);

const SolariaStatusPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [deployReport, setDeployReport] = useState<DeployReport | null>(null);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // Check for consent preference
      setMarketingConsent(localStorage.getItem('marketing_consent') === 'true');

      // Fetch config.json
      setLoading(true);
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

      setAnalyticsLoading(true);
      fetch('/api/get-analytics')
        .then(response => response.json())
        .then(data => setAnalytics(data))
        .catch(() => setAnalytics(null))
        .finally(() => setAnalyticsLoading(false));
      
      // Fetch deploy report
      fetch('/api/deploy-report.json')
        .then(response => response.json())
        .then(data => setDeployReport(data))
        .catch(() => setDeployReport(null));
      
      // Fetch test report
      fetch('/api/test-report.json')
        .then(response => response.json())
        .then(data => setTestReport(data))
        .catch(() => setTestReport(null));
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
      return <p className="text-center text-gray-500">Cargando estado del sistema...</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card: Analíticas Destacadas */}
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" />
            Analíticas Destacadas (Últimos 7 días)
          </h3>
          {analyticsLoading ? <p className="text-sm text-gray-500">Cargando datos de Google Analytics...</p> : (
            analytics ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">{analytics.users}</p>
                  <p className="text-sm text-gray-600">Usuarios</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Eye className="w-6 h-6 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">{analytics.sessions}</p>
                  <p className="text-sm text-gray-600">Sesiones</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <BarChartHorizontal className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-bold">{analytics.engagementRate}</p>
                  <p className="text-sm text-gray-600">Tasa Interacción</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Power className="w-6 h-6 mx-auto text-red-500 mb-2" />
                  <p className="text-2xl font-bold">{analytics.activeUsers}</p>
                  <p className="text-sm text-gray-600">Activos ahora</p>
                </div>
              </div>
            ) : <p className="text-sm text-red-500">No se pudieron cargar los datos de analíticas.</p>
          )}
        </div>

        {/* Card: Inscripción a Cursos */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Inscripción a Cursos (API Resend)
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Servicio de Envío:</span>
              <strong className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">Resend</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Endpoint:</span>
              <ValueDisplay value="/api/send-email" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email Principal (To):</span>
              <ValueDisplay value="agency.solaria@gmail.com" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Página de "Gracias":</span>
              <a href="/thank-you" target="_blank" className="text-blue-500 hover:underline">/thank-you</a>
            </div>
          </div>
        </div>
        
        {/* Card: Suscripción a Newsletter */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Suscripción a Newsletter
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Servicio de Envío:</span>
              <strong className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">FormSubmit.co</strong>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-gray-600">Email Destino:</span>
              <ValueDisplay value="cepformacion.admi@hotmail.com" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Página de "Gracias":</span>
              <a href="/gracias-suscripcion" target="_blank" className="text-blue-500 hover:underline">/gracias-suscripcion</a>
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
            Estado de Scripts (basado en consentimiento)
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
              <span className="text-gray-600">Pixel (fbq):</span>
              <StatusIndicator active={typeof (window as any).fbq === 'function'} preference={marketingConsent} />
            </div>
          </div>
        </div>
        
        {/* Card: Último Despliegue */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2" />
            Último Despliegue
          </h3>
          {deployReport ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fecha:</span>
                <ValueDisplay value={new Date(deployReport.timestamp).toLocaleString()} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estado:</span>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${deployReport.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {deployReport.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Commit:</span>
                <ValueDisplay value={deployReport.commit.substring(0, 7)} />
              </div>
            </div>
          ) : <p className="text-sm text-gray-500">Cargando informe de despliegue...</p>}
        </div>
        
        {/* Card: Estado de Pruebas (Tests) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <TestTube2 className="w-5 h-5 mr-2" />
            Suite de Pruebas (CI/CD)
          </h3>
          {testReport ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estado General:</span>
                 <span className={`px-2 py-1 text-xs font-bold rounded-full ${testReport.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {testReport.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pruebas Superadas:</span>
                <ValueDisplay value={testReport.passed} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pruebas Fallidas:</span>
                <ValueDisplay value={testReport.failed} />
              </div>
               <div className="flex justify-between items-center">
                <span className="text-gray-600">Cobertura (Coverage):</span>
                <ValueDisplay value={`${testReport.coverage}%`} />
              </div>
            </div>
          ) : <p className="text-sm text-gray-500">Cargando informe de pruebas...</p>}
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
