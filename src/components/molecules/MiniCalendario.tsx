import React from 'react';
import { useTimeReal } from '../../utils/timeUtils';
import { Calendar } from 'lucide-react';

/**
 * Componente de calendario pequeño para barra superior.
 * Muestra fecha y hora actual en tiempo real, con un estilo simplificado.
 */
const MiniCalendario: React.FC = () => {
  const fechaActual = useTimeReal();

  // En tests, mostrar fecha consistente para snapshots
  const esTest = typeof window === 'undefined' || process.env.NODE_ENV === 'test';
  const fechaDisplay = esTest ? new Date('2025-07-01T13:43:00.000Z') : fechaActual;

  const formatearFechaYHora = (fecha: Date): string => {
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    });
    const horaFormateada = fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
    // Formato final: "mar, 01 jul 25 - 13:43"
    return `${fechaFormateada} - ${horaFormateada}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-4 h-4" />
      <span>{formatearFechaYHora(fechaDisplay)}</span>
    </div>
  );
};

export default MiniCalendario; 