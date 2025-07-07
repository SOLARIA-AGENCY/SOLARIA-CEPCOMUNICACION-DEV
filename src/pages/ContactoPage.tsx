import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const ContactoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    tipoFormacion: '',
    cursoInteres: '',
    mensaje: '',
    aceptaPrivacidad: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll al top cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaPrivacidad) {
      alert('Debes aceptar la política de privacidad para enviar el formulario.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar a info@cursostenerife.es usando el endpoint existente
      const response = await fetch('/api/resend-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'info@cursostenerife.es',
          subject: `Nueva consulta desde formulario de contacto - ${formData.tipoFormacion}`,
          html: `
            <h2>Nueva consulta de contacto</h2>
            <p><strong>Nombre:</strong> ${formData.nombre} ${formData.apellidos}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.telefono}</p>
            <p><strong>Tipo de formación:</strong> ${formData.tipoFormacion}</p>
            <p><strong>Curso de interés:</strong> ${formData.cursoInteres}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${formData.mensaje}</p>
          `
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          tipoFormacion: '',
          cursoInteres: '',
          mensaje: '',
          aceptaPrivacidad: false
        });
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al enviar tu consulta. Por favor, inténtalo de nuevo o contáctanos directamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cursosDesempleados = [
    'Control y Formación en Consumo',
    'Atención al Cliente: consumidor o usuario',
    'Gestión Ambiental',
    'Gestión de Servicios para el control de organismos nocivos',
    'Atención al Alumnado con necesidades educativas especiales',
    'Inserción laboral de personas con discapacidad',
    'Asistencia en la gestión de procedimientos tributarios',
    'Seguridad Informática',
    'Gestión Integrada de Recursos Humanos',
    'Alemán B2'
  ];

  const cursosPrivados = [
    'Adiestramiento Canino I',
    'Adiestramiento Canino II',
    'Auxiliar de Clínicas Estéticas',
    'Auxiliar de Enfermería',
    'Auxiliar de Odontología e Higiene online',
    'Auxiliar de Óptica online',
    'Auxiliar de Veterinaria',
    'Ayudante Técnico de Veterinaria (ATV)',
    'Ciclo de Farmacia y Parafarmacia',
    'Ciclo de Higiene Bucodental',
    'Dermocosmética',
    'Desarrollo de videojuegos',
    'Dietética y Nutrición',
    'Dirección y gestión de Clínicas Dentales',
    'Entrenador personal',
    'Especialista en Cetáceos y Animales Marinos',
    'Farmacia y Parafarmacia',
    'Iluminación en espectáculos',
    'Instructor de yoga',
    'Oratoria Pública y Locución Audiovisual',
    'Peluquería Canina',
    'Quiromasaje – Nivel 1',
    'Quiromasaje – Nivel 2',
    'Tanatoestética y Tanatopraxia presencial',
    'Técnico Veterinario en Felinos'
  ];

  const cursosOcupados = [
    'Cocina vegetariana en restauración',
    'Cocina vegetal y cocina especial con intolerancias',
    'Ecoturismo',
    'Confianza y seguridad en los establecimientos de restauración',
    'Cocina básica',
    'Cocina creativa y de autor',
    'Corte y cata de jamón',
    'Evolución de las tecnologías y técnicas culinarias',
    'Organización de caterings y eventos',
    'Cocina italiana',
    'Manipulador de alimentos y seguridad alimentaria',
    'Cocina para celíacos',
    'Gestión en restauración y diseño en proceso de servicio',
    'Elaboración de cafés y cartas de café en restauración',
    'Inglés en restauración',
    'Elaboración de helados y sorbetes en restauración',
    'Innovación en la cocina',
    'Gestión del bar - cafetería',
    'Comercialización de productos turísticos',
    'Animación turística',
    'Inglés profesional para el turismo'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CepHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cep-primary to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl">
              RESPONDEMOS TUS DUDAS
            </h1>
            <p className="text-xl text-white drop-shadow-xl font-medium">
              Estamos aquí para ayudarte a encontrar la formación que necesitas
            </p>
          </div>
        </div>
      </section>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 mx-4">
          <p className="font-bold">¡Mensaje enviado correctamente!</p>
          <p>Hemos recibido tu consulta y nos pondremos en contacto contigo en breve.</p>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    required
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Spain +34
                  </span>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                    placeholder="922 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selecciona una opción *
                </label>
                <select
                  name="tipoFormacion"
                  required
                  value={formData.tipoFormacion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                >
                  <option value="">Selecciona</option>
                  <option value="desempleadas">Cursos para personas desempleadas</option>
                  <option value="ocupadas">Cursos para personas ocupadas</option>
                  <option value="privados">Cursos privados</option>
                </select>
              </div>

              {formData.tipoFormacion && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Curso en el que estoy interesado *
                  </label>
                  <select
                    name="cursoInteres"
                    required
                    value={formData.cursoInteres}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                  >
                    <option value="">Selecciona</option>
                    {formData.tipoFormacion === 'desempleadas' && 
                      cursosDesempleados.map(curso => (
                        <option key={curso} value={curso}>{curso}</option>
                      ))
                    }
                    {formData.tipoFormacion === 'ocupadas' && 
                      cursosOcupados.map(curso => (
                        <option key={curso} value={curso}>{curso}</option>
                      ))
                    }
                    {formData.tipoFormacion === 'privados' && 
                      cursosPrivados.map(curso => (
                        <option key={curso} value={curso}>{curso}</option>
                      ))
                    }
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cep-primary focus:border-cep-primary"
                  placeholder="Escribe tu consulta..."
                />
              </div>

              {/* Política de privacidad */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                <p className="mb-3">
                  Al enviarnos un mensaje a través de este formulario, estás cediéndonos algunos datos tuyos, por lo que nuestra obligación es garantizarte una buena protección de los mismos en cumplimiento con el RGPD. Estas son algunas cosas que debes saber:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Responsables:</strong> Acaten C.B. e Invesgia Nubelia S.L.U.</li>
                  <li>• <strong>Finalidad:</strong> Poder darte una respuesta a tu consulta a través del formulario.</li>
                  <li>• <strong>Legitimación:</strong> Tu consentimiento expreso.</li>
                  <li>• <strong>Destinatarios:</strong> Los datos son guardados en Sered, nuestro proveedor de hosting.</li>
                  <li>• <strong>Derechos:</strong> Tienes derecho a acceder, rectificar, limitar y eliminar tus datos cuando quieras.</li>
                </ul>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="aceptaPrivacidad"
                  checked={formData.aceptaPrivacidad}
                  onChange={handleInputChange}
                  className="mr-3 mt-1"
                  required
                />
                <label className="text-sm text-gray-700">
                  Sí, acepto la <a href="/politica-privacidad" className="text-cep-primary hover:underline">política de privacidad</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cep-primary to-pink-600 text-white py-4 px-6 rounded-lg hover:from-cep-primary-dark hover:to-pink-700 transition-all font-bold text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-cep-primary mb-6">INFORMACIÓN DE CONTACTO</h2>
              
              {/* Sede Santa Cruz */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-cep-primary" />
                  SANTA CRUZ
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3826280119504!2d-16.244443899999995!3d28.4678479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc41cce4f6b35b8d%3A0x872e8fd8d67f14d!2sCEP%20Formaci%C3%B3n%20Santa%20Cruz!5e0!3m2!1ses!2ses!4v1635854874853!5m2!1ses!2ses"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                <div className="flex items-center text-cep-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  <a href="tel:+34922219257" className="hover:underline font-semibold">
                    922 21 92 57
                  </a>
                </div>
              </div>

              {/* Sede Norte */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-cep-primary" />
                  NORTE
                </h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1734043577887!2d-16.541519299999998!3d28.4897423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a9a68b5a3c4cd%3A0x1234567890abcdef!2sCEP%20Norte%20La%20Orotava!5e0!3m2!1ses!2ses!4v1635854874853!5m2!1ses!2ses"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                <div className="flex items-center text-cep-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  <a href="tel:+34922219257" className="hover:underline font-semibold">
                    922 21 92 57
                  </a>
                </div>
              </div>

              {/* Redes sociales */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">REDES SOCIALES</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.facebook.com/cepsantacruz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/cep_santacruz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/user/frandelamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    YouTube
                  </a>
                  <a
                    href="tel:+34618989648"
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:info@cursostenerife.es"
                    className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CepFooter />
    </div>
  );
};

export default ContactoPage; 