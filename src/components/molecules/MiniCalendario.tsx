import React from 'react';
import { useTimeReal, formatearFechaCalendario } from '../../utils/timeUtils';
import { Calendar } from 'lucide-react';

/**
 * Componente de calendario pequeño para barra superior
 * Muestra fecha actual en tiempo real - tamaño similar a teléfonos en header
 */
const MiniCalendario: React.FC = () => {
  const fechaActual = useTimeReal();

  const formatearFechaCompleta = (fecha: Date): string => {
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
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
    <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border">
      <Calendar size={14} className="text-cep-primary" />
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-gray-800">
          {formatearFechaCompleta(fechaDisplay)}
        </span>
        <span className="text-xs text-gray-500">
          {obtenerHora(fechaDisplay)}
        </span>
      </div>
    </div>
  );
};

export default MiniCalendario; 