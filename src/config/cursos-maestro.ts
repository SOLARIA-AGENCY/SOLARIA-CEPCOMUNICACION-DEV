import baseCursosData from './data/base-cursos.json';

// Fuente de verdad para las fechas de inicio, extraído de la matriz.
const fechasInicio: { [key: string]: string } = {
  'adiestramiento-canino-norte': 'Septiembre 2025',
  'auxiliar-clinico-veterinario-norte': 'Septiembre 2025',
  'auxiliar-enfermeria-norte': 'Noviembre 2025',
  'auxiliar-farmacia-dermo-norte': 'Julio 2025',
  'auxiliar-odontologia-norte': 'Noviembre 2025',
  'auxiliar-farmacia-parafarmacia-norte': 'Julio 2025',
  'quiromasaje-nivel2-norte': 'Julio 2025',
  'dietetica-nutricion-norte': 'Septiembre 2025',
  'cfgm-farmacia-parafarmacia-norte': 'Octubre 2025',
  'cfgs-higiene-bucodental-norte': 'Octubre 2025',
  'agente-funerario-santacruz': 'Septiembre 2025',
  'auxiliar-clinico-veterinario-santacruz': 'Septiembre 2025',
  'auxiliar-clinicas-esteticas-santacruz': 'Octubre 2025',
  'auxiliar-enfermeria-santacruz': 'Septiembre 2025',
  'auxiliar-odontologia-santacruz': 'Noviembre 2025',

  'cfgm-farmacia-parafarmacia-santacruz': 'Octubre 2025',
  'cfgs-higiene-bucodental-santacruz': 'Octubre 2025',
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
  nombre: string;
  slugBase: string;
  imagen: string;
  categoria: 'sanidad' | 'veterinaria' | 'bienestar' | 'ciclos' | 'adiestramiento' | 'diseño';
  destacado?: boolean;
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
  sede: 'Norte' | 'Santa Cruz';
  estado: 'activo' | 'proximamente';
  inicio: string | undefined;
}

const baseCursos: CursoBase[] = baseCursosData as CursoBase[];

export const cursosMaestro: CursoMaestro[] = baseCursos.flatMap(cursoBase => {
  const sedes: ('Norte' | 'Santa Cruz')[] = ['Norte', 'Santa Cruz'];
  
  if (cursoBase.slugBase === 'peluqueria-canina-felina') {
    return []; // Excluir cursos cancelados
  }

  return sedes.map(sede => {
    const slugSede = sede === 'Norte' ? 'norte' : 'santacruz';
    const id = `${cursoBase.slugBase}-${slugSede}`;
    const inicio = fechasInicio[id];
    
    let subtitulo = cursoBase.subtitulo;
    if (cursoBase.categoria === 'ciclos') {
      if (cursoBase.nombre.toLowerCase().includes('grado superior')) {
        subtitulo = 'Grado Superior';
      } else if (cursoBase.nombre.toLowerCase().includes('grado medio')) {
        subtitulo = 'Grado Medio';
      }
    }

    return {
      ...cursoBase,
      id,
      slug: id,
      sede: sede,
      estado: inicio ? 'activo' : 'proximamente',
      inicio: inicio,
      subtitulo: subtitulo,
    };
  });
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