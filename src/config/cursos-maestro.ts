export type Modulo = {
  titulo: string;
  contenido: string[];
};

export type Profesor = {
  nombre: string;
  foto: string;
  bio: string;
};

export type Entidad = {
  nombre: string;
  logo: string;
};

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
  
  descripcionDetallada?: {
    introduccion: string;
    queAprendes: string;
    puntosClave: { icono: string; texto: string }[];
  };
  modulos?: Modulo[];
  salidasProfesionales?: string[];
  profesores?: Profesor[];
  certificaciones?: Entidad[];
  colaboradores?: Entidad[];

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
      textosPrincipales: ['Anatomía Animal', 'Asistencia Quirúrgica'],
      titulos: ['Anatomía Animal', 'Asistencia Quirúrgica']
    },
    descripcionDetallada: {
      introduccion: "Conviértete en un profesional especializado en el cuidado y asistencia técnica veterinaria, con amplias salidas laborales en clínicas y hospitales veterinarios.",
      queAprendes: "El curso de Auxiliar Técnico Veterinario (ATV) te prepara para trabajar como asistente especializado en clínicas y hospitales veterinarios, proporcionando cuidados técnicos profesionales a todo tipo de animales. Adquirirás las competencias profesionales para asistir en consultas, cirugías, laboratorio, hospitalización y todas las áreas de una clínica veterinaria moderna.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses de duración' },
        { icono: 'Users', texto: 'Modalidad Presencial' },
        { icono: 'Award', texto: '300h de Prácticas Garantizadas' }
      ]
    },
    modulos: [
      { titulo: "MÓDULO 1: ANATOMÍA Y FISIOLOGÍA ANIMAL", contenido: ["Anatomía y fisiología de los sistemas corporales", "Aparato locomotor: huesos, músculos y articulaciones", "Sistema nervioso y órganos de los sentidos", "Aparato circulatorio y respiratorio", "Aparato digestivo y sistema urinario", "Aparato reproductor", "Sistema endocrino", "Diferencias anatómicas entre especies"] },
      { titulo: "MÓDULO 2: PATOLOGÍA ANIMAL", contenido: ["Concepto de enfermedad y etiología", "Enfermedades infecciosas más comunes", "Enfermedades parasitarias", "Enfermedades metabólicas", "Traumatología veterinaria", "Oncología veterinaria básica", "Enfermedades hereditarias", "Zoonosis y salud pública"] },
      { titulo: "MÓDULO 3: TÉCNICAS DE EXPLORACIÓN CLÍNICA", contenido: ["Manejo y sujeción de animales", "Constantes vitales en diferentes especies", "Técnicas de exploración física", "Auscultación y palpación", "Inspección y observación clínica", "Registro de datos clínicos", "Comunicación con propietarios"] },
      { titulo: "MÓDULO 4: TÉCNICAS DE LABORATORIO", contenido: ["Toma de muestras biológicas", "Análisis de sangre básicos", "Análisis de orina", "Análisis coprológicos", "Citología básica", "Microbiología veterinaria", "Uso de equipos de laboratorio", "Interpretación de resultados básicos"] },
      { titulo: "MÓDULO 5: TÉCNICAS DE IMAGEN", contenido: ["Radiología veterinaria", "Posicionamiento para radiografías", "Protección radiológica", "Ecografía básica", "Endoscopia", "Mantenimiento de equipos", "Archivo y documentación de imágenes"] },
      { titulo: "MÓDULO 6: FARMACOLOGÍA VETERINARIA", contenido: ["Principios de farmacología", "Vías de administración de medicamentos", "Cálculo de dosis", "Medicamentos más utilizados", "Anestesia y analgesia", "Vacunas y programas de vacunación", "Almacenamiento de medicamentos", "Legislación farmacéutica veterinaria"] },
      { titulo: "MÓDULO 7: CIRUGÍA VETERINARIA", contenido: ["Instrumental quirúrgico", "Preparación del campo quirúrgico", "Esterilización y desinfección", "Asistencia en cirugía", "Anestesia y monitorización", "Cuidados postoperatorios", "Suturas básicas", "Urgencias quirúrgicas"] },
      { titulo: "MÓDULO 8: HOSPITALIZACIÓN Y CUIDADOS INTENSIVOS", contenido: ["Manejo de pacientes hospitalizados", "Fluidoterapia", "Alimentación de pacientes críticos", "Monitorización de constantes", "Cuidados de heridas", "Administración de medicamentos", "Fisioterapia veterinaria básica", "Eutanasia y manejo del dolor"] },
      { titulo: "MÓDULO 9: MEDICINA PREVENTIVA", contenido: ["Programas de vacunación", "Desparasitaciones", "Medicina preventiva por especies", "Nutrición animal", "Bienestar animal", "Programas sanitarios", "Educación sanitaria a propietarios"] },
      { titulo: "MÓDULO 10: GESTIÓN Y ADMINISTRACIÓN", contenido: ["Organización de la clínica veterinaria", "Atención al cliente", "Gestión de historiales clínicos", "Facturación y cobros", "Gestión de stock y almacén", "Legislación veterinaria", "Ética profesional", "Primeros auxilios en humanos"] }
    ],
    salidasProfesionales: [
      "Clínicas Veterinarias",
      "Hospitales Veterinarios 24h",
      "Consultorios Veterinarios",
      "Centros de Acogida de Animales",
      "Residencias Caninas y Felinas",
      "Tiendas de Animales Especializadas",
      "Laboratorios de Diagnóstico Veterinario",
      "Empresas de Nutrición Animal",
      "Centros de Cría de Animales",
      "Zoológicos y Reservas Naturales"
    ],
    profesores: [
      { nombre: "Dr. Luis Martínez", foto: "/images/profesores/luis.jpg", bio: "Veterinario con más de 15 años de experiencia en cirugía y medicina interna. Apasionado por la enseñanza y el bienestar animal." },
      { nombre: "Dra. Sara Gutiérrez", foto: "/images/profesores/sara.jpg", bio: "Especialista en animales exóticos y diagnóstico por imagen. Su enfoque práctico facilita el aprendizaje de las técnicas más complejas." }
    ],
    certificaciones: [
      { nombre: 'Ministerio de Educación', logo: '/images/certificaciones/ministerio-educacion.png' },
      { nombre: 'Gobierno de Canarias', logo: '/images/certificaciones/gobierno-canarias.png' },
      { nombre: 'SEPE', logo: '/images/certificaciones/sepe.png' }
    ],
    colaboradores: [
      { nombre: 'Valle Colino', logo: '/images/ongs/valle-colino-logo.jpg' },
      { nombre: 'Clínica Veterinaria Anaza', logo: '/images/colaboradores/clinica-anaza-logo.jpg' },
      { nombre: 'Clínica Veterinaria Duggi', logo: '/images/colaboradores/clinica-duggi-logo.jpg' }
    ]
  },
  { 
    nombre: 'Auxiliar Clínicas Estéticas', 
    slugBase: 'auxiliar-clinicas-esteticas',
    imagen: '/images/cursos/auxiliar-de.jpg',
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
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    copy: {
      slogan: 'Tu título oficial para una carrera en salud dental.',
      textosPrincipales: ['Texto principal 1', 'Texto principal 2'],
      titulos: ['Educación Sanitaria', 'Odontología Preventiva']
    }
  },
  { 
    nombre: 'CFGM Farmacia y Parafarmacia', 
    slugBase: 'cfgm-farmacia-parafarmacia',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
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