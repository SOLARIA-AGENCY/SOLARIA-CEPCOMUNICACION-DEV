// Utilidades de tiempo para sistema de colores de etiquetas de cursos
import { useState, useEffect } from 'react';
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

// Extraer fecha de puntosClave de un curso
export const extraerFechaDePuntosClave = (curso: CursoMaestro): string | null => {
  if (!curso.descripcionDetallada?.puntosClave) {
    return null;
  }

  // Buscar punto clave que contenga fecha de inicio
  const puntoFecha = curso.descripcionDetallada.puntosClave.find(punto => 
    punto.icono === 'Clock' && punto.texto.toLowerCase().includes('inicio')
  );

  if (!puntoFecha) {
    return null;
  }

  // Extraer fecha del texto usando múltiples patrones
  const textoFecha = puntoFecha.texto;
  
  // Patrón 1: "Inicio DD/MM/YYYY" o "Inicio: DD/MM/YYYY"
  const patronFechaNumerico = /inicio:?\s*(\d{1,2}\/\d{1,2}\/\d{4})/i;
  const matchNumerico = textoFecha.match(patronFechaNumerico);
  
  if (matchNumerico) {
    const fechaStr = matchNumerico[1]; // "13/10/2025"
    const [dia, mes, año] = fechaStr.split('/').map(num => parseInt(num));
    
    // Convertir a formato legible para parsearFechaCurso
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return `${dia} de ${meses[mes - 1]} de ${año}`;
  }

  // Patrón 2: "Inicio Mes YYYY" (ej: "Inicio Septiembre 2025")
  const patronMesAño = /inicio\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(\d{4})/i;
  const matchMesAño = textoFecha.match(patronMesAño);
  
  if (matchMesAño) {
    const mes = matchMesAño[1];
    const año = matchMesAño[2];
    return `${mes} ${año}`;
  }

  // Patrón 3: "Inicio Mes" (ej: "Inicio Septiembre")
  const patronMesSolo = /inicio\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)(?:\s|$|-)/i;
  const matchMesSolo = textoFecha.match(patronMesSolo);
  
  if (matchMesSolo) {
    const mes = matchMesSolo[1];
    // Asumir año actual si no se especifica
    const añoActual = new Date().getFullYear();
    return `${mes} ${añoActual}`;
  }

  // Patrón 4: "Inicio DD/MM/YYYY - Día HH:MM-HH:MMH" (formato completo)
  const patronCompleto = /inicio:?\s*(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*\w+\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}h?/i;
  const matchCompleto = textoFecha.match(patronCompleto);
  
  if (matchCompleto) {
    const fechaStr = matchCompleto[1]; // "29/09/2025"
    const [dia, mes, año] = fechaStr.split('/').map(num => parseInt(num));
    
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return `${dia} de ${meses[mes - 1]} de ${año}`;
  }

  return null;
};

// Obtener fecha de inicio unificada (prioriza puntosClave sobre fechasInicio)
export const obtenerFechaInicioUnificada = (curso: CursoMaestro): string | undefined => {
  // 1. Prioridad: fecha extraída de puntosClave (más específica y actualizada)
  const fechaDePuntosClave = extraerFechaDePuntosClave(curso);
  if (fechaDePuntosClave) {
    return fechaDePuntosClave;
  }

  // 2. Fallback: fecha de fechasInicio (sistema legacy)
  return curso.inicio;
};

// Parsear fecha de texto de curso (ej: "Julio 2025", "4 de Julio de 2025", "2025-08-11")
export const parsearFechaCurso = (fechaTexto: string): Date | null => {
  const meses = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
    'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
    'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };

  const texto = fechaTexto.toLowerCase().trim().replace(/\sde\s/g, ' ');
  
  // Formato ISO (ej: "2025-08-11")
  const isoMatch = texto.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const año = parseInt(isoMatch[1]);
    const mes = parseInt(isoMatch[2]) - 1; // Los meses en Date van de 0-11
    const dia = parseInt(isoMatch[3]);
    
    if (!isNaN(año) && !isNaN(mes) && !isNaN(dia)) {
      return new Date(año, mes, dia);
    }
  }
  
  const palabras = texto.split(' ');
  
  // Formato "Día Mes Año" (ej: "4 Julio 2025")
  if (palabras.length === 3) {
    const dia = parseInt(palabras[0]);
    const mesTexto = palabras[1];
    const año = parseInt(palabras[2]);
    const mes = meses[mesTexto as keyof typeof meses];

    if (!isNaN(dia) && mes !== undefined && !isNaN(año)) {
      return new Date(año, mes, dia);
    }
  }

  // Formato "Mes Año" (ej: "Julio 2025")
  if (palabras.length === 2) {
    const mesTexto = palabras[0];
    const añoTexto = palabras[1];
    
    const mes = meses[mesTexto as keyof typeof meses];
    const año = parseInt(añoTexto);
    
    if (mes !== undefined && !isNaN(año)) {
      // Usar día 15 del mes como referencia estándar
      return new Date(año, mes, 15);
    }
  }
  
  // Si no coincide con ninguno de los formatos
  return null;
};

// Calcular diferencia en meses entre dos fechas
export const calcularMesesDiferencia = (fechaActual: Date, fechaCurso: Date): number => {
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth();
  
  const añoCurso = fechaCurso.getFullYear();
  const mesCurso = fechaCurso.getMonth();
  
  return (añoCurso - añoActual) * 12 + (mesCurso - mesActual);
};

