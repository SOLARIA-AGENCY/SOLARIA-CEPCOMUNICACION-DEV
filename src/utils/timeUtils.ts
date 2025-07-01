// Utilidades de tiempo para sistema de colores de etiquetas de cursos
import type { CursoMaestro } from '../config/cursos-maestro';

export interface FechaInfo {
  fecha: Date;
  mes: string;
  año: number;
  esEsteAño: boolean;
}

export interface ColorTag {
  text: string;
  color: string;
  esCiclo?: boolean;
}

// Detección de entorno de tests
const isTestEnvironment = () => {
  return typeof window === 'undefined' || 
         process.env.NODE_ENV === 'test' || 
         typeof global !== 'undefined' && Object.hasOwnProperty.call(global, '__vitest__');
};

// Obtener fecha actual desde API de tiempo real
export const getFechaActual = async (): Promise<Date> => {
  // En tests, usar fecha fija
  if (isTestEnvironment()) {
    return new Date('2025-07-01T13:43:00.000Z'); // 1 julio 2025 para tests consistentes
  }

  try {
    // Usar API pública de tiempo para mayor precisión en producción
    const response = await fetch('https://worldtimeapi.org/api/timezone/Atlantic/Canary');
    if (response.ok) {
      const data = await response.json();
      return new Date(data.datetime);
    }
  } catch (error) {
    console.warn('Error obteniendo tiempo real, usando fecha local:', error);
  }
  
  // Fallback a fecha local
  return new Date();
};

// Obtener fecha actual síncrona (para renderizado inicial)
export const getFechaActualSync = (): Date => {
  // En tests, usar fecha fija
  if (isTestEnvironment()) {
    return new Date('2025-07-01T13:43:00.000Z'); // 1 julio 2025 para tests consistentes
  }
  
  return new Date();
};

// Parsear fecha de texto de curso (ej: "Julio 2025", "Septiembre 2025")
export const parsearFechaCurso = (fechaTexto: string): Date | null => {
  const meses = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
    'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
    'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };

  const texto = fechaTexto.toLowerCase().trim();
  const palabras = texto.split(' ');
  
  if (palabras.length < 2) return null;
  
  const mesTexto = palabras[0];
  const añoTexto = palabras[1];
  
  const mes = meses[mesTexto as keyof typeof meses];
  const año = parseInt(añoTexto);
  
  if (mes === undefined || isNaN(año)) return null;
  
  // Usar día 15 del mes como referencia estándar
  return new Date(año, mes, 15);
};

// Calcular diferencia en meses entre dos fechas
export const calcularMesesDiferencia = (fechaActual: Date, fechaCurso: Date): number => {
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth();
  
  const añoCurso = fechaCurso.getFullYear();
  const mesCurso = fechaCurso.getMonth();
  
  return (añoCurso - añoActual) * 12 + (mesCurso - mesActual);
};

// Determinar color de etiqueta según proximidad temporal
export const determinarColorEtiqueta = (
  fechaInicio: string | undefined, 
  esCiclo: boolean = false,
  fechaActual?: Date
): ColorTag => {
  // Ciclos siempre azul
  if (esCiclo) {
    const texto = fechaInicio ? fechaInicio.toUpperCase() : 'CICLO FORMATIVO';
    return { text: texto, color: 'bg-blue-500', esCiclo: true };
  }

  // Sin fecha = próximamente en gris
  if (!fechaInicio) {
    return { text: 'PRÓXIMAMENTE', color: 'bg-gray-500' };
  }

  const ahora = fechaActual || getFechaActualSync();
  const fechaCurso = parsearFechaCurso(fechaInicio);
  
  if (!fechaCurso) {
    return { text: fechaInicio.toUpperCase(), color: 'bg-purple-500' };
  }

  const mesesDiferencia = calcularMesesDiferencia(ahora, fechaCurso);
  
  // Lógica de colores según proximidad
  if (mesesDiferencia <= 1) {
    // Este mes o próximo mes = NARANJA (urgente)
    return { text: fechaInicio.toUpperCase(), color: 'bg-orange-500' };
  } else if (mesesDiferencia >= 2) {
    // 2 meses o más = VERDE (planificación)
    return { text: fechaInicio.toUpperCase(), color: 'bg-green-500' };
  } else {
    // Caso edge = morado
    return { text: fechaInicio.toUpperCase(), color: 'bg-purple-500' };
  }
};



/**
 * Ordena los cursos por fecha de inicio de la forma más simple y directa:
 * 1. Cursos con fecha, del más cercano al más lejano.
 * 2. Cursos sin fecha ('Próximamente').
 * 3. Ciclos formativos.
 */
export const ordenarCursosPorPrioridad = (cursos: CursoMaestro[]): CursoMaestro[] => {
  const getScore = (curso: CursoMaestro): number => {
    // Prioridad 1: Cursos con fecha de inicio (van primero).
    if (curso.inicio && curso.categoria !== 'ciclos') {
      return 1;
    }
    // Prioridad 2: Cursos sin fecha de inicio ('Próximamente').
    if (!curso.inicio && curso.categoria !== 'ciclos') {
      return 2;
    }
    // Prioridad 3: Ciclos formativos (van al final).
    if (curso.categoria === 'ciclos') {
      return 3;
    }
    return 4; // Fallback
  };

  return [...cursos].sort((a, b) => {
    const scoreA = getScore(a);
    const scoreB = getScore(b);

    // Si las prioridades son diferentes, ordenar por prioridad.
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }

    // Si ambos son cursos con fecha, ordenar por la más cercana.
    if (a.inicio && b.inicio) {
      const fechaA = parsearFechaCurso(a.inicio);
      const fechaB = parsearFechaCurso(b.inicio);

      // Si alguna fecha es inválida, no cambiar el orden.
      if (!fechaA || !fechaB) {
        return 0;
      }
      
      // Ordenar de más cercano a más lejano.
      return fechaA.getTime() - fechaB.getTime();
    }

    // Si ambos son 'Próximamente' o ambos son 'Ciclos', mantener su orden relativo.
    return 0;
  });
};

// Formatear fecha para display en calendario
export const formatearFechaCalendario = (fecha: Date): string => {
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};

// Importar React para el hook
import { useState, useEffect } from 'react';

// Hook personalizado para tiempo real (para React)
export const useTimeReal = () => {
  const [fechaActual, setFechaActual] = useState<Date>(getFechaActualSync());

  useEffect(() => {
    // En tests, no iniciar timers
    if (isTestEnvironment()) {
      return;
    }

    // Actualizar fecha cada minuto en producción
    const interval = setInterval(async () => {
      const nuevaFecha = await getFechaActual();
      setFechaActual(nuevaFecha);
    }, 60000); // 1 minuto

    // Obtener fecha real al montar componente
    getFechaActual().then(setFechaActual);

    // Cleanup del timer
    return () => {
      clearInterval(interval);
    };
  }, []);

  return fechaActual;
}; 