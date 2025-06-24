import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AvisoLegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Aviso Legal
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Datos Identificativos</h2>
              <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
              <ul className="list-disc list-inside">
                <li><strong>Titular:</strong> Acaten 2020 S.L. ("CEP FORMACIÓN")</li>
                <li><strong>NIF:</strong> B76736139</li>
                <li><strong>Domicilio Social:</strong> Santa Cruz de Tenerife, España</li>
                <li><strong>Correo electrónico:</strong> info@cursostenerife.es</li>
                <li><strong>Teléfono:</strong> 922 21 92 57</li>
                <li><strong>Sitio Web:</strong> www.cepcomunicacion.com</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objeto del Aviso Legal</h2>
              <p>El presente Aviso Legal regula el acceso y uso del sitio web www.cepcomunicacion.com (en adelante, el "Sitio Web"), titularidad de CEP FORMACIÓN. El acceso al Sitio Web atribuye la condición de Usuario e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propiedad Intelectual e Industrial</h2>
              <p>Todos los derechos de propiedad intelectual e industrial del Sitio Web y de sus contenidos (textos, imágenes, diseños, creatividades, software, código fuente) pertenecen a CEP FORMACIÓN o, en su caso, a terceras personas. El Usuario puede visualizar todos los elementos, imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Exclusión de Garantías y Responsabilidad</h2>
              <p>CEP FORMACIÓN no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Legislación Aplicable y Jurisdicción</h2>
              <p>La relación entre CEP FORMACIÓN y el Usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Santa Cruz de Tenerife.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Páginas relacionadas</h2>
              <div className="flex flex-wrap gap-4">
                <a href="/politica-privacidad" className="text-cep-primary hover:underline font-medium">
                  Política de Privacidad
                </a>
                <a href="/politica-cookies" className="text-cep-primary hover:underline font-medium">
                  Política de Cookies
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

export default AvisoLegalPage; 