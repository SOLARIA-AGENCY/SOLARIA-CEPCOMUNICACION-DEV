import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const PoliticaCookiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Política de Cookies
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Qué son las cookies?</h2>
              <p className="text-gray-700 mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
                Nos ayudan a mejorar tu experiencia de navegación y a ofrecerte contenido personalizado sobre nuestros cursos de formación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tipos de cookies que utilizamos</h2>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Cookies Esenciales</h3>
                <p className="text-green-700">
                  Son necesarias para el funcionamiento básico del sitio web. No pueden ser desactivadas y no requieren consentimiento.
                </p>
                <ul className="list-disc list-inside mt-2 text-green-700">
                  <li>Gestión de sesiones de usuario</li>
                  <li>Recordar preferencias de navegación</li>
                  <li>Seguridad y autenticación</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Cookies de Análisis</h3>
                <p className="text-blue-700">
                  Nos ayudan a entender cómo interactúas con nuestro sitio web para mejorarlo.
                </p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                  <li>Google Analytics (análisis de tráfico web)</li>
                  <li>Tiempo de permanencia en páginas</li>
                  <li>Rutas de navegación más populares</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Cookies de Marketing</h3>
                <p className="text-purple-700">
                  Se utilizan para mostrarte información relevante sobre nuestros cursos de formación. <strong>Requieren tu consentimiento explícito.</strong>
                </p>
                <ul className="list-disc list-inside mt-2 text-purple-700">
                  <li><strong>Meta Pixel (Facebook):</strong> Seguimiento de conversiones y retargeting de cursos</li>
                  <li><strong>Google Ads:</strong> Publicidad personalizada de programas formativos</li>
                  <li><strong>Mailchimp:</strong> Gestión de campañas de email marketing educativo</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Finalidad específica del Meta Pixel</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 mb-2">
                  <strong>Pixel ID:</strong> 1189071876088388
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Responsable:</strong> CEP FORMACIÓN en colaboración con Solaria Agency
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Finalidades:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Seguimiento de visitantes interesados en formación profesional</li>
                  <li>Optimización de campañas publicitarias de cursos</li>
                  <li>Retargeting a usuarios que visitaron páginas de cursos específicos</li>
                  <li>Medición de conversiones (inscripciones y solicitudes de información)</li>
                  <li>Creación de audiencias similares para ampliar alcance educativo</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tus derechos y opciones</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestionar consentimiento</h3>
                  <p className="text-gray-700 mb-3">
                    Puedes cambiar tus preferencias de cookies en cualquier momento:
                  </p>
                  <button 
                    onClick={() => {
                      if (window.cookieconsent) {
                        window.cookieconsent.reset();
                      }
                    }}
                    className="bg-cep-primary text-white px-6 py-2 rounded-lg hover:bg-cep-primary/90 transition-colors"
                  >
                    Cambiar preferencias de cookies
                  </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuración del navegador</h3>
                  <p className="text-gray-700">
                    También puedes configurar tu navegador para bloquear o eliminar cookies:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad</li>
                    <li><strong>Safari:</strong> Preferencias → Privacidad</li>
                    <li><strong>Edge:</strong> Configuración → Permisos del sitio → Cookies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Período de conservación</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo de Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Propósito</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Esenciales</td>
                      <td className="border border-gray-300 px-4 py-2">Sesión</td>
                      <td className="border border-gray-300 px-4 py-2">Funcionamiento del sitio</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Meta Pixel</td>
                      <td className="border border-gray-300 px-4 py-2">180 días</td>
                      <td className="border border-gray-300 px-4 py-2">Marketing y conversiones</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">26 meses</td>
                      <td className="border border-gray-300 px-4 py-2">Análisis de uso</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <div className="bg-cep-primary/10 border border-cep-primary/20 rounded-lg p-4">
                <p className="text-gray-700 mb-2">
                  Si tienes preguntas sobre nuestra política de cookies o quieres ejercer tus derechos:
                </p>
                <div className="space-y-1 text-gray-700">
                  <p><strong>CEP FORMACIÓN</strong></p>
                  <p>Email: info@cursostenerife.es</p>
                  <p>Teléfono: 922 21 92 57</p>
                  <p>Dirección: Santa Cruz de Tenerife</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Páginas relacionadas</h2>
              <div className="flex flex-wrap gap-4">
                <a href="/politica-privacidad" className="text-cep-primary hover:underline font-medium">
                  Política de Privacidad
                </a>
                <a href="/aviso-legal" className="text-cep-primary hover:underline font-medium">
                  Aviso Legal
                </a>
                <a href="/proteccion-datos" className="text-cep-primary hover:underline font-medium">
                  Protección de Datos
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <CepFooter />
    </div>
  );
};

export default PoliticaCookiesPage; 