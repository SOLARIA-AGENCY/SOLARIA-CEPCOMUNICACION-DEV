import baseCursosData from './data/base-cursos.json';
import { parsearFechaCurso } from '../utils/timeUtils';

// Mapa para generar códigos de curso cortos y únicos
const codigosCursoCortos: { [key: string]: string } = {
  'adiestramiento-canino': 'ADICAN',
  'adiestramiento-canino-ii': 'ADICAN2',
  'auxiliar-clinico-veterinario': 'ACV',
  'auxiliar-enfermeria': 'AUXENF',
  'auxiliar-farmacia-dermo': 'AUXDRM',
  'auxiliar-odontologia': 'AUXODO',
  'auxiliar-farmacia-parafarmacia': 'AUXFAR',
  'auxiliar-farmacia-parafarmacia-norte-grupo2': 'AUXFAR2',
  'auxiliar-farmacia-parafarmacia-norte-tarde': 'AUXFART',
  'quiromasaje-nivel2': 'QUIRO2',
  'quiromasaje-nivel-1': 'QUIRO1',
  'quiromasaje-11-meses': 'QUIRO11M',
  'dietetica-nutricion': 'NUTRIC',
  'cfgm-farmacia-parafarmacia': 'CFGMFARM',
  'cfgs-higiene-bucodental': 'CFGSHIG',
  'agente-funerario': 'FUNER',
  'auxiliar-clinicas-esteticas': 'ESTCLN',
  'tanatoestetica-tanatopraxia': 'TANATO',
  'ayudante-tecnico-veterinario-atv': 'ATV',
  'especialista-animales-exoticos': 'EXOTIC',
  'ayudante-tecnico-veterinario-santa-cruz': 'ATVSC',
  'ayudante-tecnico-veterinario-norte': 'ATVN',
  'peluqueria-canina-felina': 'PELCAN',
  // Códigos completos - sin GENERIC
};

// Fuente de verdad para las fechas de inicio. Actualizado el 07/01/2025
// a partir de 'Cursos_CEP_2025.markdown' - CAMPAÑA OTOÑO 2025.
const fechasInicio: { [key: string]: string } = {
  // --- SEDE NORTE ---
  'auxiliar-farmacia-parafarmacia-norte': '7 de Julio de 2025', // Línea 51: 07/07/2025 (grupo principal)
  'auxiliar-farmacia-parafarmacia-norte-grupo2-norte': '21 de Julio de 2025', // Línea 51: 21/07/2025 (grupo 2)
  'auxiliar-farmacia-parafarmacia-norte-tarde-norte': '13 de Octubre de 2025', // Línea 67: 13/10/2025 (modalidad tarde)
  'quiromasaje-nivel2-norte': '4 de Julio de 2025', // Línea 52: 04/07/2025
  'auxiliar-clinico-veterinario-norte': '28 de Mayo de 2025', // Línea 53: 28/05/2025
  'peluqueria-canina-norte': 'Septiembre 2025', // Línea 54: Septiembre 2025
  'auxiliar-odontologia-norte': '27 de Noviembre de 2025', // Línea 55: 27/11/2025
  'quiromasaje-11-meses-norte': '19 de Junio de 2025', // Líneas 61-62: 19/06/2025
  'ayudante-tecnico-veterinario-norte-norte': '25 de Junio de 2025', // Línea 63: 25/06/2025
  'dietetica-nutricion-norte': 'Septiembre 2025', // Línea 64: Septiembre 2025
  'adiestramiento-canino-norte': 'Septiembre 2025', // Línea 65: Septiembre 2025
  'auxiliar-enfermeria-norte': 'Noviembre 2025', // Línea 68: Noviembre 2025
  'adiestramiento-canino-ii-norte': 'Próximamente', // Línea 75: Sin fecha definida

  // --- SEDE SANTA CRUZ ---
  'auxiliar-farmacia-parafarmacia-santacruz': '13 de Octubre de 2025', // Usar fecha de puntosClave
  'quiromasaje-11-meses-santacruz': '20 de Junio de 2025', // Línea 8: 20/06/2025
  'auxiliar-odontologia-santacruz': '26 de Noviembre de 2025', // Línea 9: 26/11/2025
  'auxiliar-clinicas-esteticas-santacruz': '9 de Octubre de 2025', // Línea 10: 09/10/2025
  'agente-funerario-santacruz': '11 de Septiembre de 2025', // Línea 16: 11/09/2025
  'ayudante-tecnico-veterinario-santa-cruz-santacruz': '1 de Julio de 2025', // Línea 17: 01/07/2025
  'auxiliar-clinico-veterinario-santacruz': '9 de Septiembre de 2025', // Línea 18: 09/09/2025
  'peluqueria-canina-felina-santacruz': 'Junio 2025', // Línea 19: Junio 2025
  'auxiliar-enfermeria-santacruz': '29 de Septiembre de 2025', // Línea 20: 29/09/2025
  'cfgm-farmacia-parafarmacia-santacruz': '18 de Septiembre de 2025', // Línea 25: 18/09/2025
  'cfgs-higiene-bucodental-santacruz': '17 de Septiembre de 2025', // Línea 26: 17/09/2025
};

