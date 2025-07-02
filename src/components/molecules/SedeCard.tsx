import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface SedeCardProps {
  nombre: string;
  slug: string;
  imagen: string;
  descripcion: string;
}

const SedeCard: React.FC<SedeCardProps> = ({ nombre, slug, imagen, descripcion }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/sede-${slug}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={imagen}
          alt={`Campus ${nombre}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
            CEP {nombre.toUpperCase()}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={16} className="mr-1" />
            <span>Campus {nombre}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          {descripcion}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-cep-primary font-semibold">
            Ver cursos disponibles
          </span>
          <ArrowRight 
            size={20} 
            className="text-cep-primary group-hover:translate-x-1 transition-transform duration-300" 
          />
        </div>
      </div>
    </div>
  );
};

export default SedeCard; 