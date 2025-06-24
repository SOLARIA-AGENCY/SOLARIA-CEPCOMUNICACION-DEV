import React, { useState, useEffect } from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import CursoInscripcionModal from '../components/organisms/CursoInscripcionModal';
import { Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

// Datos específicos para este curso
const curso = {
  slug: 'adiestramiento-canino-norte',
  nombre: 'Adiestramiento Canino',
  sede: 'Norte',
  tag: 'otono-2025-adiestramiento-canino-norte',
  inicio: 'Septiembre 2025',
  imagen: '/images/cursos/mundo-animal.jpg',
  copy: {
    slogan: 'Haz de tu pasión por los perros tu profesión.',
    textosPrincipales: [
      'Fórmate en Adiestramiento Canino con prácticas reales y título CEP. Plazas limitadas.',
      'Aprende técnicas de educación y manejo canino con instructores expertos. Prácticas garantizadas y salida laboral real.',
      'Conviértete en adiestrador profesional y trabaja con perros de forma ética y efectiva. Plazas abiertas.'
    ],
    titulos: [
      'Fórmate como adiestrador canino. Prácticas reales y empleo.',
      'Curso de adiestramiento con prácticas y título CEP.',
      'Da el salto profesional al mundo canino.'
    ],
    descripciones: [
      'Descubre cómo convertir tu pasión por los perros en profesión.',
      'Haz clic y conoce nuestro curso de adiestrador canino.',
      'Solicita plaza y accede a prácticas reales. Más info.'
    ]
  }
};

const AdiestramientoCaninoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { nombre, sede, inicio, imagen, copy } = curso;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CepHeader />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-96 bg-black">
          <img src={imagen} alt={`Imagen de ${nombre}`} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{nombre}</h1>
            <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl">{copy.slogan}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Info Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12 flex flex-wrap items-center justify-around gap-6 -mt-32 relative z-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Inicio</p>
                  <p className="font-bold text-gray-900">{inicio}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Sede</p>
                  <p className="font-bold text-gray-900">{sede}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-cep-primary" />
                <div>
                  <p className="text-sm text-gray-500">Certificación</p>
                  <p className="font-bold text-gray-900">Diploma CEP</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900">Sobre el curso</h2>
                <p>{copy.textosPrincipales[0]}</p>
                <p>{copy.textosPrincipales[1]}</p>
                
                <h3 className="text-2xl font-bold mt-10">¿Qué aprenderás?</h3>
                <ul className="space-y-2">
                  {copy.titulos.map((titulo, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{titulo}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="mt-6">{copy.textosPrincipales[2]}</p>

              </div>

              {/* CTA Sidebar */}
              <aside className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900">¿Listo para empezar?</h3>
                  <p className="text-gray-600 mt-2 mb-6">Solicita información sin compromiso y reserva tu plaza.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-cep-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-cep-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    ¡Inscríbete Ahora!
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">Plazas limitadas. Grupos reducidos.</p>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>

      <CursoInscripcionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={{ nombre: curso.nombre, sede: curso.sede, tag: curso.tag }}
      />
      
      <CepFooter />
    </div>
  );
};

export default AdiestramientoCaninoPage; 