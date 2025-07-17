import type { CursoMaestro } from '../config/cursos-maestro';
import { cursosMaestro } from '../config/cursos-maestro';
import { EmploymentCourseConfig } from '../types/employment';
import { cursosOcupadosConfig } from '../config/cursos-ocupados';
import { cursosDesempleadosConfig } from '../config/cursos-desempleados';
import { parsearFechaCurso } from './timeUtils';

// Tipo unificado para todos los cursos - incluye propiedades comunes
export type CursoUnificado = CursoMaestro | (EmploymentCourseConfig & { 
  esCursoSubvencionado: true;
  slug: string;
  codigo: string;
  estado: string;
  inicio: string;
  categoria: string;
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  descripcionDetallada?: {
    puntosClave: Array<{ icono: string; texto: string }>;
  };
});

export interface CursosPorMes {
  mes: string;
  año: number;
  cursos: CursoUnificado[];
  fechaOrden: Date;
}

export interface CursosAgrupados {
  conFecha: CursosPorMes[];
  proximamente: CursoUnificado[];
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

// Convertir curso de empleo a formato unificado
const convertirCursoEmpleo = (curso: EmploymentCourseConfig): CursoUnificado => {
  return {
    ...curso,
    esCursoSubvencionado: true,
    slug: `${curso.tipo}-${curso.id.toLowerCase()}`,
    slugBase: `${curso.tipo}-${curso.id.toLowerCase()}`,
    codigo: curso.id,
    estado: curso.activo ? 'activo' : 'proximamente',
    categoria: 'sanidad' as any,
    imagen: curso.imagen || '/images/cursos/formacion-gratuita.jpg',
    inicio: curso.fecha_inicio,
    copy: {
      slogan: curso.descripcion || 'Curso gratuito subvencionado',
      textosPrincipales: curso.objetivos || [],
      titulos: []
    },
    descripcionDetallada: {
      introduccion: curso.descripcion || 'Curso gratuito subvencionado',
      puntosClave: [
        { icono: 'Clock', texto: curso.datos_especificos.duracion },
        { icono: 'Globe', texto: curso.datos_especificos.modalidad },
        { icono: 'Award', texto: curso.datos_especificos.certificacion }
      ],
      queAprendes: curso.metodologia || 'Formación especializada',
      salidasProfesionales: curso.tipo === 'ocupados' 
        ? ['Mejora profesional', 'Especialización técnica', 'Cumplimiento normativo']
        : ['Inserción laboral', 'Certificación profesional', 'Prácticas en empresas'],
      modulos: curso.temario?.map(t => ({
        titulo: t.modulo,
        contenido: t.contenidos
      })) || [],
      profesores: []
    }
  };
};

// Obtener todos los cursos (regulares + subvencionados)
const obtenerTodosLosCursos = (): CursoUnificado[] => {
  const cursosRegulares: CursoUnificado[] = [...cursosMaestro];
  
  const cursosOcupados: CursoUnificado[] = cursosOcupadosConfig
    .filter(curso => curso.activo)
    .map(convertirCursoEmpleo);
    
  const cursosDesempleados: CursoUnificado[] = cursosDesempleadosConfig
    .filter(curso => curso.activo)
    .map(convertirCursoEmpleo);
  
  return [...cursosRegulares, ...cursosOcupados, ...cursosDesempleados];
};

// Obtener fecha de inicio de un curso unificado
const obtenerFechaInicio = (curso: CursoUnificado): string | null => {
  if ('esCursoSubvencionado' in curso && curso.esCursoSubvencionado) {
    return curso.fecha_inicio;
  } else {
    return curso.inicio || null;
  }
};

// Agrupar cursos por mes para una sede específica (incluye todos los tipos)
export const agruparCursosPorMes = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
): CursosAgrupados => {
  // Obtener todos los cursos (regulares + subvencionados)
  const todosLosCursos = obtenerTodosLosCursos();
  
  // Filtrar cursos por sede
  const cursosSede = todosLosCursos.filter(curso => curso.sede === sede);
  
  // Separar cursos con fecha de los "próximamente"
  const cursosConFecha: CursoUnificado[] = [];
  const proximamente: CursoUnificado[] = [];
  
  cursosSede.forEach(curso => {
    const fechaInicio = obtenerFechaInicio(curso);
    
    if (fechaInicio && fechaInicio !== 'PRÓXIMAMENTE') {
      const fechaParseada = parsearFechaCurso(fechaInicio);
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
  const gruposPorMes = new Map<string, CursoUnificado[]>();
  
  cursosConFecha.forEach(curso => {
    const fechaInicio = obtenerFechaInicio(curso);
    if (fechaInicio) {
      const fechaParseada = parsearFechaCurso(fechaInicio);
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
          const fechaA = obtenerFechaInicio(a);
          const fechaB = obtenerFechaInicio(b);
          
          const parsedFechaA = fechaA ? parsearFechaCurso(fechaA) : null;
          const parsedFechaB = fechaB ? parsearFechaCurso(fechaB) : null;
          
          if (parsedFechaA && parsedFechaB) {
            return parsedFechaA.getTime() - parsedFechaB.getTime();
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

// Obtener estadísticas de cursos por sede (incluye todos los tipos)
export const obtenerEstadisticasSede = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
) => {
  const todosLosCursos = obtenerTodosLosCursos();
  const cursosSede = todosLosCursos.filter(curso => curso.sede === sede);
  const cursosAgrupados = agruparCursosPorMes(cursos, sede);
  
  const totalCursos = cursosSede.length;
  const cursosConFecha = cursosAgrupados.conFecha.reduce((total, grupo) => total + grupo.cursos.length, 0);
  const cursosProximamente = cursosAgrupados.proximamente.length;
  const mesesActivos = cursosAgrupados.conFecha.length;
  
  // Contar cursos subvencionados
  const cursosSubvencionados = cursosSede.filter(curso => 'esCursoSubvencionado' in curso).length;
  const cursosRegulares = cursosSede.filter(curso => !('esCursoSubvencionado' in curso)).length;
  
  return {
    totalCursos,
    cursosConFecha,
    cursosProximamente,
    mesesActivos,
    cursosSubvencionados,
    cursosRegulares,
    categorias: Array.from(new Set(cursosSede.map(curso => curso.categoria))).length
  };
};

// Obtener el próximo curso por sede (incluye todos los tipos)
export const obtenerProximoCurso = (
  cursos: CursoMaestro[], 
  sede: 'Norte' | 'Santa Cruz'
): CursoUnificado | null => {
  const cursosAgrupados = agruparCursosPorMes(cursos, sede);
  
  if (cursosAgrupados.conFecha.length > 0) {
    const primerGrupo = cursosAgrupados.conFecha[0];
    return primerGrupo.cursos[0] || null;
  }
  
  return null;
}; 