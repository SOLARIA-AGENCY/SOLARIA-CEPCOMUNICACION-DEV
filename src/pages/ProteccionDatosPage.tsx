import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const ProteccionDatosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Protección de Datos
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tu Privacidad es Nuestra Prioridad</h2>
              <p className="text-gray-700 mb-4">
                En CEP FORMACIÓN, nos comprometemos a proteger tus datos personales y a ser transparentes sobre la información que recopilamos y cómo la utilizamos. Esta página resume tus derechos en materia de protección de datos y cómo puedes gestionarlos. Para una información más exhaustiva, te recomendamos consultar nuestra <a href="/politica-privacidad" className="text-cep-primary hover:underline font-medium">Política de Privacidad</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tus Derechos (ARCO-POL)</h2>
              <p>El Reglamento General de Protección de Datos (RGPD) te otorga los siguientes derechos sobre tu información personal:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li><strong>Acceso:</strong> Derecho a saber qué datos tuyos tenemos.</li>
                    <li><strong>Rectificación:</strong> Derecho a corregir datos inexactos.</li>
                    <li><strong>Cancelación (Supresión):</strong> Derecho a que eliminemos tus datos.</li>
                    <li><strong>Oposición:</strong> Derecho a oponerte a ciertos tratamientos (ej. marketing).</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                   <ul className="list-disc list-inside text-blue-700 space-y-2">
                    <li><strong>Portabilidad:</strong> Derecho a recibir tus datos en un formato estándar.</li>
                    <li><strong>Olvido:</strong> Derecho a ser eliminado de internet.</li>
                    <li><strong>Limitación:</strong> Derecho a limitar el tratamiento de tus datos.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Cómo Ejercer tus Derechos?</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Canal de Comunicación</h3>
                <p className="text-yellow-700 mb-4">
                  Para ejercer cualquiera de estos derechos, por favor, envía un correo electrónico a nuestro Delegado de Protección de Datos (DPO):
                </p>
                <p className="text-center">
                  <a href="mailto:protecciondatos@cursostenerife.es" className="text-lg font-bold text-yellow-900 bg-yellow-200 px-4 py-2 rounded">
                    protecciondatos@cursostenerife.es
                  </a>
                </p>
                <p className="text-yellow-700 mt-4">
                  Deberás indicar claramente qué derecho deseas ejercer y adjuntar una copia de tu DNI o documento equivalente para verificar tu identidad. Nos comprometemos a responder en un plazo máximo de 30 días.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Más Información</h2>
              <div className="flex flex-wrap gap-4">
                <a href="/politica-privacidad" className="text-cep-primary hover:underline font-medium">
                  Política de Privacidad Completa
                </a>
                <a href="/politica-cookies" className="text-cep-primary hover:underline font-medium">
                  Política de Cookies
                </a>
                <a href="/aviso-legal" className="text-cep-primary hover:underline font-medium">
                  Aviso Legal
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

export default ProteccionDatosPage; 