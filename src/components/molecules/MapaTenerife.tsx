import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de las sedes
const sedes = [
  {
    id: 'cep-norte',
    nombre: 'CEP Norte - La Laguna',
    posicion: [28.4848, -16.3199] as [number, number],
    direccion: 'Calle Real, 123<br>38201 San Cristóbal de La Laguna',
    telefono: '922 219 257',
    horario: 'L-V: 10:00-14:00 / 16:00-20:00',
    imagen: '/images/sedes/sede-cep-norte.png',
    color: 'bg-cep-primary',
    enlace: '/sede/cep-norte'
  },
  {
    id: 'cep-santa-cruz',
    nombre: 'CEP Santa Cruz',
    posicion: [28.4636, -16.2518] as [number, number],
    direccion: 'Avenida Tres de Mayo, 456<br>38005 Santa Cruz de Tenerife',
    telefono: '922 219 257',
    horario: 'L-V: 10:00-14:00 / 16:00-20:00',
    imagen: '/images/sedes/sede-cep-santa-cruz.png',
    color: 'bg-pink-600',
    enlace: '/sede/cep-santa-cruz'
  }
];

// Icono personalizado para los marcadores
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${color === 'bg-cep-primary' ? '#2563eb' : '#db2777'};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">CEP</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const MapaTenerife: React.FC = () => {
  // Centro de Tenerife
  const centroTenerife: [number, number] = [28.2916, -16.6291];

  return (
    <div className="relative">
      <MapContainer
        center={centroTenerife}
        zoom={10}
        style={{ height: '500px', width: '100%' }}
        className="rounded-xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sedes.map((sede) => (
          <Marker
            key={sede.id}
            position={sede.posicion}
            icon={createCustomIcon(sede.color)}
          >
            <Popup
              maxWidth={300}
              className="custom-popup"
            >
              <div className="p-2">
                {/* Header con imagen */}
                <div className="relative mb-3">
                  <img 
                    src={sede.imagen}
                    alt={sede.nombre}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className={`absolute top-2 left-2 ${sede.color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                    {sede.id === 'cep-norte' ? 'NORTE' : 'SANTA CRUZ'}
                  </div>
                </div>

                {/* Información */}
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  {sede.nombre}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div dangerouslySetInnerHTML={{ __html: sede.direccion }} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{sede.telefono}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{sede.horario}</span>
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a
                    href={sede.enlace}
                    className={`w-full ${sede.color} text-white px-4 py-2 rounded-lg font-medium text-center block hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2`}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Ver Cursos</span>
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Leyenda */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-bold text-gray-900 text-sm mb-2">Sedes CEP</h4>
        <div className="space-y-2">
          {sedes.map((sede) => (
            <div key={sede.id} className="flex items-center space-x-2 text-xs">
              <div 
                className={`w-3 h-3 rounded-full ${sede.color}`}
              ></div>
              <span className="text-gray-700">
                {sede.id === 'cep-norte' ? 'Norte' : 'Santa Cruz'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapaTenerife; 