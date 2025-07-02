import type { CursoMaestro } from '../config/cursos-maestro';
import { parsearFechaCurso } from './timeUtils';

export interface CursosPorMes {
  mes: string;
  año: number;
  cursos: CursoMaestro[];
  fechaOrden: Date;
}

export interface CursosAgrupados {
  conFecha: CursosPorMes[];
  proximamente: CursoMaestro[];
}

// Nombres de meses en español
const MESES_ESPAÑOL = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Obtener nombre del mes en español
export const obtenerNombreMes = (fecha: Date): string => {
  return MESES_ESPAÑOL[fecha.getMonth()];
};

// Formatear mes y año para display
export const formatearMesAño = (fecha: Date): string => {
  const mes = obtenerNombreMes(fecha);
  const año = fecha.getFullYear();
  return `${mes} ${año}`;
};

// Agrupar cursos por mes para una sede específica
export const agruparCursosPorMes = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
): CursosAgrupados => {
  // Filtrar cursos por sede
  const cursosSede = cursos.filter(curso => curso.sede === sede);
  
  // Separar cursos con fecha de los "próximamente"
  const cursosConFecha: CursoMaestro[] = [];
  const proximamente: CursoMaestro[] = [];
  
  cursosSede.forEach(curso => {
    if (curso.inicio && curso.inicio !== 'PRÓXIMAMENTE') {
      const fechaParseada = parsearFechaCurso(curso.inicio);
      if (fechaParseada) {
        cursosConFecha.push(curso);
      } else {
        proximamente.push(curso);
      }
    } else {
      proximamente.push(curso);
    }
  });
  
  // Agrupar cursos con fecha por mes
  const gruposPorMes = new Map<string, CursoMaestro[]>();
  
  cursosConFecha.forEach(curso => {
    if (curso.inicio) {
      const fechaParseada = parsearFechaCurso(curso.inicio);
      if (fechaParseada) {
        const claveMonthYear = `${fechaParseada.getFullYear()}-${fechaParseada.getMonth()}`;
        
        if (!gruposPorMes.has(claveMonthYear)) {
          gruposPorMes.set(claveMonthYear, []);
        }
        gruposPorMes.get(claveMonthYear)!.push(curso);
      }
    }
  });
  
  // Convertir a array de CursosPorMes y ordenar cronológicamente
  const conFecha: CursosPorMes[] = Array.from(gruposPorMes.entries())
    .map(([claveMonthYear, cursosMes]) => {
      const [año, mesIndex] = claveMonthYear.split('-').map(Number);
      const fechaOrden = new Date(año, mesIndex, 1);
      
      return {
        mes: formatearMesAño(fechaOrden),
        año,
        cursos: cursosMes.sort((a, b) => {
          // Ordenar cursos dentro del mes por fecha específica si existe
          const fechaA = a.inicio ? parsearFechaCurso(a.inicio) : null;
          const fechaB = b.inicio ? parsearFechaCurso(b.inicio) : null;
          
          if (fechaA && fechaB) {
            return fechaA.getTime() - fechaB.getTime();
          }
          return a.nombre.localeCompare(b.nombre);
        }),
        fechaOrden
      };
    })
    .sort((a, b) => a.fechaOrden.getTime() - b.fechaOrden.getTime());
  
  return {
    conFecha,
    proximamente: proximamente.sort((a, b) => a.nombre.localeCompare(b.nombre))
  };
};

// Obtener estadísticas de cursos por sede
export const obtenerEstadisticasSede = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
) => {
  const cursosSede = cursos.filter(curso => curso.sede === sede);
  const cursosAgrupados = agruparCursosPorMes(cursos, sede);
  
  const totalCursos = cursosSede.length;
  const cursosConFecha = cursosAgrupados.conFecha.reduce((total, grupo) => total + grupo.cursos.length, 0);
  const cursosProximamente = cursosAgrupados.proximamente.length;
  const mesesActivos = cursosAgrupados.conFecha.length;
  
  return {
    totalCursos,
    cursosConFecha,
    cursosProximamente,
    mesesActivos,
    categorias: Array.from(new Set(cursosSede.map(curso => curso.categoria))).length
  };
};

// Obtener el próximo curso por sede
export const obtenerProximoCurso = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
): CursoMaestro | null => {
  const cursosAgrupados = agruparCursosPorMes(cursos, sede);
  
  if (cursosAgrupados.conFecha.length > 0) {
    const primerGrupo = cursosAgrupados.conFecha[0];
    return primerGrupo.cursos[0] || null;
  }
  
  return null;
}; 