// Determinar color de etiqueta según reglas del refactor-plan.md (VERSIÓN UNIFICADA)
export const determinarColorEtiqueta = (
  fechaInicio: string | undefined, 
  esCiclo: boolean = false,
  fechaActual?: Date,
  curso?: CursoMaestro // Nuevo parámetro para acceder a puntosClave
): ColorTag => {
  // Ciclos siempre azul
  if (esCiclo) {
    const texto = fechaInicio ? fechaInicio.toUpperCase() : 'CICLO FORMATIVO';
    return { text: texto, color: 'bg-blue-500', esCiclo: true };
  }

  // Obtener fecha unificada si tenemos acceso al curso completo
  let fechaFinal = fechaInicio;
  if (curso) {
    fechaFinal = obtenerFechaInicioUnificada(curso);
  }

  // Sin fecha = próximamente en gris
  if (!fechaFinal || fechaFinal.toLowerCase().includes('próximamente')) {
    return { text: 'PRÓXIMAMENTE', color: 'bg-gray-500' };
  }

  const ahora = fechaActual || getFechaActualSync();
  const fechaCurso = parsearFechaCurso(fechaFinal);
  
  if (!fechaCurso) {
    // Si no se puede parsear pero tiene texto, mostrar como mes/año
    return { text: fechaFinal.toUpperCase(), color: 'bg-green-500' };
  }

  // Calcular diferencia en días
  const diferenciaDias = Math.floor((fechaCurso.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24));
  
  // Aplicar reglas del refactor-plan.md:
  if (diferenciaDias < -5) {
    // Más de 5 días después de fechaInicio = MATRÍCULA CERRADA (Rojo)
    return { text: 'MATRÍCULA CERRADA', color: 'bg-red-600' };
  } else if (diferenciaDias >= -5 && diferenciaDias <= 5) {
    // En el rango de 5 días antes y 5 días después = ÚLTIMAS PLAZAS (Naranja)
    return { text: 'ÚLTIMAS PLAZAS', color: 'bg-orange-500' };
  } else {
    // Cualquier otra fecha futura = formato legible
    
    // Para fechas muy futuras (más de 60 días), mostrar solo mes y año
    if (diferenciaDias > 60) {
      return { text: formatearMesAñoLegible(fechaCurso), color: 'bg-green-500' };
    } else {
      // Para fechas próximas, mostrar fecha específica completa
      return { text: formatearFechaLegible(fechaCurso), color: 'bg-orange-500' };
    }
  }
};

/**
 * Ordena los cursos por prioridad estratégica para maximizar conversiones:
 * 1. MATRÍCULA CERRADA (máxima urgencia/escasez)
 * 2. ÚLTIMAS PLAZAS (urgencia media-alta, ventana crítica)
 * 3. Cursos con fecha futura (ordenados por proximidad)
 * 4. PRÓXIMAMENTE (cursos sin fecha definida)
 * 5. Ciclos formativos (al final)
 */
export const ordenarCursosPorPrioridad = (cursos: CursoMaestro[]): CursoMaestro[] => {
  const fechaActual = getFechaActualSync();

  const getScore = (curso: CursoMaestro): number => {
    const esCiclo = curso.categoria === 'ciclos';
    const etiqueta = determinarColorEtiqueta(curso.inicio, esCiclo, fechaActual, curso);
    
    // Prioridad 1: MATRÍCULA CERRADA (máxima urgencia para conversiones)
    if (etiqueta.text === 'MATRÍCULA CERRADA') {
      return 1;
    }
    
    // Prioridad 2: ÚLTIMAS PLAZAS (urgencia media-alta, ventana crítica de ±5 días)
    if (etiqueta.text === 'ÚLTIMAS PLAZAS') {
      return 2;
    }
    
    // Prioridad 3: Cursos con fecha futura definida (ordenar por proximidad)
    if (curso.inicio && !curso.inicio.toLowerCase().includes('próximamente') && curso.categoria !== 'ciclos') {
      return 3;
    }
    
    // Prioridad 4: Cursos sin fecha ('Próximamente')
    if (!curso.inicio || curso.inicio.toLowerCase().includes('próximamente')) {
      return 4;
    }
    
    // Prioridad 5: Ciclos formativos (al final)
    if (curso.categoria === 'ciclos') {
      return 5;
    }
    
    return 6; // Fallback
  };

  const getFechaParaOrden = (curso: CursoMaestro): number => {
    const fechaUnificada = obtenerFechaInicioUnificada(curso);
    if (!fechaUnificada) return Infinity;
    
    const fechaParseada = parsearFechaCurso(fechaUnificada);
    return fechaParseada ? fechaParseada.getTime() : Infinity;
  };

  return [...cursos].sort((a, b) => {
    const scoreA = getScore(a);
    const scoreB = getScore(b);

    // Si las prioridades son diferentes, ordenar por prioridad
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }

    // Dentro de la misma prioridad, ordenar por fecha (más cercana primero)
    if (scoreA === 2 || scoreA === 3) { // ÚLTIMAS PLAZAS y cursos con fecha futura
      const fechaA = getFechaParaOrden(a);
      const fechaB = getFechaParaOrden(b);
      return fechaA - fechaB;
    }

    // Para otros casos, mantener orden alfabético
    return a.nombre.localeCompare(b.nombre);
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

// Formatear fecha en formato legible para etiquetas (ej: "27 AGOSTO 2025")
export const formatearFechaLegible = (fecha: Date): string => {
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
                 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  
  return `${dia} ${mes} ${año}`;
};

// Formatear fecha solo con mes y año para fechas futuras (ej: "AGOSTO 2025")
export const formatearMesAñoLegible = (fecha: Date): string => {
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
                 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  
  return `${mes} ${año}`;
};

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