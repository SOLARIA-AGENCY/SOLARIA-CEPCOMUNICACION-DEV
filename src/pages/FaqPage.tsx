import React, { useState, FC, ReactNode } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Edit3, Briefcase } from 'lucide-react';

// --- TIPOS Y DATOS ---

type FaqItemData = {
  question: string;
  answer: ReactNode;
};

type FaqCategory = {
  title: string;
  icon: FC<{ className?: string }>;
  items: FaqItemData[];
};

const faqData: FaqCategory[] = [
  {
    title: 'General',
    icon: HelpCircle,
    items: [
      {
        question: '¿Qué es CEP Formación?',
        answer: <p>Somos un centro de estudios con más de 25 años de experiencia, especializado en formación profesional privada y ciclos formativos oficiales para mejorar la capacitación y empleabilidad de nuestros alumnos.</p>,
      },
      {
        question: '¿Dónde se encuentran sus sedes?',
        answer: <p>Disponemos de dos sedes principales para impartir nuestra formación presencial: CEP Norte y CEP Santa Cruz, ambas en Tenerife.</p>,
      },
    ],
  },
  {
    title: 'Cursos y Titulaciones',
    icon: BookOpen,
    items: [
      {
        question: '¿Qué diferencia hay entre un Curso Profesional y un Ciclo Formativo?',
        answer: <p>Nuestros <strong>Cursos Profesionales</strong> ofrecen una especialización rápida y práctica con titulación propia de gran prestigio en el sector. Los <strong>Ciclos Formativos</strong> son una formación reglada más extensa (2000 horas) que conduce a un Título Oficial del Ministerio de Educación, válido en toda España y que permite el acceso a la Universidad.</p>,
      },
      {
        question: '¿Los títulos son válidos para trabajar en el extranjero?',
        answer: <p>Los Títulos Oficiales de los Ciclos Formativos tienen reconocimiento en todo el Espacio Europeo de Educación Superior. La validez de las titulaciones de nuestros cursos profesionales puede variar según el país y el sector.</p>,
      },
    ],
  },
  {
    title: 'Inscripción y Pagos',
    icon: Edit3,
    items: [
      {
        question: '¿Cómo me puedo inscribir?',
        answer: <p>Puedes iniciar el proceso de inscripción contactando directamente con nosotros a través del formulario de la página del curso que te interese, llamándonos por teléfono o visitando nuestras sedes. Nuestro equipo de admisiones te guiará en cada paso.</p>,
      },
      {
        question: '¿Ofrecen facilidades de pago o becas?',
        answer: <p>Sí, ofrecemos opciones de financiación para pagar los cursos en cómodas cuotas. Además, para los Ciclos Formativos Oficiales, los alumnos pueden solicitar las becas ofrecidas por el Ministerio de Educación.</p>,
      },
    ],
  },
  {
    title: 'Prácticas y Salidas Laborales',
    icon: Briefcase,
    items: [
      {
        question: '¿Todos los cursos incluyen prácticas en empresa?',
        answer: <p>La gran mayoría de nuestros cursos, y obligatoriamente todos los Ciclos Formativos, incluyen un importante módulo de Formación en Centros de Trabajo (FCT) para que apliques tus conocimientos en un entorno laboral real, lo cual es clave para tu futura inserción laboral.</p>,
      },
    ],
  },
];

// --- COMPONENTES ---

type FaqItemProps = {
  question: string;
  children: ReactNode;
};

const FaqItem: FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center w-full py-5 px-6 text-left transition-colors duration-200 hover:bg-gray-100 ${isOpen ? 'bg-gray-100' : ''}`}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-cep-primary" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="text-gray-600 px-6 pb-5 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const FaqPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-cep-primary tracking-tight sm:text-5xl">Preguntas Frecuentes</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas saber sobre nuestra formación, en un solo lugar. Si no encuentras tu respuesta, no dudes en contactarnos.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {faqData.map((category) => (
              <div key={category.title}>
                <div className="flex items-center mb-6">
                  <category.icon className="h-8 w-8 text-cep-secondary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {category.items.map((item) => (
                    <FaqItem key={item.question} question={item.question}>
                      {item.answer}
                    </FaqItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default FaqPage; 