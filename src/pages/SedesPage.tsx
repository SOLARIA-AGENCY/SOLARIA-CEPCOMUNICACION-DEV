import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Mail, Bus, Building } from 'lucide-react';

const SedesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Nuestras Sedes - CEP Formación Tenerife</title>
        <meta 
          name="description" 
          content="Descubre nuestras dos sedes en Tenerife: CEP Norte (La Laguna) y CEP Santa Cruz. Instalaciones modernas y ubicaciones estratégicas para tu formación profesional." 
        />
        <meta name="keywords" content="sedes CEP, La Laguna, Santa Cruz, Tenerife, centros formación, instalaciones" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cep-primary to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nuestras Sedes
              </h1>
              <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
                Dos ubicaciones estratégicas en Tenerife para brindarte la mejor formación profesional
              </p>
            </div>
          </div>
        </div>

        {/* Sedes Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* CEP Norte */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/sedes/cep-norte.jpg" 
                    alt="Sede CEP Norte - La Laguna"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-cep-primary text-white px-4 py-2 rounded-full font-bold">
                    CEP NORTE
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sede La Laguna
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-cep-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Dirección</p>
                        <p className="text-gray-600">Calle Real, 123<br />38201 San Cristóbal de La Laguna</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-cep-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">922 219 257</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-cep-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">info@cepformacion.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-cep-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Horario</p>
                        <p className="text-gray-600">Lunes a Viernes: 10:00 - 14:00 / 16:00 - 20:00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instalaciones */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building className="w-5 h-5 text-cep-primary mr-2" />
                      Instalaciones
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>5 Aulas equipadas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>Laboratorio</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>Sala de prácticas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>WiFi gratuito</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>Parking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cep-primary rounded-full"></div>
                        <span>Cafetería</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transporte */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Bus className="w-4 h-4 text-cep-primary mr-2" />
                      Transporte Público
                    </h4>
                    <p className="text-sm text-gray-600">
                      Líneas: 014, 015, 102, 107 | Parada: Plaza del Adelantado
                    </p>
                  </div>
                </div>
              </div>

              {/* CEP Santa Cruz */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                  <img 
                    src="/images/sedes/cep-santa-cruz.jpg" 
                    alt="Sede CEP Santa Cruz"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pink-600 text-white px-4 py-2 rounded-full font-bold">
                    CEP SANTA CRUZ
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sede Santa Cruz
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Dirección</p>
                        <p className="text-gray-600">Avenida Tres de Mayo, 456<br />38005 Santa Cruz de Tenerife</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">922 219 257</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">info@cepformacion.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Horario</p>
                        <p className="text-gray-600">Lunes a Viernes: 10:00 - 14:00 / 16:00 - 20:00</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instalaciones */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building className="w-5 h-5 text-pink-600 mr-2" />
                      Instalaciones
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>4 Aulas equipadas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>Laboratorio</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>Sala de prácticas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>WiFi gratuito</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>Parking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                        <span>Zona de descanso</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transporte */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Bus className="w-4 h-4 text-pink-600 mr-2" />
                      Transporte Público
                    </h4>
                    <p className="text-sm text-gray-600">
                      Líneas: 910, 920, 934, 940 | Parada: Tres de Mayo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mapa Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ubicaciones en el Mapa
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Encuentra fácilmente nuestras sedes y planifica tu visita
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-cep-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Mapa Interactivo
                    </p>
                    <p className="text-gray-600">
                      Próximamente disponible con direcciones exactas y rutas optimizadas
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-cep-primary to-pink-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  ¿Listo para visitarnos?
                </h2>
                <p className="text-xl mb-8 text-pink-100">
                  Ven a conocer nuestras instalaciones y descubre por qué somos la mejor opción para tu formación
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:922219257"
                    className="bg-white text-cep-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Llámanos: 922 219 257
                  </a>
                  <a
                    href="mailto:info@cepformacion.com"
                    className="bg-pink-700 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-800 transition-colors inline-flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Envíanos un email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SedesPage; 