// Tipos para cursos CEP Formación

export type Modulo = {
  titulo: string;
  contenido: string[];
};

export type Profesor = {
  nombre: string;
  foto: string;
  especialidad: string;
  bio: string;
  tags: string[];
};

export type PuntoClave = {
  icono: string;
  texto: string;
};

export type InfoAdicional = {
  duracion: string;
  practicas: string;
  especializacion: string;
};

export type Inversion = {
  total: string;
  modalidad: string;
  incluye: string;
};

export type Entidad = {
  nombre: string;
  logo: string;
};

export type DescripcionDetallada = {
  introduccion: string;
  queAprendes: string;
  puntosClave: PuntoClave[];
  infoAdicional?: InfoAdicional;
  inversion?: Inversion;
  salidasProfesionales: string[];
  modulos: Modulo[];
  profesores: Profesor[];
  certificaciones?: Entidad[];
  colaboradores?: Entidad[];
  cursosComplementarios?: string[];
  requisitos?: string[];
};

export interface CursoBase {
  fechaInicioISO?: string;
  etiquetaPlazas?: string;
  nombre: string;
  slugBase: string;
  imagen: string;
  categoria: 'sanidad' | 'veterinaria' | 'bienestar' | 'ciclos' | 'adiestramiento' | 'diseño';
  subtitulo?: string; // Propiedad opcional para ciclos
  modalidad?: string; // Propiedad opcional para ciclos
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  descripcionDetallada?: DescripcionDetallada;
}

export interface CursoMaestro extends CursoBase {
  id: string;
  slug: string;
  codigo: string; // Código único para gestión interna
  sede: 'Norte' | 'Santa Cruz';
  estado: 'activo' | 'proximamente';
  inicio: string | undefined;
}

const baseCursos: CursoBase[] = baseCursosData as CursoBase[];

// Separar cursos que ya están diferenciados por sede de los que necesitan generación automática
const cursosConSede = baseCursos.filter(curso => 
  curso.nombre.includes(' - Norte') || curso.nombre.includes(' - Santa Cruz') ||
  curso.nombre.includes('(Norte)') || curso.nombre.includes('(Santa Cruz)') ||
  curso.nombre.includes('(La Laguna/Norte)')
);

const cursosSinSede = baseCursos.filter(curso => 
  !curso.nombre.includes(' - Norte') && !curso.nombre.includes(' - Santa Cruz') &&
  !curso.nombre.includes('(Norte)') && !curso.nombre.includes('(Santa Cruz)') &&
  !curso.nombre.includes('(La Laguna/Norte)')
);

// Procesar cursos que ya tienen sede específica
const cursosConSedeProcessed: CursoMaestro[] = cursosConSede.map(cursoBase => {
  const esNorte = cursoBase.nombre.includes(' - Norte') || 
                  cursoBase.nombre.includes('(Norte)') ||
                  cursoBase.nombre.includes('(La Laguna/Norte)');
  const sede = esNorte ? 'Norte' : 'Santa Cruz';
  const slugSede = esNorte ? 'norte' : 'santacruz';
  const id = `${cursoBase.slugBase}-${slugSede}`;
  const inicio = fechasInicio[id];
  
  const fechaParseada = inicio ? parsearFechaCurso(inicio) : null;
  const fechaInicioISO = fechaParseada ? fechaParseada.toISOString() : undefined;

  const codigoCurso = codigosCursoCortos[cursoBase.slugBase] || 'GENERIC';
  const anio = fechaParseada ? fechaParseada.getFullYear().toString().slice(-2) : 'XX';
  const codigoSede = sede === 'Norte' ? 'CN' : 'SC';
  const codigo = `PRO-${codigoSede}-${codigoCurso}-${anio}`;

  return {
    ...cursoBase,
    id,
    slug: id,
    codigo: codigo,
    sede: sede as 'Norte' | 'Santa Cruz',
    estado: (inicio ? 'activo' : 'proximamente') as 'activo' | 'proximamente',
    inicio: inicio,
    fechaInicioISO: fechaInicioISO,
  };
});

