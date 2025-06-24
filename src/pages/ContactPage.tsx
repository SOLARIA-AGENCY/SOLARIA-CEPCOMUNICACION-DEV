import React, { useState, useEffect } from 'react';
import { Clock, Users, Award, MapPin, Phone, Mail, Calendar, CheckCircle, Star } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const AdiestramientoCanino: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    sede: '',
    comentarios: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementará la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    setShowModal(false);
    // Mostrar mensaje de confirmación
    alert('¡Gracias! Hemos recibido tu solicitud. Te contactaremos en breve para confirmar tu plaza.');
  };

  // Scroll al top cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <CepHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cep-primary to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
                CURSO PROFESIONAL DE<br />
                <span className="text-yellow-300 drop-shadow-2xl">ADIESTRAMIENTO CANINO</span>
              </h1>
              <p className="text-xl mb-8 text-white drop-shadow-xl font-semibold bg-black bg-opacity-30 p-3 rounded-lg">
                Técnicas de adiestramiento de base y educación canina nivel I
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                  <Calendar className="w-5 h-5 mr-2 text-cep-primary" />
                  <span className="text-gray-800 font-semibold">Inicio: Septiembre 2025</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                  <Clock className="w-5 h-5 mr-2 text-cep-primary" />
                  <span className="text-gray-800 font-semibold">6 meses - 25 sesiones</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                  <MapPin className="w-5 h-5 mr-2 text-cep-primary" />
                  <span className="text-gray-800 font-semibold">CEP Norte - La Orotava</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                <p className="text-gray-800 text-sm font-medium">
                  <strong>Requisitos:</strong> Acceso con 2º de la ESO o EGB
                </p>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="/images/cursos/mundo-animal.jpg" 
                alt="Adiestramiento Canino" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto border-4 border-white border-opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Urgencia */}
      <section className="py-8 bg-yellow-100 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-gray-800">
            ⏰ <span className="text-cep-primary">¡ÚLTIMAS PLAZAS DISPONIBLES!</span> 
            Los cursos empiezan en septiembre - No te quedes sin tu plaza
          </p>
        </div>
      </section>

      {/* ¿Qué aprendo? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-cep-primary mb-8 text-center">¿Qué aprenderás?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              El curso de Adiestramiento de base I ofrece los conocimientos imprescindibles acerca de las técnicas de 
              adiestramiento de base aplicadas a perros, modificación de conductas no deseadas así como los cuidados 
              básicos y primeros auxilios, además de un módulo de orientación laboral.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Habilidades que desarrollarás</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <span>Técnicas de adiestramiento profesional</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <span>Modificación de conductas no deseadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <span>Cuidados básicos y primeros auxilios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <span>Orientación laboral especializada</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Salidas profesionales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <span>Adiestrador canino profesional</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <span>Educador canino</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <span>Consultor en comportamiento animal</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <span>Emprendimiento en el sector</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido del curso */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-cep-primary mb-12 text-center">Contenido del Curso</h2>
            
            <div className="grid gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Módulo 1: Técnicas de adiestramiento de base</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Comportamiento social y bases morfológicas de conducta en el perro</li>
                  <li>• Factores básicos modificadores de la conducta del perro</li>
                  <li>• Biología de la conducta, genética y ecología</li>
                  <li>• Programas básicos de obediencia y control</li>
                  <li>• Seguridad y autoprotección en el adiestramiento</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Módulo 2: Modificación de conductas no deseadas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Valoración de conductas no deseadas susceptibles de corrección</li>
                  <li>• Interpretación del lenguaje corporal en el perro</li>
                  <li>• Identificación de factores que producen conductas no deseadas</li>
                  <li>• Métodos de eliminación y tratamiento de agresiones</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Módulo 3: Cuidados higiénicos aplicados a perros</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Metodología y control de la alimentación y nutrición</li>
                  <li>• Alojamiento y transporte según normativa</li>
                  <li>• Cuidados higiénicos y control sanitario</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Módulo 4: Primeros Auxilios aplicados a Perros</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Morfología y fisiología del perro</li>
                  <li>• Diagnóstico y valoración inicial</li>
                  <li>• Técnicas de inmovilización y traslado</li>
                  <li>• Administración de medicamentos y masaje cardíaco</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profesora */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-cep-primary mb-8">Tu Profesora</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <img 
                src="/images/profesores/livia.jpg" 
                alt="Livia Bernardi" 
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-2xl font-bold text-cep-primary mb-2">Livia Bernardi</h3>
              <p className="text-lg text-gray-600 mb-4">Fundadora de Aboras Obediencia</p>
              <p className="text-gray-700">
                Profesional en activo con amplia experiencia docente en el sector del adiestramiento canino. 
                Especialista en técnicas de modificación de conducta y educación canina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles del curso */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-cep-primary mb-12 text-center">Detalles del Curso</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Modalidad y horarios</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Users className="w-5 h-5 text-cep-primary mr-3" />
                    <span>Clases presenciales en grupos reducidos</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-5 h-5 text-cep-primary mr-3" />
                    <span>1 día por semana - 3 horas por sesión</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="w-5 h-5 text-cep-primary mr-3" />
                    <span>25 sesiones - 6 meses de duración</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="w-5 h-5 text-cep-primary mr-3" />
                    <span>Agencia de colocación oficial</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-cep-primary mb-4">Precio e inscripción</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cep-primary mb-2">510€</div>
                  <p className="text-gray-600 mb-4">6 cuotas de 85€ + 150€ matrícula</p>
                  <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Requisitos:</strong> Acceso con 2º de la ESO o EGB
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Modalidad presencial / online (consultar disponibilidad)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-cep-primary">¡No te quedes fuera!</h2>
          
          {/* Mensaje de urgencia previo */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🎯 ¡Reserva ahora tu plaza y paga después!
            </p>
            <p className="text-gray-700">
              No pierdas tu lugar: <strong className="text-cep-primary">quedan pocas plazas disponibles</strong>
            </p>
          </div>
          
          <p className="text-xl mb-8 text-gray-700">Reserva ahora mismo tu plaza y asegura tu futuro profesional</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-colors shadow-lg transform hover:scale-105"
          >
            RESERVAR MI PLAZA AHORA
          </button>
          <p className="text-sm mt-4 text-gray-600">
            ¡Los cursos empiezan en septiembre! Contacto en menos de 30 minutos
          </p>
        </div>
      </section>

      {/* Modal de inscripción */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              {/* Mensaje de bienvenida optimizado */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cep-primary to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐕</span>
                </div>
                <h3 className="text-3xl font-bold text-cep-primary mb-3">¡Estás a un paso!</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    🎯 ¡Estás a un paso de asegurar tu plaza en el curso de Adiestramiento Canino!
                  </p>
                  <p className="text-gray-700">
                    Completa tus datos y nos pondremos en contacto contigo.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-lg"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-lg"
                      placeholder="922 000 000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-lg"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sede preferida *
                  </label>
                  <select
                    name="sede"
                    required
                    value={formData.sede}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-lg"
                  >
                    <option value="">Seleccionar sede</option>
                    <option value="CEP NORTE">CEP NORTE - La Orotava</option>
                    <option value="CEP SANTA CRUZ">CEP SANTA CRUZ</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comentarios adicionales (opcional)
                  </label>
                  <textarea
                    name="comentarios"
                    rows={3}
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary transition-colors text-lg"
                    placeholder="¿Tienes alguna pregunta específica sobre el curso?"
                  />
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Protección de datos:</strong> Al enviar este formulario aceptas que CEP Formación se ponga en contacto contigo 
                    para informarte sobre el curso. Tus datos serán tratados conforme a nuestra política de privacidad.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cep-primary to-pink-600 text-white rounded-lg hover:from-cep-primary-dark hover:to-pink-700 transition-all transform hover:scale-105 font-bold text-lg shadow-lg"
                  >
                    RESERVAR MI PLAZA AHORA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <CepFooter />
    </div>
  );
};

export default AdiestramientoCanino; 