import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const PoliticaPrivacidadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Política de Privacidad
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsables del tratamiento</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">CEP FORMACIÓN</h3>
                <ul className="text-blue-700 space-y-1">
                  <li><strong>Razón social:</strong> Acaten 2020 S.L.</li>
                  <li><strong>CIF:</strong> B76736139</li>
                  <li><strong>Dirección:</strong> Santa Cruz de Tenerife, España</li>
                  <li><strong>Email:</strong> info@cursostenerife.es</li>
                  <li><strong>Teléfono:</strong> 922 21 92 57</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">SOLARIA AGENCY (Corresponsable)</h3>
                <ul className="text-purple-700 space-y-1">
                  <li><strong>Especialidad:</strong> Gestión de marketing digital y automatización</li>
                  <li><strong>Función:</strong> Procesamiento de leads y campañas publicitarias</li>
                  <li><strong>Dominio:</strong> cepcomunicacion.com</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Finalidades del tratamiento</h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">📚 Gestión de inscripciones y cursos</h3>
                  <ul className="list-disc list-inside text-green-700">
                    <li>Procesamiento de solicitudes de información sobre cursos</li>
                    <li>Gestión de matriculaciones y pagos</li>
                    <li>Comunicación académica y administrativa</li>
                    <li>Seguimiento del progreso formativo</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">📢 Marketing y comunicaciones</h3>
                  <ul className="list-disc list-inside text-blue-700">
                    <li>Envío de información sobre nuevos cursos y programas</li>
                    <li>Campañas de email marketing segmentado</li>
                    <li>Publicidad personalizada en redes sociales (Meta/Facebook)</li>
                    <li>Retargeting de usuarios interesados en formación específica</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Análisis y mejora de servicios</h3>
                  <ul className="list-disc list-inside text-yellow-700">
                    <li>Análisis de navegación web y preferencias de cursos</li>
                    <li>Optimización de páginas de aterrizaje</li>
                    <li>Medición de conversiones y efectividad publicitaria</li>
                    <li>Investigación de mercado educativo</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base legal para el tratamiento</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidad</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Base Legal</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Artículo RGPD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Gestión de cursos e inscripciones</td>
                      <td className="border border-gray-300 px-4 py-2">Ejecución de contrato</td>
                      <td className="border border-gray-300 px-4 py-2">Art. 6.1.b</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Marketing directo propio</td>
                      <td className="border border-gray-300 px-4 py-2">Interés legítimo</td>
                      <td className="border border-gray-300 px-4 py-2">Art. 6.1.f</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Publicidad en redes sociales</td>
                      <td className="border border-gray-300 px-4 py-2">Consentimiento explícito</td>
                      <td className="border border-gray-300 px-4 py-2">Art. 6.1.a</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Cookies de análisis</td>
                      <td className="border border-gray-300 px-4 py-2">Consentimiento</td>
                      <td className="border border-gray-300 px-4 py-2">Art. 6.1.a</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Destinatarios de los datos</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🔧 Proveedores de servicios tecnológicos</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li><strong>Meta (Facebook/Instagram):</strong> Para publicidad personalizada y seguimiento de conversiones</li>
                    <li><strong>Google Analytics:</strong> Para análisis de comportamiento web</li>
                    <li><strong>Mailchimp/Brevo:</strong> Para gestión de campañas de email marketing</li>
                    <li><strong>Netlify/Hostinger:</strong> Para alojamiento web y gestión de dominios</li>
                    <li><strong>FormSubmit:</strong> Para la gestión de envío de formularios por correo electrónico.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🏛️ Organismos oficiales</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Servicio Canario de Empleo (cuando aplique)</li>
                    <li>Fundación Estatal para la Formación en el Empleo (FUNDAE)</li>
                    <li>Otras entidades oficiales según el tipo de curso</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Periodo de conservación</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo de datos</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Periodo</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Justificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Datos de matriculación</td>
                      <td className="border border-gray-300 px-4 py-2">10 años</td>
                      <td className="border border-gray-300 px-4 py-2">Obligaciones contables y fiscales</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Expedientes académicos</td>
                      <td className="border border-gray-300 px-4 py-2">50 años</td>
                      <td className="border border-gray-300 px-4 py-2">Normativa educativa</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Leads de marketing</td>
                      <td className="border border-gray-300 px-4 py-2">3 años</td>
                      <td className="border border-gray-300 px-4 py-2">Gestión comercial activa</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Cookies de marketing</td>
                      <td className="border border-gray-300 px-4 py-2">180 días</td>
                      <td className="border border-gray-300 px-4 py-2">Política de Meta</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tus derechos como usuario</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Derechos de acceso y control</h3>
                  <ul className="list-disc list-inside text-green-700 text-sm">
                    <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre ti</li>
                    <li><strong>Rectificación:</strong> Corregir datos incorrectos</li>
                    <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                    <li><strong>Limitación:</strong> Restringir el procesamiento</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">🔄 Derechos de portabilidad y objeción</h3>
                  <ul className="list-disc list-inside text-blue-700 text-sm">
                    <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                    <li><strong>Oposición:</strong> Oponerte al tratamiento por marketing</li>
                    <li><strong>Decisiones automatizadas:</strong> No ser objeto de perfilado</li>
                    <li><strong>Consentimiento:</strong> Revocar en cualquier momento</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">📧 Cómo ejercer tus derechos</h3>
                <p className="text-yellow-700 mb-2">
                  Para ejercer cualquiera de estos derechos, contacta con nosotros:
                </p>
                <ul className="list-disc list-inside text-yellow-700">
                  <li><strong>Email:</strong> protecciondatos@cursostenerife.es</li>
                  <li><strong>Formulario web:</strong> Página de contacto con asunto "Protección de Datos"</li>
                  <li><strong>Respuesta:</strong> Máximo 30 días naturales</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transferencias internacionales</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">🌍 Servicios en terceros países</h3>
                <p className="text-red-700 mb-2">
                  Algunos de nuestros proveedores pueden procesar datos fuera del Espacio Económico Europeo:
                </p>
                <ul className="list-disc list-inside text-red-700">
                  <li><strong>Meta (Estados Unidos):</strong> Cláusulas contractuales tipo y Marco de Privacidad de Datos UE-EE.UU.</li>
                  <li><strong>Google (Estados Unidos):</strong> Programa de Certificación del Marco de Privacidad de Datos</li>
                  <li><strong>Mailchimp (Estados Unidos):</strong> Cláusulas contractuales tipo aprobadas por la Comisión Europea</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Autoridad de control</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 mb-2">
                  Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante:
                </p>
                <div className="text-gray-700">
                  <p><strong>Agencia Española de Protección de Datos (AEPD)</strong></p>
                  <p>Web: www.aepd.es</p>
                  <p>Teléfono: 901 100 099</p>
                  <p>Dirección: C/ Jorge Juan, 6, 28001 Madrid</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Páginas relacionadas</h2>
              <div className="flex flex-wrap gap-4">
                <a href="/politica-cookies" className="text-cep-primary hover:underline font-medium">
                  Política de Cookies
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

export default PoliticaPrivacidadPage; 