// Procesar cursos sin sede específica (generación automática)
const cursosSinSedeProcessed: CursoMaestro[] = cursosSinSede.flatMap(cursoBase => {
  const sedes: ('Norte' | 'Santa Cruz')[] = ['Norte', 'Santa Cruz'];
  
  if (cursoBase.slugBase === 'peluqueria-canina-felina') {
    return []; // Excluir cursos cancelados
  }

  return sedes.map(sede => {
    const slugSede = sede === 'Norte' ? 'norte' : 'santacruz';
    const id = `${cursoBase.slugBase}-${slugSede}`;
    const inicio = fechasInicio[id];
    
    // Parsear fecha y manejar posible null de forma segura
    const fechaParseada = inicio ? parsearFechaCurso(inicio) : null;
    const fechaInicioISO = fechaParseada ? fechaParseada.toISOString() : undefined;

    let subtitulo = cursoBase.subtitulo;
    if (cursoBase.categoria === 'ciclos') {
      if (cursoBase.nombre.toLowerCase().includes('grado superior')) {
        subtitulo = 'Grado Superior';
      } else if (cursoBase.nombre.toLowerCase().includes('grado medio')) {
        subtitulo = 'Grado Medio';
      }
    }

    // Configurar etiquetas específicas por sede y curso
    let etiquetaPlazas = cursoBase.etiquetaPlazas;

    // Sobrescribir imagen para ciclos formativos específicos
    let imagen = cursoBase.imagen;
    if (cursoBase.slugBase === 'cfgm-farmacia-parafarmacia') {
      imagen = '/images/ciclos/CICLO GRADO MEDIO FARMACIA PARAFARMACIA.png';
    } else if (cursoBase.slugBase === 'cfgs-higiene-bucodental') {
      imagen = '/images/ciclos/CICLO GRADO SUPERIOR HIGIENE BUCODENTAL - CARD.png';
    }
    if (cursoBase.slugBase === 'quiromasaje-nivel2' && sede === 'Santa Cruz') {
      etiquetaPlazas = undefined; // Quitar etiqueta para Santa Cruz
    }

    const codigoCurso = codigosCursoCortos[cursoBase.slugBase] || 'GENERIC';
    const anio = fechaParseada ? fechaParseada.getFullYear().toString().slice(-2) : 'XX';
    const codigoSede = sede === 'Norte' ? 'CN' : 'SC';
    const codigo = `PRO-${codigoSede}-${codigoCurso}-${anio}`;

    return {
      ...cursoBase,
      imagen: imagen,
      id,
      slug: id,
      codigo: codigo,
      sede: sede,
      estado: (inicio ? 'activo' : 'proximamente') as 'activo' | 'proximamente',
      inicio: inicio,
      fechaInicioISO: fechaInicioISO,
      subtitulo: subtitulo,
      etiquetaPlazas: etiquetaPlazas,
    };
  });
});

// Combinar ambos tipos de cursos y ordenar
export const cursosMaestro: CursoMaestro[] = [...cursosConSedeProcessed, ...cursosSinSedeProcessed].sort((a, b) => {
  const fechaA = a.inicio ? parsearFechaCurso(a.inicio) : null;
  const fechaB = b.inicio ? parsearFechaCurso(b.inicio) : null;

  if (fechaA && fechaB) {
    return fechaA.getTime() - fechaB.getTime();
  }
  if (fechaA) {
    return -1; // A tiene fecha, B no, A va primero
  }
  if (fechaB) {
    return 1; // B tiene fecha, A no, B va primero
  }
  return 0; // Ambos sin fecha, orden estable
}); 

export type FolletoPDF = {
  titulo: string;
  descripcion: string;
  archivo: string;
  requiereEmail: boolean;
  consentimientoRGPD: boolean;
};

export type NewsletterConfig = {
  titulo: string;
  descripcion: string;
  beneficios: string[];
  frecuencia: string;
  privacidad: string; // Añadir la propiedad
};

