import React from 'react';
import { ArrowRight, CheckCircle, Globe, Zap } from 'lucide-react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CEPCOMUNICACION</h1>
                <p className="text-sm text-gray-500">Powered by SOLARIA</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Proyecto generado</p>
              <p className="text-sm font-medium">6/23/2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-white font-bold text-3xl">C</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenido a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              CEPCOMUNICACION
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Centro especializado en comunicación corporativa, marketing digital y estrategias de branding
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proyecto Inicializado</h3>
              <p className="text-sm text-gray-600">
                Configuración base completada y lista para desarrollo
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Listo para Deploy</h3>
              <p className="text-sm text-gray-600">
                Configuración de deployment automático incluida
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Optimizado</h3>
              <p className="text-sm text-gray-600">
                Performance y SEO optimizados desde el inicio
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stack Tecnológico</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS', 'Vitest', 'Netlify'].map((tech) => (
                <span key={tech} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl p-8 shadow-sm border max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Pasos</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-medium text-gray-900">Personalizar Contenido</h3>
                  <p className="text-sm text-gray-600">Actualiza el contenido en src/pages/WelcomePage.tsx</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-medium text-gray-900">Configurar Deployment</h3>
                  <p className="text-sm text-gray-600">Conecta con Netlify para deployment automático</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-medium text-gray-900">Desarrollar Features</h3>
                  <p className="text-sm text-gray-600">Añade las funcionalidades específicas del proyecto</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button 
              onClick={() => window.open('https://github.com/SOLARIA-AGENCY/solaria-cepcomunicacion', '_blank')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ver en GitHub
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Desarrollado con ❤️ por <strong>SOLARIA.AGENCY</strong></p>
            <p className="mt-1">Template generado el 6/23/2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;