import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/images/logos/prilabsa-logo.png" 
              alt="PRILABSA" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#inicio" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              INICIO
            </a>
            <a 
              href="#quienes-somos" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              QUIENES SOMOS
            </a>
            <a 
              href="#oficinas" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              OFICINAS
            </a>
            <a 
              href="#productos" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              PRODUCTOS
            </a>
            <div className="relative group">
              <a 
                href="#contactanos" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                CONTÁCTANOS
              </a>
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a 
                  href="#trabaja-con-nosotros" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  TRABAJA CON NOSOTROS
                </a>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#inicio" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                INICIO
              </a>
              <a href="#quienes-somos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                QUIENES SOMOS
              </a>
              <a href="#oficinas" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                OFICINAS
              </a>
              <a href="#productos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                PRODUCTOS
              </a>
              <a href="#contactanos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                CONTÁCTANOS
              </a>
              <a href="#trabaja-con-nosotros" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-blue-600 ml-4">
                TRABAJA CON NOSOTROS
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 