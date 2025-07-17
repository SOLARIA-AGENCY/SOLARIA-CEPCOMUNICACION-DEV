import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import MiniCalendario from '../molecules/MiniCalendario';

const CepHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-cep-primary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>TELÉFONO: 922 219 257</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>HORARIO: Lunes a viernes 10 a 14 - 16 a 20</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mini Calendario en tiempo real */}
              <MiniCalendario />
              
              {/* Redes Sociales */}
              <div className="flex items-center space-x-3">
                <a href="https://www.facebook.com/cepsantacruz/" className="hover:text-pink-200 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/cep_formacion/" className="hover:text-pink-200 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-pink-200 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logos/logotipo-300x95.jpg" 
                alt="CEP Formación" 
                className="h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                INICIO
              </Link>
              <div className="relative group">
                <Link 
                  to="/cursos" 
                  className="text-gray-700 hover:text-cep-primary font-medium transition-colors flex items-center"
                >
                  CURSOS
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link 
                    to="/cursos" 
                    className="block px-4 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 transition-colors"
                  >
                    Cursos Privados
                  </Link>
                  <Link 
                    to="/cursos-ocupados" 
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  >
                    Trabajadores Ocupados
                  </Link>
                  <Link 
                    to="/cursos-desempleados" 
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Trabajadores Desempleados
                  </Link>
                </div>
              </div>
              <Link 
                to="/ciclos" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                CICLOS
              </Link>
              <Link 
                to="/sedes" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                SEDES
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                BLOG
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                FAQ
              </Link>
              <Link 
                to="/quienes-somos" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                QUIENES SOMOS
              </Link>
              <Link 
                to="/contacto" 
                className="text-gray-700 hover:text-cep-primary font-medium transition-colors"
              >
                CONTACTO
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-cep-primary hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  INICIO
                </Link>
                <Link
                  to="/cursos"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CURSOS
                </Link>
                <Link
                  to="/ciclos"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CICLOS
                </Link>
                <Link
                  to="/cursos-ocupados"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  OCUPADOS
                </Link>
                <Link
                  to="/cursos-desempleados"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DESEMPLEADOS
                </Link>
                <Link
                  to="/sedes"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SEDES
                </Link>
                <Link
                  to="/blog"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link>
                <Link
                  to="/faq"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  to="/quienes-somos"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  QUIENES SOMOS
                </Link>
                <Link
                  to="/contacto"
                  className="block px-3 py-2 text-gray-700 hover:text-cep-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACTO
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default CepHeader; 