// Configuración de folletos específicos por curso (descarga directa)
export const getFolletoCurso = (cursoSlug: string): FolletoPDF | null => {
  const folletos: Record<string, FolletoPDF> = {
    "adiestramiento-canino": {
      titulo: "Folleto Completo - Adiestramiento Canino",
      descripcion: "Programa completo, horarios, precios y toda la información del curso de Adiestramiento Canino.",
      archivo: "/docs/brochures/adiestramiento-canino-guia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-clinico-veterinario": {
      titulo: "Folleto Completo - Auxiliar de Veterinaria",
      descripcion: "Programa detallado, salidas profesionales y información completa del curso de Auxiliar de Veterinaria.",
      archivo: "/docs/brochures/auxiliar-veterinaria-manual.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-enfermeria": {
      titulo: "Folleto Completo - Auxiliar de Enfermería",
      descripcion: "Plan de estudios, prácticas y toda la información del curso de Auxiliar de Enfermería.",
      archivo: "/docs/brochures/folleto-auxiliar-enfermeria.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-farmacia-dermo": {
      titulo: "Folleto Completo - Auxiliar de Farmacia",
      descripcion: "Programa académico y profesional del curso de Auxiliar de Farmacia y Parafarmacia.",
      archivo: "/docs/brochures/folleto-auxiliar-farmacia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-clinicas-esteticas": {
      titulo: "Folleto Completo - Auxiliar de Clínicas Estéticas",
      descripcion: "Información completa sobre el curso de Auxiliar de Clínicas Estéticas y medicina estética.",
      archivo: "/docs/brochures/folleto-auxiliar-clinicas-esteticas.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "agente-funerario": {
      titulo: "Folleto Completo - Tanatoestética y Tanatopraxia",
      descripcion: "Programa especializado en tanatopraxia y agente funerario con información detallada.",
      archivo: "/docs/brochures/folleto-tanatopraxia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "quiromasaje-nivel1": {
      titulo: "Folleto Completo - Quiromasaje Nivel I",
      descripcion: "Curso básico de quiromasaje: técnicas, programa y salidas profesionales.",
      archivo: "/docs/brochures/folleto-quiromasaje-nivel-1.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "quiromasaje-nivel2": {
      titulo: "Folleto Completo - Quiromasaje Nivel II",
      descripcion: "Curso avanzado de quiromasaje: especialización y técnicas profesionales.",
      archivo: "/docs/brochures/folleto-quiromasaje-nivel-2.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-odontologia": {
      titulo: "Folleto Completo - Auxiliar de Odontología",
      descripcion: "Programa académico y profesional del curso de Auxiliar de Odontología e Higiene Bucodental.",
      archivo: "/docs/brochures/folleto-auxiliar-odontologia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-farmacia-parafarmacia": {
      titulo: "Folleto Completo - Auxiliar de Farmacia y Parafarmacia",
      descripcion: "Programa completo de atención farmacéutica, dispensación y productos de parafarmacia.",
      archivo: "/docs/brochures/folleto-auxiliar-farmacia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "dietetica-nutricion": {
      titulo: "Folleto Completo - Dietética y Nutrición",
      descripcion: "Programa completo de dietética y nutrición con enfoque profesional.",
      archivo: "/docs/brochures/folleto-dietetica-nutricion.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "cfgm-farmacia-parafarmacia": {
      titulo: "Folleto Completo - Ciclo Formativo Farmacia",
      descripcion: "Información completa del Ciclo Formativo de Grado Medio en Farmacia y Parafarmacia.",
      archivo: "/docs/brochures/folleto-cfgm-farmacia.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "cfgs-higiene-bucodental": {
      titulo: "Folleto Completo - Ciclo Formativo Higiene Bucodental",
      descripcion: "Información completa del Ciclo Formativo de Grado Superior en Higiene Bucodental.",
      archivo: "/docs/brochures/folleto-cfgs-higiene-bucodental.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "ayudante-tecnico-veterinario-atv": {
      titulo: "Folleto Completo - Ayudante Técnico Veterinario",
      descripcion: "Programa especializado de ATV con técnicas avanzadas y prácticas profesionales.",
      archivo: "/docs/brochures/folleto-ayudante-tecnico-veterinario.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    }
  };
  
  return folletos[cursoSlug] || null;
};

// Configuración del newsletter
export const newsletterConfig: NewsletterConfig = {
  titulo: 'Mantente al Día con CEP Formación',
  descripcion: 'Recibe las últimas noticias sobre nuestros cursos, eventos especiales y ofertas exclusivas directamente en tu bandeja de entrada. Únete a nuestra comunidad y no te pierdas ninguna oportunidad para seguir creciendo profesionalmente.',
  beneficios: [
    'Nuevos cursos y fechas de inicio',
    'Descuentos y promociones exclusivas',
    'Eventos y talleres gratuitos',
    'Noticias del sector y salidas laborales'
  ],
  frecuencia: 'Semanal',
  privacidad: 'Tus datos son privados y no se compartirán.' // Añadir el texto
};