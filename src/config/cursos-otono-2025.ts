export interface CursoData {
  slug: string;
  nombre: string;
  sede: string;
  tag: string;
  inicio: string;
  imagen: string;
  temario?: string[];
  duracion?: string;
  precio?: {
    cuotas: number;
    importe: number;
    matricula: number;
  };
  practicas?: string;
  profesor?: string;
  certificacion?: string;
  profesorDetalle?: {
    nombre: string;
    foto: string;
    especialidad: string;
    descripcion: string;
  };
  modalidadInfo?: {
    tipo: string;
    horario: string;
    sesiones: string;
    certificacion: string;
  };
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
    descripciones: string[];
  };
}

export const cursoData = [
  // 1. Adiestramiento Canino
  {
    slug: 'adiestramiento-canino-norte',
    nombre: 'Adiestramiento Canino',
    sede: 'Norte',
    tag: 'otono-2025-adiestramiento-canino-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/adiestramiento-canino.jpg',
    temario: [
      'Módulo 1: Técnicas de adiestramiento de base aplicadas a perros',
      'Módulo 2: Modificación de conductas no deseadas en perros',
      'Módulo 3: Adiestramiento básico y obediencia',
      'Módulo 4: Análisis del comportamiento canino y etología'
    ],
    duracion: '25 sesiones / 6 meses',
    precio: {
      cuotas: 6,
      importe: 85,
      matricula: 150
    },
    profesor: 'Livia Bernardi (Fundadora Aboras Obediencia)',
    certificacion: 'Preparación para examen ANACP',
    profesorDetalle: {
      nombre: 'Livia Bernardi',
      foto: '/images/profesores/livia.jpg',
      especialidad: 'Fundadora de Aboras Obediencia',
      descripcion: 'Profesional en activo con amplia experiencia docente en el sector del adiestramiento canino. Especialista en técnicas de modificación de conducta y educación canina. Preparación específica para el examen oficial ANACP.'
    },
    modalidadInfo: {
      tipo: 'Clases presenciales en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '25 sesiones - 6 meses de duración',
      certificacion: 'Preparación para examen oficial ANACP'
    },
    copy: {
      slogan: "Conviértete en experto en adiestramiento canino con técnicas profesionales",
      textosPrincipales: [
        "Aprende las técnicas más efectivas de adiestramiento canino",
        "Domina la modificación de conductas no deseadas",
        "Forma parte de una profesión en alta demanda"
      ],
      titulos: ["Técnicas Profesionales", "Modificación Conductual", "Certificación ANACP"],
      descripciones: [
        "Técnicas de adiestramiento de base y obediencia aplicadas a perros de todas las razas y edades",
        "Métodos profesionales para corregir conductas problemáticas y mejorar el vínculo perro-propietario",
        "Preparación específica para el examen de la Asociación Nacional de Adiestradores Caninos Profesionales"
      ]
    }
  },

  // 2. Agente Funerario
  {
    slug: 'agente-funerario-santacruz',
    nombre: 'Agente Funerario',
    sede: 'Santa Cruz',
    tag: 'otono-2025-agente-funerario-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    temario: [
      'Conservación transitoria y embalsamamiento del cadáver',
      'Técnicas de restauración y reconstrucción en cadáveres',
      'Presentación y exposición del cadáver',
      'Extracción de tejidos, prótesis y dispositivos',
      'Normativa funeraria y aspectos legales',
      'Productos biocidas y técnicas de conservación'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 95,
      matricula: 150
    },
    practicas: '120 horas prácticas en empresas del sector',
    certificacion: 'Diploma CEP Formación especializado',
    profesorDetalle: {
      nombre: 'Esther González',
      foto: '/images/profesores/esther.jpg',
      especialidad: 'Especialista en Servicios Funerarios',
      descripcion: 'Profesional certificada en técnicas de conservación y embalsamamiento. Amplia experiencia en el sector funerario con conocimientos en normativa legal y procedimientos especializados.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica especializada',
      horario: '2 días por semana - 4 horas por sesión',
      sesiones: '32 sesiones - 8 meses de duración',
      certificacion: 'Diploma especializado en servicios funerarios'
    },
    copy: {
      slogan: "Especialízate en servicios funerarios con formación técnica avanzada",
      textosPrincipales: [
        "Aprende técnicas de conservación y embalsamamiento",
        "Domina los procedimientos de restauración",
        "Accede a un sector profesional estable"
      ],
      titulos: ["Conservación Profesional", "Técnicas Avanzadas", "Sector Estable"],
      descripciones: [
        "Conocimientos teóricos y prácticos de conservación transitoria con productos biocidas profesionales",
        "Técnicas especializadas de restauración y reconstrucción para la presentación digna del difunto",
        "Formación en un sector con alta demanda profesional y estabilidad laboral garantizada"
      ]
    }
  },

  // 3. Auxiliar Clínico Veterinario Norte
  {
    slug: 'auxiliar-clinico-veterinario-norte',
    nombre: 'Auxiliar Clínico Veterinario',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-clinico-veterinario-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    temario: [
      'Anatomía y fisiología animal (perros, gatos, animales exóticos)',
      'Funciones del auxiliar veterinario y atención al cliente',
      'Reproducción animal y cuidado de cachorros',
      'Nutrición animal especializada por especies',
      'Parasitología y enfermedades comunes',
      'Imagenología: rayos X, ecografía y TAC',
      'Análisis sanguíneos y procesamiento de muestras',
      'Inmunología y planes de vacunación',
      'Farmacología y toxicología veterinaria',
      'Cirugía: instrumentación y cuidados pre/post',
      'Etología y comportamiento animal'
    ],
    duracion: '9 meses / 36 sesiones',
    precio: {
      cuotas: 9,
      importe: 105,
      matricula: 150
    },
    practicas: '350 horas prácticas en clínicas veterinarias',
    certificacion: 'Diploma CEP en Auxiliar Clínico Veterinario',
    profesorDetalle: {
      nombre: 'Sara Jaquete',
      foto: '/images/profesores/sara.jpg',
      especialidad: 'Especialista en Medicina Veterinaria',
      descripcion: 'Veterinaria titulada con amplia experiencia en clínica de pequeños animales y animales exóticos. Especialista en técnicas diagnósticas avanzadas y cirugía veterinaria. Formadora certificada en auxiliar clínico.'
    },
    modalidadInfo: {
      tipo: 'Formación práctica intensiva',
      horario: '2 días por semana - 4 horas por sesión',
      sesiones: '36 sesiones - 9 meses de duración',
      certificacion: 'Diploma profesional con prácticas garantizadas'
    },
    copy: {
      slogan: "Conviértete en auxiliar veterinario con formación integral",
      textosPrincipales: [
        "Formación completa en clínica veterinaria",
        "Prácticas reales en empresas del sector",
        "Conocimientos en animales domésticos y exóticos"
      ],
      titulos: ["Clínica Integral", "Prácticas Reales", "Animales Diversos"],
      descripciones: [
        "Capacitación completa para trabajar en clínicas, hospitales veterinarios y centros de acogida animal",
        "350 horas de experiencia práctica supervisada en entornos profesionales reales",
        "Conocimientos especializados en perros, gatos, animales exóticos y especies marinas"
      ]
    }
  },

  // 4. Auxiliar Clínico Veterinario Santa Cruz
  {
    slug: 'auxiliar-clinico-veterinario-santacruz',
    nombre: 'Auxiliar Clínico Veterinario',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-clinico-veterinario-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    temario: [
      'Anatomía y fisiología animal (perros, gatos, animales exóticos)',
      'Funciones del auxiliar veterinario y atención al cliente',
      'Reproducción animal y cuidado de cachorros',
      'Nutrición animal especializada por especies',
      'Parasitología y enfermedades comunes',
      'Imagenología: rayos X, ecografía y TAC',
      'Análisis sanguíneos y procesamiento de muestras',
      'Inmunología y planes de vacunación',
      'Farmacología y toxicología veterinaria',
      'Cirugía: instrumentación y cuidados pre/post',
      'Etología y comportamiento animal'
    ],
    duracion: '9 meses / 36 sesiones',
    precio: {
      cuotas: 9,
      importe: 105,
      matricula: 150
    },
    practicas: '350 horas prácticas en clínicas veterinarias',
    copy: {
      slogan: "Conviértete en auxiliar veterinario con formación integral",
      textosPrincipales: [
        "Formación completa en clínica veterinaria",
        "Prácticas reales en empresas del sector", 
        "Conocimientos en animales domésticos y exóticos"
      ],
      titulos: ["Clínica Integral", "Prácticas Reales", "Animales Diversos"],
      descripciones: [
        "Capacitación completa para trabajar en clínicas, hospitales veterinarios y centros de acogida animal",
        "350 horas de experiencia práctica supervisada en entornos profesionales reales",
        "Conocimientos especializados en perros, gatos, animales exóticos y especies marinas"
      ]
    }
  },

  // 5. Auxiliar Clínicas Estéticas
  {
    slug: 'auxiliar-clinicas-esteticas-santacruz',
    nombre: 'Auxiliar de Clínicas Estéticas',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-clinicas-esteticas-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    temario: [
      'Unidad 1: Anatomía y fisiología de la piel',
      'Unidad 2: Cosmetología y productos estéticos',
      'Unidad 3: Técnicas de limpieza e higiene facial',
      'Unidad 4: Tratamientos faciales específicos',
      'Unidad 5: Técnicas corporales y masaje estético',
      'Unidad 6: Aparatología estética avanzada',
      'Unidad 7: Depilación y técnicas específicas',
      'Unidad 8: Atención al cliente y gestión de centro'
    ],
    duracion: '10 meses / 40 sesiones',
    precio: {
      cuotas: 10,
      importe: 110,
      matricula: 150
    },
    practicas: '150 horas prácticas en empresas del sector',
    copy: {
      slogan: "Especialízate en estética profesional con técnicas avanzadas",
      textosPrincipales: [
        "Domina las técnicas más avanzadas de estética",
        "Aprende el uso de aparatología profesional",
        "Accede a un sector en constante crecimiento"
      ],
      titulos: ["Técnicas Avanzadas", "Aparatología", "Sector Creciente"],
      descripciones: [
        "Formación integral en tratamientos faciales, corporales y técnicas estéticas de vanguardia",
        "Manejo profesional de equipos especializados en centros de estética de alta gama",
        "Sector con alta demanda laboral y excelentes oportunidades de desarrollo profesional"
      ]
    }
  },

  // 6. Auxiliar Enfermería Norte
  {
    slug: 'auxiliar-enfermeria-norte',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-enfermeria-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    temario: [
      'Técnicas básicas de enfermería y procedimientos',
      'Anatomía y fisiología del cuerpo humano',
      'Higiene y aseo del paciente',
      'Movilización y traslado de pacientes',
      'Constantes vitales y procedimientos relacionados',
      'Alimentación y nutrición hospitalaria',
      'Cuidados del paciente terminal',
      'Primeros auxilios básicos y avanzados',
      'Operaciones administrativas y documentación',
      'Prevención de infecciones y esterilización',
      'Gestión de residuos sanitarios'
    ],
    duracion: '10 meses / 40 sesiones',
    precio: {
      cuotas: 10,
      importe: 100,
      matricula: 150
    },
    practicas: '300 horas prácticas en centros sanitarios',
    copy: {
      slogan: "Forma parte del equipo sanitario con preparación profesional",
      textosPrincipales: [
        "Técnicas profesionales de cuidados sanitarios",
        "Prácticas en hospitales y centros médicos",
        "Profesión con alta demanda y estabilidad"
      ],
      titulos: ["Cuidados Profesionales", "Prácticas Hospitalarias", "Alta Demanda"],
      descripciones: [
        "Capacitación integral en técnicas de enfermería y cuidados especializados al paciente",
        "Experiencia práctica real en hospitales, centros de salud y consultas médicas",
        "Sector sanitario con excelentes oportunidades laborales y proyección profesional"
      ]
    }
  },

  // 7. Auxiliar Enfermería Santa Cruz
  {
    slug: 'auxiliar-enfermeria-santacruz',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-enfermeria-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    temario: [
      'Técnicas básicas de enfermería y procedimientos',
      'Anatomía y fisiología del cuerpo humano',
      'Higiene y aseo del paciente',
      'Movilización y traslado de pacientes',
      'Constantes vitales y procedimientos relacionados',
      'Alimentación y nutrición hospitalaria',
      'Cuidados del paciente terminal',
      'Primeros auxilios básicos y avanzados',
      'Operaciones administrativas y documentación',
      'Prevención de infecciones y esterilización',
      'Gestión de residuos sanitarios'
    ],
    duracion: '10 meses / 40 sesiones',
    precio: {
      cuotas: 10,
      importe: 100,
      matricula: 150
    },
    practicas: '300 horas prácticas en centros sanitarios',
    copy: {
      slogan: "Forma parte del equipo sanitario con preparación profesional",
      textosPrincipales: [
        "Técnicas profesionales de cuidados sanitarios",
        "Prácticas en hospitales y centros médicos",
        "Profesión con alta demanda y estabilidad"
      ],
      titulos: ["Cuidados Profesionales", "Prácticas Hospitalarias", "Alta Demanda"],
      descripciones: [
        "Capacitación integral en técnicas de enfermería y cuidados especializados al paciente",
        "Experiencia práctica real en hospitales, centros de salud y consultas médicas",
        "Sector sanitario con excelentes oportunidades laborales y proyección profesional"
      ]
    }
  },

  // 8. Auxiliar Farmacia con Dermocosmética Norte
  {
    slug: 'auxiliar-farmacia-dermo-norte',
    nombre: 'Auxiliar de Farmacia con Dermocosmética',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    temario: [
      'Anatomía y fisiología del cuerpo humano',
      'Funcionamiento de la oficina de farmacia',
      'El medicamento: administración, indicaciones y contraindicaciones',
      'Operaciones farmacéuticas y dispensación',
      'Farmacología básica y grupos terapéuticos',
      'Parafarmacia: productos de cuidado personal',
      'Dermocosmética especializada',
      'Productos de higiene y belleza',
      'Atención al cliente especializada',
      'Gestión de stocks y almacén farmacéutico'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 110,
      matricula: 150
    },
    practicas: '200 horas prácticas en farmacias',
    copy: {
      slogan: "Especialízate en farmacia y dermocosmética profesional",
      textosPrincipales: [
        "Conocimientos avanzados en farmacología",
        "Especialización en dermocosmética",
        "Sector con alta demanda profesional"
      ],
      titulos: ["Farmacología Avanzada", "Dermocosmética", "Alta Demanda"],
      descripciones: [
        "Formación integral en dispensación farmacéutica y asesoramiento especializado al cliente",
        "Conocimientos avanzados en productos dermocosméticos y tratamientos especializados",
        "Sector farmacéutico con excelentes oportunidades laborales y crecimiento profesional"
      ]
    }
  },

  // 9. Auxiliar Odontología Norte
  {
    slug: 'auxiliar-odontologia-norte',
    nombre: 'Auxiliar de Odontología + Periodoncia',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-odontologia-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    temario: [
      'Anatomía dental y estructuras bucales',
      'Planificación de tratamiento odontológico',
      'Procedimientos dentales asistenciales',
      'Esterilización y desinfección del equipo',
      'Preparación del área de tratamiento',
      'Radiología dental y procesamiento',
      'Materiales dentales y su aplicación',
      'Periodoncia: enfermedades de las encías',
      'Técnicas de limpieza especializada',
      'Educación para la salud bucodental'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 115,
      matricula: 150
    },
    practicas: '240 horas prácticas en clínicas dentales',
    copy: {
      slogan: "Especialízate en asistencia dental con técnicas avanzadas",
      textosPrincipales: [
        "Técnicas profesionales de asistencia dental",
        "Especialización en periodoncia",
        "Prácticas en clínicas especializadas"
      ],
      titulos: ["Asistencia Profesional", "Especialización", "Clínicas Reales"],
      descripciones: [
        "Formación completa en asistencia odontológica y manejo de instrumentación especializada",
        "Conocimientos avanzados en periodoncia y tratamiento de enfermedades periodontales",
        "Experiencia práctica en clínicas dentales con equipamiento profesional actualizado"
      ]
    }
  },

  // 10. Auxiliar Odontología Santa Cruz
  {
    slug: 'auxiliar-odontologia-santacruz',
    nombre: 'Auxiliar de Odontología + Periodoncia',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-odontologia-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    temario: [
      'Anatomía dental y estructuras bucales',
      'Planificación de tratamiento odontológico',
      'Procedimientos dentales asistenciales',
      'Esterilización y desinfección del equipo',
      'Preparación del área de tratamiento',
      'Radiología dental y procesamiento',
      'Materiales dentales y su aplicación',
      'Periodoncia: enfermedades de las encías',
      'Técnicas de limpieza especializada',
      'Educación para la salud bucodental'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 115,
      matricula: 150
    },
    practicas: '240 horas prácticas en clínicas dentales',
    copy: {
      slogan: "Especialízate en asistencia dental con técnicas avanzadas",
      textosPrincipales: [
        "Técnicas profesionales de asistencia dental",
        "Especialización en periodoncia",
        "Prácticas en clínicas especializadas"
      ],
      titulos: ["Asistencia Profesional", "Especialización", "Clínicas Reales"],
      descripciones: [
        "Formación completa en asistencia odontológica y manejo de instrumentación especializada",
        "Conocimientos avanzados en periodoncia y tratamiento de enfermedades periodontales",
        "Experiencia práctica en clínicas dentales con equipamiento profesional actualizado"
      ]
    }
  },

  // 11. Dietética y Nutrición Norte
  {
    slug: 'dietetica-nutricion-norte',
    nombre: 'Dietética y Nutrición',
    sede: 'Norte',
    tag: 'otono-2025-dietetica-nutricion-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/dietetica-nutricion.jpg',
    temario: [
      'Módulo 1: Anatomía y fisiología del aparato digestivo',
      'Módulo 2: Bromatología y ciencia de los alimentos',
      'Módulo 3: Nutrición en las diferentes etapas de la vida',
      'Módulo 4: Dietoterapia y nutrición clínica',
      'Módulo 5: Planificación de menús y dietas específicas'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 105,
      matricula: 150
    },
    practicas: '150 horas prácticas en centros especializados',
    copy: {
      slogan: "Conviértete en especialista en nutrición y alimentación saludable",
      textosPrincipales: [
        "Formación integral en dietética y nutrición",
        "Planificación de dietas personalizadas",
        "Sector en auge con alta demanda"
      ],
      titulos: ["Nutrición Integral", "Dietas Personalizadas", "Sector en Auge"],
      descripciones: [
        "Conocimientos científicos avanzados en alimentación, nutrición y planificación dietética",
        "Capacidad para diseñar planes nutricionales adaptados a diferentes necesidades y patologías",
        "Sector con crecimiento exponencial y múltiples oportunidades en centros de salud y wellness"
      ]
    }
  },

  // 12. Peluquería Canina y Felina Norte
  {
    slug: 'peluqueria-canina-felina-norte',
    nombre: 'Peluquería Canina y Felina',
    sede: 'Norte',
    tag: 'otono-2025-peluqueria-canina-felina-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/peluqueria-canina.jpg',
    temario: [
      'Anatomía y morfología canina y felina',
      'Técnicas de corte según raza y estándar',
      'Herramientas profesionales y su mantenimiento',
      'Productos de higiene y cosmética animal',
      'Técnicas de secado y acabados profesionales',
      'Cortes comerciales y de competición',
      'Atención y manejo de animales nerviosos',
      'Primeros auxilios básicos en animales',
      'Gestión de negocio y atención al cliente'
    ],
    duracion: '6 meses / 24 sesiones',
    precio: {
      cuotas: 6,
      importe: 95,
      matricula: 150
    },
    practicas: '100 horas prácticas con animales reales',
    copy: {
      slogan: "Domina el arte de la peluquería profesional para mascotas",
      textosPrincipales: [
        "Técnicas profesionales de corte y estilismo",
        "Trabajo con animales reales",
        "Negocio rentable y en crecimiento"
      ],
      titulos: ["Técnicas Profesionales", "Animales Reales", "Negocio Rentable"],
      descripciones: [
        "Formación especializada en técnicas de corte, styling y cuidado estético de perros y gatos",
        "Experiencia práctica directa con animales bajo supervisión profesional especializada",
        "Sector con alta demanda y excelentes oportunidades para emprendimiento propio"
      ]
    }
  },

  // 13. Peluquería Canina y Felina Santa Cruz
  {
    slug: 'peluqueria-canina-felina-santacruz',
    nombre: 'Peluquería Canina y Felina',
    sede: 'Santa Cruz',
    tag: 'otono-2025-peluqueria-canina-santacruz',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/mundo-animal.jpg',
    temario: [
      'Anatomía y morfología canina y felina',
      'Técnicas de corte según raza y estándar',
      'Herramientas profesionales y su mantenimiento',
      'Productos de higiene y cosmética animal',
      'Técnicas de secado y acabados profesionales',
      'Cortes comerciales y de competición',
      'Atención y manejo de animales nerviosos',
      'Primeros auxilios básicos en animales',
      'Gestión de negocio y atención al cliente'
    ],
    duracion: '6 meses / 24 sesiones',
    precio: {
      cuotas: 6,
      importe: 95,
      matricula: 150
    },
    practicas: '100 horas prácticas con animales reales',
    copy: {
      slogan: "Domina el arte de la peluquería profesional para mascotas",
      textosPrincipales: [
        "Técnicas profesionales de corte y estilismo",
        "Trabajo con animales reales",
        "Negocio rentable y en crecimiento"
      ],
      titulos: ["Técnicas Profesionales", "Animales Reales", "Negocio Rentable"],
      descripciones: [
        "Formación especializada en técnicas de corte, styling y cuidado estético de perros y gatos",
        "Experiencia práctica directa con animales bajo supervisión profesional especializada",
        "Sector con alta demanda y excelentes oportunidades para emprendimiento propio"
      ]
    }
  },

  // 14. Quiromasaje Nivel II Santa Cruz
  {
    slug: 'quiromasaje-nivel2-santacruz',
    nombre: 'Quiromasaje Nivel II',
    sede: 'Santa Cruz', 
    tag: 'otono-2025-quiromasaje-nivel2-santacruz',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    temario: [
      'Anatomía y fisiología del aparato locomotor avanzada',
      'Patologías del sistema muscoesquelético',
      'Técnicas de estiramientos terapéuticos',
      'Masaje reflejo del tejido conjuntivo',
      'Vendaje neuromuscular (Kinesiotaping)',
      'Técnicas de Jones para puntos gatillo',
      'Trabajo analítico por grupos musculares',
      'Protocolos de exploración y valoración',
      'Orientación del trabajo muscular personalizado'
    ],
    duracion: '10 meses / 40 sesiones',
    precio: {
      cuotas: 10,
      importe: 120,
      matricula: 150
    },
    practicas: '160 horas prácticas supervisadas + 100h externas',
    certificacion: 'Doble titulación: Técnico Especialista + Masaje Reflejo',
    copy: {
      slogan: "Especialízate en técnicas avanzadas de quiromasaje terapéutico",
      textosPrincipales: [
        "Técnicas avanzadas de masaje terapéutico",
        "Especialización en vendaje neuromuscular",
        "Doble certificación profesional"
      ],
      titulos: ["Técnicas Avanzadas", "Kinesiotaping", "Doble Certificación"],
      descripciones: [
        "Formación especializada en técnicas complejas de quiromasaje y terapias manuales avanzadas",
        "Dominio del vendaje neuromuscular y técnicas especializadas para deportistas y rehabilitación",
        "Doble titulación que amplía significativamente las oportunidades profesionales en el sector"
      ]
    }
  }
]; 