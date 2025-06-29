export type CursoMaestro = {
  id: string;
  slug: string;
  nombre: string;
  sede: 'Norte' | 'Santa Cruz';
  estado: 'activo' | 'proximamente' | 'cancelado';
  imagen: string;
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  inicio?: string;
  duracion?: string;
  precio?: string;
  practicas?: string;
  profesor?: string;
  certificacion?: string;
  profesorDetalle?: {
    nombre: string;
    especialidad: string;
    descripcion: string;
    foto: string;
  };
  modalidadInfo?: {
    tipo: string;
    horario: string;
    sesiones: string;
  };
  temario?: string[];
};

const baseCursos = [
  { 
    nombre: 'Adiestramiento Canino', 
    slugBase: 'adiestramiento-canino', 
    imagen: '/images/cursos/adiestramiento-canino.jpg',
    copy: {
      slogan: 'Conviértete en un experto en el comportamiento y educación canina.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Psicología Canina', 'Modificación de Conducta']
    }
  },
  { 
    nombre: 'Agente Funerario', 
    slugBase: 'agente-funerario', 
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Fórmate en una profesión esencial y de gran demanda social.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Tanatopraxia', 'Protocolo Funerario']
    }
  },
  { 
    nombre: 'Auxiliar Clínico Veterinario', 
    slugBase: 'auxiliar-clinico-veterinario',
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    copy: {
      slogan: 'Tu primer paso hacia una carrera dedicada al cuidado animal.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Anatomía Animal', 'Asistencia Quirúrgica']
    }
  },
  { 
    nombre: 'Auxiliar Clínicas Estéticas', 
    slugBase: 'auxiliar-clinicas-esteticas',
    imagen: '/images/cursos/diseno-de-medios.jpg',
    copy: {
      slogan: 'Especialízate en el sector de la belleza y el bienestar.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Tratamientos Faciales', 'Aparatología Estética']
    }
  },
  { 
    nombre: 'Auxiliar Enfermería', 
    slugBase: 'auxiliar-enfermeria',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    copy: {
      slogan: 'Una vocación de cuidado, una profesión de futuro.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Cuidados Básicos', 'Higiene y Movilización']
    }
  },
  { 
    nombre: 'Auxiliar Farmacia y Dermo', 
    slugBase: 'auxiliar-farmacia-dermo',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    copy: {
      slogan: 'Conviértete en un profesional clave en la oficina de farmacia.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Dispensación de Productos', 'Dermocosmética']
    }
  },
  { 
    nombre: 'Auxiliar Odontología', 
    slugBase: 'auxiliar-odontologia',
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    copy: {
      slogan: 'Asiste al odontólogo y mejora la salud bucodental de los pacientes.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Instrumental Dental', 'Esterilización']
    }
  },
  { 
    nombre: 'Dietética y Nutrición', 
    slugBase: 'dietetica-nutricion',
    imagen: '/images/cursos/dietetica-nutricion.jpg',
    copy: {
      slogan: 'Promueve hábitos de vida saludable a través de la alimentación.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Elaboración de Dietas', 'Nutrición Deportiva']
    }
  },
  { 
    nombre: 'Peluquería Canina y Felina', 
    slugBase: 'peluqueria-canina-felina',
    imagen: '/images/cursos/peluqueria-canina.jpg',
    copy: {
      slogan: 'Transforma tu pasión por los animales en una profesión creativa.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Técnicas de Corte', 'Cosmética Animal']
    }
  },
  { 
    nombre: 'Quiromasaje Nivel I', 
    slugBase: 'quiromasaje-nivel1',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    copy: {
      slogan: 'Iníciate en el arte del masaje terapéutico y de relajación.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Anatomía Palpatoria', 'Maniobras Básicas']
    }
  },
  { 
    nombre: 'Quiromasaje Nivel II', 
    slugBase: 'quiromasaje-nivel2',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    copy: {
      slogan: 'Avanza en tus técnicas y especialízate en masaje deportivo.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Masaje Deportivo', 'Tratamiento de Lesiones']
    }
  },
  { 
    nombre: 'CFGS Higiene Bucodental', 
    slugBase: 'cfgs-higiene-bucodental',
    imagen: '/images/cursos/ciclos-formativos.jpg',
    copy: {
      slogan: 'Tu título oficial para una carrera en salud dental.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Educación Sanitaria', 'Odontología Preventiva']
    }
  },
  { 
    nombre: 'CFGM Farmacia y Parafarmacia', 
    slugBase: 'cfgm-farmacia-parafarmacia',
    imagen: '/images/cursos/ciclos-formativos.jpg',
    copy: {
      slogan: 'Obtén tu título oficial y trabaja en farmacias y hospitales.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Oficina de Farmacia', 'Farmacología Básica']
    }
  }
];

// Fuente de verdad para las fechas de inicio, extraído de la matriz.
const fechasInicio: { [key: string]: string } = {
  'adiestramiento-canino-norte': 'Septiembre 2025',
  'auxiliar-clinico-veterinario-norte': 'Septiembre 2025',
  'auxiliar-enfermeria-norte': 'Noviembre 2025',
  'auxiliar-farmacia-dermo-norte': 'Julio 2025',
  'auxiliar-odontologia-norte': 'Noviembre 2025',
  'dietetica-nutricion-norte': 'Septiembre 2025',
  'cfgm-farmacia-parafarmacia-norte': 'Octubre 2025',
  'cfgs-higiene-bucodental-norte': 'Octubre 2025',
  'agente-funerario-santacruz': 'Septiembre 2025',
  'auxiliar-clinico-veterinario-santacruz': 'Septiembre 2025',
  'auxiliar-clinicas-esteticas-santacruz': 'Octubre 2025',
  'auxiliar-enfermeria-santacruz': 'Septiembre 2025',
  'auxiliar-odontologia-santacruz': 'Noviembre 2025',
  'quiromasaje-nivel2-santacruz': 'Julio 2025',
  'cfgm-farmacia-parafarmacia-santacruz': 'Octubre 2025',
  'cfgs-higiene-bucodental-santacruz': 'Octubre 2025',
};

export const cursosMaestro: CursoMaestro[] = baseCursos.flatMap(cursoBase => {
  const sedes: ('Norte' | 'Santa Cruz')[] = ['Norte', 'Santa Cruz'];
  
  if (cursoBase.slugBase === 'peluqueria-canina-felina') {
    return []; // Excluir cursos cancelados
  }

  return sedes.map(sede => {
    const slugSede = sede === 'Norte' ? 'norte' : 'santacruz';
    const id = `${cursoBase.slugBase}-${slugSede}`;
    const inicio = fechasInicio[id];

    return {
      ...cursoBase,
      id,
      slug: id,
      sede: sede,
      estado: inicio ? 'activo' : 'proximamente',
      inicio: inicio,
    };
  });
}); 