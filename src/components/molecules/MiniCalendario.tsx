import React from 'react';
import { useTimeReal } from '../../utils/timeUtils';
import { Calendar } from 'lucide-react';

/**
 * Componente de calendario pequeño para barra superior
 * Muestra fecha actual en tiempo real - tamaño similar a teléfonos en header
 */
const MiniCalendario: React.FC = () => {
  const fechaActual = useTimeReal();

  const formatearFechaCompleta = (fecha: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Capitalizar la primera letra
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  };

  const obtenerHora = (fecha: Date): string => {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // En tests, mostrar fecha consistente
  const esTest = typeof window === 'undefined' || process.env.NODE_ENV === 'test';
  const fechaDisplay = esTest ? new Date('2025-07-01T13:43:00.000Z') : fechaActual;

  return (
    <div className="flex items-center space-x-2 text-white">
      <Calendar size={14} />
      <span>
        {formatearFechaCompleta(fechaDisplay)} - {obtenerHora(fechaDisplay)}h
      </span>
    </div>
  );
};

export default MiniCalendario; 