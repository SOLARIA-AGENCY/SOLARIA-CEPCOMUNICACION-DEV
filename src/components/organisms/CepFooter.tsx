import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import NewsletterSection from './NewsletterSection';

const CepFooter: React.FC = () => {
  return (
    <>
      <NewsletterSection />
      <footer className="bg-white text-gray-700 border-t border-gray-200">
        {/* Contact Section */}
        <div className="bg-gray-50 text-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">¿NECESITAS MÁS INFORMACIÓN?</h2>
              <button className="bg-cep-primary text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-pink-700">
                CONTÁCTANOS
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Logo CEP Formación a la izquierda */}
              <div className="flex flex-col items-center lg:items-start">
                <img 
                  src="/images/logos/logotipo-300x95.jpg" 
                  alt="CEP Formación" 
                  className="h-16 w-auto mb-4"
                />
                <p className="text-gray-600 font-medium text-center lg:text-left">© 2025 CEP FORMACIÓN S.L.</p>
              </div>

              {/* Sedes */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 text-center lg:text-left">SEDES</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Santa Cruz:</h4>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 mt-1 text-cep-primary" />
                      <p className="text-gray-700">
                        Santa Cruz de Tenerife (38005) Plaza José Antonio Barrios Olivero Bajo Estadio Heliodoro
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Norte:</h4>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 mt-1 text-cep-primary" />
                      <p className="text-gray-700">
                        C.C El Tompo – Última planta – La Orotava
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 text-center lg:text-left">INFORMACIÓN DE CONTACTO</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cep-primary" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Teléfono:</h4>
                      <p className="text-gray-700">922 21 92 57</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cep-primary" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Correo electrónico:</h4>
                      <p className="text-gray-700">info@cursostenerife.es</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-cep-primary" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Horario:</h4>
                      <p className="text-gray-700">Lunes a viernes 10 a 14hs. – 16 a 20hs.</p>
                    </div>
                  </div>
                </div>
              </div>
               {/* Logos de Certificaciones */}
              <div className="flex flex-col items-center lg:items-start space-y-4">
                 <img 
                  src="/images/logos/logo-certificaciones.jpg" 
                  alt="Logos de certificaciones de calidad" 
                  className="w-3/4 h-auto mx-auto lg:mx-0"
                />
                <img 
                  src="/images/logos/logo-fondo-europeo.jpg" 
                  alt="Logo del Fondo Social Europeo" 
                  className="w-3/4 h-auto mx-auto lg:mx-0"
                />
                <img 
                  src="/images/logos/logo-sce.jpg" 
                  alt="Logo del Servicio Canario de Empleo" 
                  className="w-3/4 h-auto mx-auto lg:mx-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-white py-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Social Links */}
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <a href="https://www.facebook.com/cepsantacruz/" className="text-gray-500 hover:text-cep-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/cep_formacion/" className="text-gray-500 hover:text-cep-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-cep-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a href="/aviso-legal" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Aviso Legal
                </a>
                <a href="/politica-privacidad" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Privacidad
                </a>
                 <a href="/proteccion-datos" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Protección de Datos
                </a>
                <a href="/politica-cookies" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CepFooter; 