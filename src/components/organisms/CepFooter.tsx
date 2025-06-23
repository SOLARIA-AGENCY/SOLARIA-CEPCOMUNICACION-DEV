import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const CepFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t">
      {/* Contact Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">¿NECESITAS MÁS INFORMACIÓN?</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              CONTÁCTANOS
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sedes */}
            <div>
              <h3 className="text-xl font-bold mb-6">SEDES</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Santa Cruz:</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 text-blue-300" />
                    <p className="text-blue-100">
                      Santa Cruz de Tenerife (38005) Plaza José Antonio Barrios Olivero Bajo Estadio Heliodoro
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Norte:</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 text-blue-300" />
                    <p className="text-blue-100">
                      C.C El Tompo – Última planta – La Orotava
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-xl font-bold mb-6">INFORMACIÓN DE CONTACTO</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <div>
                    <h4 className="font-semibold">Teléfono:</h4>
                    <p className="text-blue-100">922 21 92 57</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-300" />
                  <div>
                    <h4 className="font-semibold">Correo electrónico:</h4>
                    <p className="text-blue-100">info@cursostenerife.es</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <div>
                    <h4 className="font-semibold">Horario:</h4>
                    <p className="text-blue-100">Lunes a viernes 10 a 14hs. – 16 a 20hs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-600">CEP Formación - Cursos Tenerife © 2025</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Transparencia
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Calidad
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Aviso Legal
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Notice */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="mb-2 sm:mb-0">
              Utilizamos cookies para ofrecerte la mejor experiencia en nuestro sitio web.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors">
                ACEPTAR COOKIES
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors">
                RECHAZAR COOKIES
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
                AJUSTES
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CepFooter; 