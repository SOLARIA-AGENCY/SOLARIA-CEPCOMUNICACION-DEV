import React, { useState } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FaqItemProps = {
  question: string;
  children: React.ReactNode;
};

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-cep-primary" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

const FaqPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-cep-primary tracking-tight sm:text-5xl">Preguntas Frecuentes (FAQ)</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Aquí encontrarás respuestas a las dudas más comunes sobre nuestros cursos, inscripciones y metodología.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FaqItem question="¿Los títulos son oficiales?">
              <p>Ofrecemos tanto Cursos Profesionales con titulación propia de gran prestigio en el sector, como Ciclos Formativos de Grado Medio y Superior con titulación 100% oficial del Ministerio de Educación.</p>
            </FaqItem>
            <FaqItem question="¿Qué necesito para inscribirme?">
              <p>Los requisitos varían según el curso. Para los Cursos Profesionales, generalmente se requiere la ESO. Para los Ciclos Formativos, se aplican los requisitos de acceso oficiales (Bachillerato para Grado Superior, ESO para Grado Medio, o pruebas de acceso equivalentes).</p>
            </FaqItem>
            <FaqItem question="¿Hay prácticas en empresa?">
              <p>Sí, la mayoría de nuestros cursos, y todos los Ciclos Formativos, incluyen un importante módulo de Formación en Centros de Trabajo (FCT), donde aplicarás lo aprendido en un entorno laboral real.</p>
            </FaqItem>
            <FaqItem question="¿Ofrecen facilidades de pago?">
              <p>Sí, disponemos de opciones de financiación para que puedas pagar cómodamente en cuotas. Contacta con nuestro equipo de admisiones para conocer los planes disponibles para cada curso.</p>
            </FaqItem>
          </div>
        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default FaqPage; 