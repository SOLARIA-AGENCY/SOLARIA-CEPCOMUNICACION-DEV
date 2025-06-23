import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, MessageCircle } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

interface ContactForm {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  sede: string;
  curso: string;
  situacion: string;
  mensaje: string;
  acepto_privacidad: boolean;
  acepto_promociones: boolean;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    sede: '',
    curso: '',
    situacion: '',
    mensaje: '',
    acepto_privacidad: false,
    acepto_promociones: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const cursos = [
    "TÉCNICO EN SOFTWARE OFIMÁTICO",
    "PROCEDIMIENTOS BÁSICOS EN MARKETING DIGITAL Y REDES SOCIALES",
    "INGLÉS B2",
    "COMPETENCIAS DIGITALES BÁSICAS",
    "COMPETENCIAS DIGITALES AVANZADAS",
    "ALEMÁN A1",
    "ASISTENCIA EN LA GESTIÓN DE PROCEDIMIENTOS TRIBUTARIOS",
    "GESTIÓN INTEGRADA DE RECURSOS HUMANOS",
    "HUELLA DE CARBONO DE PRODUCTO Y ORGANIZACIÓN",
    "ADIESTRAMIENTO CANINO",
    "AUXILIAR DE FARMACIA",
    "AUXILIAR DE VETERINARIA",
    "MEDICINA ESTÉTICA",
    "OTROS - ESPECIFICAR EN MENSAJE"
  ];

  const situaciones = [
    "DESEMPLEADO/A",
    "OCUPADO/A",
    "AUTÓNOMO/A",
    "ESTUDIANTE",
    "OTROS"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
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
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu consulta! Te contactaremos pronto.');
    
    // Reset form
    setFormData({
      nombre: '',
      apellidos: '',
      telefono: '',
      email: '',
      sede: '',
      curso: '',
      situacion: '',
      mensaje: '',
      acepto_privacidad: false,
      acepto_promociones: false
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <CepHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CONTACTO
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta sobre nuestros cursos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Formulario de Contacto */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Solicita información
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      required
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tu teléfono"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sede" className="block text-sm font-medium text-gray-700 mb-2">
                    Sede de preferencia
                  </label>
                  <select
                    id="sede"
                    name="sede"
                    value={formData.sede}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecciona una sede</option>
                    <option value="SANTA CRUZ">Santa Cruz de Tenerife</option>
                    <option value="NORTE">Norte - La Orotava</option>
                    <option value="SIN_PREFERENCIA">Sin preferencia</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="curso" className="block text-sm font-medium text-gray-700 mb-2">
                    Curso de interés
                  </label>
                  <select
                    id="curso"
                    name="curso"
                    value={formData.curso}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((curso, index) => (
                      <option key={index} value={curso}>
                        {curso}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="situacion" className="block text-sm font-medium text-gray-700 mb-2">
                    Situación laboral
                  </label>
                  <select
                    id="situacion"
                    name="situacion"
                    value={formData.situacion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecciona tu situación</option>
                    {situaciones.map((situacion, index) => (
                      <option key={index} value={situacion}>
                        {situacion}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>

                {/* Checkboxes RGPD */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acepto_privacidad"
                      name="acepto_privacidad"
                      required
                      checked={formData.acepto_privacidad}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="acepto_privacidad" className="ml-3 text-sm text-gray-600">
                      Acepto la <a href="#" className="text-blue-600 hover:underline">política de privacidad</a> y 
                      el tratamiento de mis datos personales. *
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="acepto_promociones"
                      name="acepto_promociones"
                      checked={formData.acepto_promociones}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="acepto_promociones" className="ml-3 text-sm text-gray-600">
                      Acepto recibir comunicaciones promocionales y ofertas especiales.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar consulta
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-8">
              
              {/* Sede Santa Cruz */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  Sede Santa Cruz
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-400" />
                    <span>Santa Cruz de Tenerife (38005)<br />
                    Plaza José Antonio Barrios Olivero<br />
                    Bajo Estadio Heliodoro</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>922 21 92 57</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>info@cursostenerife.es</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Lunes a viernes: 10:00 - 14:00 y 16:00 - 20:00</span>
                  </p>
                </div>
                
                {/* Mapa placeholder */}
                <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Mapa de Google - Sede Santa Cruz</span>
                </div>
              </div>

              {/* Sede Norte */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  Sede Norte
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-400" />
                    <span>C.C El Tompo – Última planta<br />
                    La Orotava, Santa Cruz de Tenerife</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>922 21 92 57</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>info@cursostenerife.es</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Lunes a viernes: 10:00 - 14:00 y 16:00 - 20:00</span>
                  </p>
                </div>
                
                {/* Mapa placeholder */}
                <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Mapa de Google - Sede Norte</span>
                </div>
              </div>

              {/* Contacto Rápido */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Contacto Rápido
                </h3>
                <p className="text-blue-700 mb-4">
                  ¿Tienes una consulta urgente? Contáctanos directamente:
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:922219257" 
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    922 21 92 57
                  </a>
                  <a 
                    href="mailto:info@cursostenerife.es" 
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    info@cursostenerife.es
                  </a>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm text-blue-600">
                    Respuesta garantizada en menos de 24 horas laborables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para empezar tu formación?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            No esperes más. Ponte en contacto con nosotros y comienza a construir tu futuro profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:922219257"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar ahora
            </a>
            <a 
              href="#formulario"
              className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </section>

      <CepFooter />
    </div>
  );
};

export default ContactPage; 