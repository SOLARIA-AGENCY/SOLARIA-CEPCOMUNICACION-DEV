import React from 'react';
import SedeCard from '../molecules/SedeCard';

const SedeSelector: React.FC = () => {
  const sedes = [
    {
      nombre: 'Norte',
      slug: 'cep-norte',
      imagen: '/images/sedes/sede-cep-norte.png',
      descripcion: 'Campus situado en la zona norte de Tenerife, ofreciendo formación especializada en un entorno moderno y accesible.'
    },
    {
      nombre: 'Santa Cruz',
      slug: 'cep-santa-cruz',
      imagen: '/images/sedes/sede-cep-santa-cruz.png',
      descripcion: 'Campus principal en Santa Cruz de Tenerife, con instalaciones de vanguardia y excelente conectividad.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cep-primary mb-4">
            Cursos por Sede
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona una sede para ver los cursos disponibles organizados por fechas de inicio
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sedes.map((sede) => (
            <SedeCard
              key={sede.slug}
              nombre={sede.nombre}
              slug={sede.slug}
              imagen={sede.imagen}
              descripcion={sede.descripcion}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Ambas sedes ofrecen la misma calidad formativa con horarios adaptados a cada zona
          </p>
        </div>
      </div>
    </section>
  );
};

export default SedeSelector; 