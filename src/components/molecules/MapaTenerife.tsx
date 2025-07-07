import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Configurar iconos de Leaflet de manera más robusta
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Coordenadas de las sedes (más precisas)
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
    colorHex: '#2563eb',
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
    colorHex: '#db2777',
    enlace: '/sede/cep-santa-cruz'
  }
];

// Icono personalizado para los marcadores más robusto
const createCustomIcon = (colorHex: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${colorHex};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
          font-family: system-ui, -apple-system, sans-serif;
        ">CEP</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const MapaTenerife: React.FC = () => {
  // Centro de Tenerife (punto medio entre las dos sedes)
  const centroTenerife: [number, number] = [28.4742, -16.2859];

  // Ensure the map container has proper styling on mount
  useEffect(() => {
    // Pequeño hack para asegurar que Leaflet se inicializa correctamente
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  return (
    <div className="relative">
      {/* Título del Mapa */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-gray-900">
          Localización de Nuestras Sedes
        </h3>
        <p className="text-gray-600">
          Haz clic en los marcadores para más información
        </p>
      </div>
      
      {/* Container del Mapa con estilos mejorados */}
      <div 
        className="rounded-xl shadow-lg overflow-hidden border border-gray-200"
        style={{ height: '500px', width: '100%' }}
      >
        <MapContainer
          center={centroTenerife}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          doubleClickZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {sedes.map((sede) => (
            <Marker
              key={sede.id}
              position={sede.posicion}
              icon={createCustomIcon(sede.colorHex)}
            >
              <Popup
                maxWidth={320}
                className="custom-popup"
                closeButton={true}
              >
                <div className="p-3 min-w-[280px]">
                  {/* Header con imagen */}
                  <div className="relative mb-4">
                    <img 
                      src={sede.imagen}
                      alt={sede.nombre}
                      className="w-full h-28 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className={`absolute top-2 left-2 ${sede.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
                      {sede.id === 'cep-norte' ? 'NORTE' : 'SANTA CRUZ'}
                    </div>
                  </div>

                  {/* Información */}
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    {sede.nombre}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div dangerouslySetInnerHTML={{ __html: sede.direccion }} className="text-gray-700" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700">{sede.telefono}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700">{sede.horario}</span>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <a
                      href={sede.enlace}
                      className={`w-full ${sede.color} hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium text-center block transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg`}
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
      </div>
      
      {/* Leyenda mejorada */}
      <div className="absolute top-8 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] border border-gray-200">
        <h4 className="font-bold text-gray-900 text-sm mb-3">Sedes CEP Formación</h4>
        <div className="space-y-2">
          {sedes.map((sede) => (
            <div key={sede.id} className="flex items-center space-x-3 text-xs">
              <div 
                className={`w-3 h-3 rounded-full ${sede.color} shadow-sm`}
              ></div>
              <span className="text-gray-700 font-medium">
                {sede.id === 'cep-norte' ? 'La Laguna (Norte)' : 'Santa Cruz'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          <strong>📞 Teléfono único:</strong> 922 219 257 |{' '}
          <strong>📧 Email:</strong> info@cepformacion.com
        </p>
      </div>
    </div>
  );
};

export default MapaTenerife; 