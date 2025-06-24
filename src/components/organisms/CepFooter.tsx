import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const CepFooter: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Contact Section */}
      <div className="bg-cep-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">¿NECESITAS MÁS INFORMACIÓN?</h2>
            <button className="bg-white text-cep-primary px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100">
              CONTÁCTANOS
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sedes */}
            <div>
              <h3 className="text-xl font-bold mb-6">SEDES</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white">Santa Cruz:</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 text-pink-200" />
                    <p className="text-gray-200">
                      Santa Cruz de Tenerife (38005) Plaza José Antonio Barrios Olivero Bajo Estadio Heliodoro
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white">Norte:</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 mt-1 text-pink-200" />
                    <p className="text-gray-200">
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
                  <Phone className="w-5 h-5 text-pink-200" />
                  <div>
                    <h4 className="font-semibold text-white">Teléfono:</h4>
                    <p className="text-gray-200">922 21 92 57</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-pink-200" />
                  <div>
                    <h4 className="font-semibold text-white">Correo electrónico:</h4>
                    <p className="text-gray-200">info@cursostenerife.es</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-pink-200" />
                  <div>
                    <h4 className="font-semibold text-white">Horario:</h4>
                    <p className="text-gray-200">Lunes a viernes 10 a 14hs. – 16 a 20hs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 CEP FORMACIÓN S.L.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="https://www.facebook.com/cepsantacruz/" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cep_formacion/" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="/aviso-legal" className="text-gray-400 hover:text-white transition-colors">
                Aviso Legal
              </a>
              <a href="/politica-privacidad" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </a>
               <a href="/proteccion-datos" className="text-gray-400 hover:text-white transition-colors">
                Protección de Datos
              </a>
              <a href="/politica-cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CepFooter; 