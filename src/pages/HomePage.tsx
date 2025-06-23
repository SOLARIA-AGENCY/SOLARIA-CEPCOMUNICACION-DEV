import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Code, Monitor, Shield, Zap, Plus, GitBranch, RefreshCw } from 'lucide-react';
import { BRAND_CONFIG } from '../config/features';

interface ClientProject {
  name: string;
  description: string;
}

interface ProjectStep {
  step: number;
  title: string;
  command: string;
  description: string;
}

// Force deployment update - cache bust
export const HomePage: React.FC = () => {
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientProject, setClientProject] = useState<ClientProject>({ name: '', description: '' });
  const [generatingProject, setGeneratingProject] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" style={{ color: BRAND_CONFIG.colors.primary }} />,
      title: "Ultra-rápido",
      description: "Build en <1s con Vite 6 + React 19"
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: BRAND_CONFIG.colors.secondary }} />,
      title: "Seguro",
      description: "0 vulnerabilidades, headers de seguridad completos"
    },
    {
      icon: <Monitor className="w-6 h-6" style={{ color: BRAND_CONFIG.colors.accent }} />,
      title: "Dashboard Técnico",
      description: "Monitoreo en tiempo real de métricas"
    },
    {
      icon: <Code className="w-6 h-6" style={{ color: BRAND_CONFIG.colors.dark }} />,
      title: "100% TypeScript",
      description: "Tipado estricto y desarrollo seguro"
    }
  ];

  const techStack = [
    "React 19", "TypeScript 5.7", "Vite 6", "TailwindCSS 4", 
    "Vitest", "Netlify", "Testing Library", "ESLint"
  ];

  const stats = [
    { label: "Tests Passing", value: "7/7", color: BRAND_CONFIG.colors.secondary },
    { label: "Bundle Size", value: "84.91 kB", color: BRAND_CONFIG.colors.primary },
    { label: "Build Time", value: "<2.3s", color: BRAND_CONFIG.colors.accent },
    { label: "Lighthouse", value: "95+", color: BRAND_CONFIG.colors.dark }
  ];

  const generateClientProject = async () => {
    if (!clientProject.name.trim()) {
      alert('Por favor ingresa el nombre del cliente');
      return;
    }

    setGeneratingProject(true);
    try {
      const response = await fetch('/.netlify/functions/generate-client-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: clientProject.name,
          description: clientProject.description
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Crear un mensaje detallado con las instrucciones
        const instructions = result.data.instructions;
        let message = `🎉 Instrucciones generadas para: ${result.data.clientName}\n\n`;
        message += `📁 Repositorio: ${result.data.repoName}\n`;
        message += `🌐 GitHub: ${result.data.githubUrl}\n`;
        message += `🚀 Deploy: ${result.data.deployUrl}\n\n`;
        message += `⚠️ IMPORTANTE: Ejecutar localmente\n\n`;
        message += `📋 PASOS:\n`;
        
        instructions.steps.forEach((step: ProjectStep) => {
          message += `${step.step}. ${step.title}\n`;
          message += `   💻 ${step.command}\n\n`;
        });

        message += `🔧 REQUISITOS NECESARIOS:\n`;
        instructions.requirements.forEach((req: string) => {
          message += `• ${req}\n`;
        });

        message += `\n📖 ALTERNATIVA MANUAL:\n`;
        instructions.manualAlternative.steps.forEach((step: string) => {
          message += `• ${step}\n`;
        });

        message += `\n💡 Tip: Copia estos comandos en tu terminal local`;

        alert(message);
        
        // Abrir GitHub en una nueva pestaña para facilitar la creación manual
        window.open('https://github.com/new', '_blank');
      } else {
        throw new Error(result.message || 'Error al generar las instrucciones');
      }
      
      setShowClientForm(false);
      setClientProject({ name: '', description: '' });
    } catch (error) {
      console.error('Error generating project:', error);
      alert(`❌ Error al generar instrucciones del proyecto:\n\n${error instanceof Error ? error.message : 'Error desconocido'}\n\n💡 Para crear el proyecto manualmente:\n1. Ve a https://github.com/new\n2. Usa el nombre: solaria-${clientProject.name.toLowerCase().replace(/\s+/g, '-')}\n3. Clona el template de SOLARIA-AGENCY\n4. Personaliza el contenido`);
    } finally {
      setGeneratingProject(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src={BRAND_CONFIG.logo.main} 
                alt={BRAND_CONFIG.logo.alt}
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  // Fallback al SVG si no se encuentra el PNG
                  e.currentTarget.src = '/images/solaria-logo.svg';
                }}
              />
              <div>
                <span className="text-xl font-bold text-gray-900">{BRAND_CONFIG.name}</span>
                <span className="text-sm text-gray-500 hidden sm:inline ml-2">VITE TEMPLATE</span>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <a 
                href="/dashboard" 
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                Métricas de Despliegue
              </a>
              <a 
                href={BRAND_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                GitHub
              </a>
              <a 
                href={BRAND_CONFIG.urls.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                style={{ backgroundColor: BRAND_CONFIG.colors.primary }}
              >
                {BRAND_CONFIG.agency}
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={BRAND_CONFIG.logo.main}
                alt={BRAND_CONFIG.logo.alt}
                className="h-24 w-24 object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/images/solaria-logo.svg';
                }}
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {BRAND_CONFIG.name}
              <span 
                className="block text-transparent bg-clip-text bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${BRAND_CONFIG.colors.primary}, ${BRAND_CONFIG.colors.secondary})`
                }}
              >
                VITE TEMPLATE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Framework corporativo moderno con <strong>React 19</strong>, <strong>TypeScript</strong> y <strong>Vite 6</strong>. 
              Optimizado para desarrollo empresarial ágil.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a 
                href="/dashboard"
                className="text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: BRAND_CONFIG.colors.primary }}
              >
                Métricas de Despliegue
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href={BRAND_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                style={{ 
                  borderColor: BRAND_CONFIG.colors.primary,
                  color: BRAND_CONFIG.colors.primary
                }}
              >
                Ver Código
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 text-white"
                style={{ backgroundColor: BRAND_CONFIG.colors.secondary }}
              >
                <CheckCircle className="w-4 h-4" />
                Tests Passing
              </span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 text-white"
                style={{ backgroundColor: BRAND_CONFIG.colors.primary }}
              >
                <Shield className="w-4 h-4" />
                Zero Vulnerabilities
              </span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 text-white"
                style={{ backgroundColor: BRAND_CONFIG.colors.accent }}
              >
                <Zap className="w-4 h-4" />
                Production Ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Generador de Proyectos Cliente */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 lg:pr-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                  <Plus className="w-8 h-8 mr-3" style={{ color: BRAND_CONFIG.colors.secondary }} />
                  Generador de Proyectos Cliente
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Crea automáticamente un nuevo proyecto personalizado para un cliente específico. 
                  Esta herramienta genera las instrucciones necesarias para crear un repositorio 
                  <code className="bg-gray-100 px-2 py-1 rounded mx-1 text-sm font-mono">solaria-[cliente]</code> 
                  en GitHub con una página de bienvenida personalizada, configuración optimizada y 
                  documentación específica del cliente.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2" />
                    ¿Qué hace esta función?
                  </h3>
                  <ul className="text-blue-800 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Genera instrucciones paso a paso para crear el proyecto
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Crea un repositorio <strong>solaria-[nombre-cliente]</strong> en GitHub
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Personaliza la página de bienvenida con el branding del cliente
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Configura el proyecto sin el dashboard interno de SOLARIA
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Incluye documentación y configuración específica del cliente
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Proporciona alternativas manuales si no tienes las herramientas instaladas
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="text-center">
                  <button
                    onClick={() => setShowClientForm(true)}
                    className="flex items-center space-x-3 px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                    style={{ backgroundColor: BRAND_CONFIG.colors.secondary }}
                  >
                    <Plus className="w-6 h-6" />
                    <span>Crear Nuevo Proyecto</span>
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Genera proyecto personalizado para cliente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para desarrollo empresarial moderno
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Stack Tecnológico
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="text-white py-16"
        style={{ backgroundColor: BRAND_CONFIG.colors.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={BRAND_CONFIG.logo.main}
                alt={BRAND_CONFIG.logo.alt}
                className="h-12 w-12 object-contain filter brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.src = '/images/solaria-logo.svg';
                }}
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">{BRAND_CONFIG.fullName}</h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Framework corporativo moderno desarrollado por {BRAND_CONFIG.agency}. 
              Listo para escalar desde MVP hasta aplicación empresarial completa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/dashboard"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Explorar Dashboard
              </a>
              <a 
                href={BRAND_CONFIG.urls.website}
                target="_blank"
                className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Contactar {BRAND_CONFIG.agency}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Client Project Generation Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <GitBranch className="w-6 h-6 mr-2" style={{ color: BRAND_CONFIG.colors.primary }} />
              Generar Proyecto de Cliente
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Cliente/Proyecto *
                </label>
                <input
                  type="text"
                  value={clientProject.name}
                  onChange={(e) => setClientProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ej: PRILABSA, Empresa-ABC, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se creará como: solaria-{clientProject.name.toLowerCase().replace(/\s+/g, '-')}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (Opcional)
                </label>
                <textarea
                  value={clientProject.description}
                  onChange={(e) => setClientProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descripción del proyecto..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-sm mb-2">Se generará automáticamente:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Repositorio en GitHub: solaria-{clientProject.name.toLowerCase().replace(/\s+/g, '-')}</li>
                <li>• Proyecto base sin dashboard SOLARIA</li>
                <li>• Página de bienvenida personalizada</li>
                <li>• Configuración optimizada para cliente</li>
                <li>• Commit inicial y setup completo</li>
              </ul>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowClientForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={generatingProject}
              >
                Cancelar
              </button>
              <button
                onClick={generateClientProject}
                disabled={!clientProject.name.trim() || generatingProject}
                className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: BRAND_CONFIG.colors.primary }}
              >
                {generatingProject ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Generando...
                  </>
                ) : (
                  'Generar Proyecto'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 