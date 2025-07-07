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
    duracion: '24 sesiones / 6 meses',
    precio: {
      cuotas: 6,
      importe: 85,
      matricula: 150
    },
    practicas: 'Opción doble diploma + Agencia colocación oficial',
    profesor: 'Livia Bernardi (Fundadora Aboras Obediencia)',
    certificacion: 'Preparación para examen ANACP + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Livia Bernardi',
      foto: '/images/profesores/livia.jpg',
      especialidad: 'Fundadora de Aboras Obediencia',
      descripcion: 'Profesional en activo con amplia experiencia docente en el sector del adiestramiento canino. Especialista en técnicas de modificación de conducta y educación canina. Preparación específica para el examen oficial ANACP.'
    },
    modalidadInfo: {
      tipo: 'Clases presenciales en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '24 sesiones - 6 meses de duración',
      certificacion: 'Preparación para examen oficial ANACP + Opción doble diploma'
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
    duracion: '40 sesiones / 120 horas formación',
    precio: {
      cuotas: 10,
      importe: 200,
      matricula: 250
    },
    practicas: '160 horas prácticas en empresas del sector',
    certificacion: 'Diploma CEP Formación + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Esther González',
      foto: '/images/profesores/esther.jpg',
      especialidad: 'Especialista en Servicios Funerarios',
      descripcion: 'Profesional certificada en técnicas de conservación y embalsamamiento. Amplia experiencia en el sector funerario con conocimientos en normativa legal y procedimientos especializados.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica especializada en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '40 sesiones - 120 horas de formación',
      certificacion: 'Diploma especializado en servicios funerarios + Opción doble diploma'
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
    duracion: '36 sesiones / 72 horas formación',
    precio: {
      cuotas: 9,
      importe: 90,
      matricula: 150
    },
    practicas: '350 horas prácticas en clínicas veterinarias',
    certificacion: 'Diploma CEP en Auxiliar Clínico Veterinario + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Sara Jaquete',
      foto: '/images/profesores/sara.jpg',
      especialidad: 'Especialista en Medicina Veterinaria',
      descripcion: 'Veterinaria titulada con amplia experiencia en clínica de pequeños animales y animales exóticos. Especialista en técnicas diagnósticas avanzadas y cirugía veterinaria. Formadora certificada en auxiliar clínico.'
    },
    modalidadInfo: {
      tipo: 'Formación práctica intensiva en grupos reducidos',
      horario: '1 día por semana - 2 horas por sesión',
      sesiones: '36 sesiones - 72 horas de formación',
      certificacion: 'Diploma profesional + Opción doble diploma + Agencia colocación oficial'
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
    duracion: '36 sesiones / 72 horas formación',
    precio: {
      cuotas: 9,
      importe: 90,
      matricula: 150
    },
    practicas: '350 horas prácticas en clínicas veterinarias',
    certificacion: 'Diploma CEP en Auxiliar Clínico Veterinario + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Sara Jaquete',
      foto: '/images/profesores/sara.jpg',
      especialidad: 'Especialista en Medicina Veterinaria',
      descripcion: 'Veterinaria titulada con amplia experiencia en clínica de pequeños animales y animales exóticos. Especialista en técnicas diagnósticas avanzadas y cirugía veterinaria. Formadora certificada en auxiliar clínico.'
    },
    modalidadInfo: {
      tipo: 'Formación práctica intensiva en grupos reducidos',
      horario: '1 día por semana - 2 horas por sesión',
      sesiones: '36 sesiones - 72 horas de formación',
      certificacion: 'Diploma profesional + Opción doble diploma + Agencia colocación oficial'
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

  // 5. Auxiliar Clínicas Estéticas
  {
    slug: 'auxiliar-clinicas-esteticas-santacruz',
    nombre: 'Auxiliar Clínicas Estéticas',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-clinicas-esteticas-santacruz',
    inicio: 'Octubre 2025',
    imagen: '/images/cursos/auxiliar-de.jpg',
    temario: [
      'Anatomía y fisiología de la piel',
      'Técnicas de diagnóstico estético',
      'Protocolos de limpieza facial',
      'Aparatología estética básica',
      'Tratamientos corporales',
      'Depilación láser y técnicas avanzadas',
      'Atención al cliente y consulta estética',
      'Normativa sanitaria y seguridad',
      'Cosmética profesional aplicada'
    ],
    duracion: '40 sesiones / 120 horas formación',
    precio: {
      cuotas: 10,
      importe: 115,
      matricula: 150
    },
    practicas: '150 horas prácticas en empresas',
    certificacion: 'Diploma CEP + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Luis J. González',
      foto: '/images/profesores/luis.jpg',
      especialidad: 'Especialista en Medicina Estética',
      descripcion: 'Profesional certificado en medicina y tratamientos estéticos. Amplia experiencia en clínicas de belleza y centros de medicina estética. Formador especializado en técnicas avanzadas de estética profesional.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '40 sesiones - 120 horas de formación',
      certificacion: 'Diploma CEP + Opción doble diploma + Agencia colocación oficial'
    },
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

  // 6. Auxiliar de Enfermería Norte
  {
    slug: 'auxiliar-enfermeria-norte',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-enfermeria-norte',
    inicio: 'Noviembre 2025',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    temario: [
      'Anatomía y fisiología humana',
      'Técnicas básicas de enfermería',
      'Higiene y confort del paciente',
      'Administración de medicamentos',
      'Primeros auxilios y emergencias',
      'Cuidados de heridas y vendajes',
      'Atención a pacientes geriátricos',
      'Esterilización y control de infecciones',
      'Cuidados paliativos básicos',
      'Comunicación y atención al paciente'
    ],
    duracion: '40 sesiones / 120 horas formación',
    precio: {
      cuotas: 10,
      importe: 105,
      matricula: 150
    },
    practicas: '300 horas prácticas en empresas',
    certificacion: 'Diploma CEP + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Esther González',
      foto: '/images/profesores/esther.jpg',
      especialidad: 'Especialista en Enfermería y Cuidados Sanitarios',
      descripcion: 'Enfermera titulada con amplia experiencia en centros hospitalarios y atención primaria. Especialista en cuidados geriátricos y formación sanitaria. Docente certificada en auxiliar de enfermería.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '40 sesiones - 120 horas de formación',
      certificacion: 'Diploma CEP + Opción doble diploma + Agencia colocación oficial'
    },
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

  // 7. Auxiliar de Enfermería Santa Cruz
  {
    slug: 'auxiliar-enfermeria-santacruz',
    nombre: 'Auxiliar de Enfermería',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-enfermeria-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    temario: [
      'Anatomía y fisiología humana',
      'Técnicas básicas de enfermería',
      'Higiene y confort del paciente',
      'Administración de medicamentos',
      'Primeros auxilios y emergencias',
      'Cuidados de heridas y vendajes',
      'Atención a pacientes geriátricos',
      'Esterilización y control de infecciones',
      'Cuidados paliativos básicos',
      'Comunicación y atención al paciente'
    ],
    duracion: '40 sesiones / 120 horas formación',
    precio: {
      cuotas: 10,
      importe: 105,
      matricula: 150
    },
    practicas: '300 horas prácticas en empresas',
    certificacion: 'Diploma CEP + Opción doble diploma',
    profesorDetalle: {
      nombre: 'Esther González',
      foto: '/images/profesores/esther.jpg',
      especialidad: 'Especialista en Enfermería y Cuidados Sanitarios',
      descripcion: 'Enfermera titulada con amplia experiencia en centros hospitalarios y atención primaria. Especialista en cuidados geriátricos y formación sanitaria. Docente certificada en auxiliar de enfermería.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '40 sesiones - 120 horas de formación',
      certificacion: 'Diploma CEP + Opción doble diploma + Agencia colocación oficial'
    },
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

  // 8. Auxiliar Farmacia + Dermo Norte
  {
    slug: 'auxiliar-farmacia-dermo-norte',
    nombre: 'Auxiliar Farmacia + Dermocosmética',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    temario: [
      'ANATOMOPATOLOGÍA: Piel, sistemas corporales, primeros auxilios',
      'FARMACOLOGÍA: Medicamentos, dispensación, farmacovigilancia, interacciones',
      'PARAFARMACIA: Productos cosméticos, nutrición, productos sanitarios',
      'DERMOCOSMÉTICA: Productos y tratamientos específicos para la piel',
      'Biofarmacia y farmacocinética: procesos ADME y efectos farmacológicos',
      'Farmacología por sistemas y atención farmacéutica especializada',
      'Homeopatía y productos fitoterapéuticos: prescripción y dispensación',
      'Productos para situaciones especiales: embarazo, lactancia, pediatría',
      'Orientación laboral y técnicas de atención al cliente farmacéutico'
    ],
    duracion: '48 sesiones / 12 meses formación',
    precio: {
      cuotas: 12,
      importe: 100,
      matricula: 150
    },
    practicas: '350 horas prácticas en farmacias y parafarmacias + Agencia colocación oficial',
    profesor: 'Alexis Galán (Farmacéutico titulado)',
    certificacion: 'Diploma CEP en Auxiliar de Farmacia y Parafarmacia + Especialización Dermocosmética',
    profesorDetalle: {
      nombre: 'Alexis Galán',
      foto: '/images/profesores/alexis.jpg',
      especialidad: 'Farmacéutico Colegiado - Especialista en Dermocosmética',
      descripcion: 'Farmacéutico titulado con amplia experiencia en oficina de farmacia y especialización en dermocosmética. Experto en dispensación farmacéutica, productos parafarmacéuticos y asesoramiento dermofarmacológico. Formador certificado con experiencia docente en el sector.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica especializada en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '48 sesiones - 12 meses de duración',
      certificacion: 'Diploma profesional + Especialización Dermocosmética + Agencia colocación oficial'
    },
    copy: {
      slogan: "Especialízate como auxiliar de farmacia con dermocosmética - Prioridad Julio 2025",
      textosPrincipales: [
        "Formación integral en farmacia y parafarmacia",
        "Especialización en dermocosmética y productos de belleza",
        "350 horas de prácticas reales en empresas del sector",
        "Agencia de colocación oficial para inserción laboral"
      ],
      titulos: ["Farmacia Integral", "Dermocosmética", "Prácticas Reales", "Empleo Garantizado"],
      descripciones: [
        "Conocimientos completos en dispensación farmacéutica, medicamentos y productos sanitarios",
        "Especialización avanzada en productos cosméticos, dermocosmética y asesoramiento de belleza",
        "Experiencia práctica supervisada en farmacias y parafarmacias de prestigio",
        "Servicio de agencia de colocación oficial con alta tasa de inserción laboral en el sector"
      ]
    }
  },

  // 9. Auxiliar en Odontología Norte
  {
    slug: 'auxiliar-odontologia-norte',
    nombre: 'Auxiliar en Odontología',
    sede: 'Norte',
    tag: 'otono-2025-auxiliar-odontologia-norte',
    inicio: 'Noviembre 2025',
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
    duracion: '44 sesiones / 11 meses',
    precio: {
      cuotas: 11,
      importe: 110,
      matricula: 150
    },
    practicas: 'Prácticas en empresas + Bolsa de empleo',
    certificacion: 'Diploma CEP + Grupos reducidos + Agencia colocación oficial',
    profesorDetalle: {
      nombre: 'Nuria E. Ángel',
      foto: '/images/profesores/nuria.jpg',
      especialidad: 'Especialista en Odontología y Periodoncia',
      descripcion: 'Profesional dental con amplia experiencia en clínicas odontológicas. Especialista en periodoncia y formación de auxiliares dentales. Experta en técnicas de asistencia dental moderna.'
    },
    modalidadInfo: {
      tipo: 'Curso teórico-práctico en grupos reducidos',
      horario: '1 día por semana - 2.5 horas por sesión',
      sesiones: '44 sesiones - 11 meses de duración',
      certificacion: 'Diploma CEP + Prácticas en empresas + Bolsa de empleo + Agencia colocación oficial'
    },
    copy: {
      slogan: "Especialízate en técnicas avanzadas de asistencia dental",
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

  // 10. Auxiliar en Odontología Santa Cruz
  {
    slug: 'auxiliar-odontologia-santacruz',
    nombre: 'Auxiliar en Odontología',
    sede: 'Santa Cruz',
    tag: 'otono-2025-auxiliar-odontologia-santacruz',
    inicio: 'Noviembre 2025',
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
    duracion: '44 sesiones / 11 meses',
    precio: {
      cuotas: 11,
      importe: 110,
      matricula: 150
    },
    practicas: 'Prácticas en empresas + Bolsa de empleo',
    certificacion: 'Diploma CEP + Grupos reducidos + Agencia colocación oficial',
    profesorDetalle: {
      nombre: 'Nuria E. Ángel',
      foto: '/images/profesores/nuria.jpg',
      especialidad: 'Especialista en Odontología y Periodoncia',
      descripcion: 'Profesional dental con amplia experiencia en clínicas odontológicas. Especialista en periodoncia y formación de auxiliares dentales. Experta en técnicas de asistencia dental moderna.'
    },
    modalidadInfo: {
      tipo: 'Curso teórico-práctico en grupos reducidos',
      horario: '1 día por semana - 2.5 horas por sesión',
      sesiones: '44 sesiones - 11 meses de duración',
      certificacion: 'Diploma CEP + Prácticas en empresas + Bolsa de empleo + Agencia colocación oficial'
    },
    copy: {
      slogan: "Especialízate en técnicas avanzadas de asistencia dental",
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
    duracion: '32 sesiones',
    precio: {
      cuotas: 8,
      importe: 105,
      matricula: 150
    },
    practicas: '150 horas prácticas en empresas',
    certificacion: 'Título oficial + Grupos reducidos + Agencia colocación oficial',
    profesorDetalle: {
      nombre: 'Cecilia',
      foto: '/images/profesores/cecilia.jpg',
      especialidad: 'Especialista en Dietética y Nutrición',
      descripcion: 'Profesional titulada en Nutrición y Dietética con experiencia en consulta nutricional y planificación dietética. Especialista en nutrición clínica y educación alimentaria.'
    },
    modalidadInfo: {
      tipo: 'Formación teórico-práctica en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '32 sesiones de formación',
      certificacion: 'Título oficial + Agencia colocación oficial + Grupos reducidos'
    },
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
    imagen: '/images/cursos/peluqueria-canina.jpg',
    temario: [
      'Anatomía y morfología canina y felina',
      'Higiene e identificación de problemas cutáneos',
      'Técnicas de corte según razas',
      'Estética canina y felina avanzada',
      'Manejo y sujeción de animales',
      'Cuidados específicos por tipo de pelo',
      'Herramientas y productos profesionales',
      'Normativa y seguridad en centros',
      'Atención al cliente especializada'
    ],
    duracion: '8 meses / 32 sesiones',
    precio: {
      cuotas: 8,
      importe: 95,
      matricula: 150
    },
    practicas: '120 horas prácticas en centros especializados',
    profesorDetalle: {
      nombre: 'Sara Jaquete',
      foto: '/images/profesores/sara.jpg',
      especialidad: 'Especialista en Peluquería Canina y Felina',
      descripcion: 'Veterinaria especializada en cuidado estético de animales de compañía. Experta en técnicas de peluquería canina y felina profesional. Formadora certificada en manejo y estética animal.'
    },
    modalidadInfo: {
      tipo: 'Formación práctica especializada',
      horario: '2 días por semana - 3 horas por sesión',
      sesiones: '32 sesiones - 8 meses de duración',
      certificacion: 'Diploma especializado en peluquería canina y felina'
    },
    copy: {
      slogan: "Especialízate en estética y cuidado profesional de mascotas",
      textosPrincipales: [
        "Técnicas profesionales de peluquería canina y felina",
        "Manejo especializado de diferentes razas",
        "Cuidados estéticos avanzados para mascotas"
      ],
      titulos: [
        "Formación especializada",
        "Técnicas profesionales",
        "Salidas laborales"
      ],
      descripciones: [
        "Aprende las técnicas más avanzadas de peluquería canina y felina con profesionales del sector",
        "Domina el manejo de diferentes razas y técnicas de corte específicas para cada tipo de animal",
        "Accede a un sector en crecimiento con múltiples oportunidades laborales en centros especializados"
      ]
    }
  },

  // 14. Quiromasaje Nivel I Norte (NUEVO CURSO SEGÚN BROCHURE)
  {
    slug: 'quiromasaje-nivel1-norte',
    nombre: 'Quiromasaje Nivel I',
    sede: 'Norte',
    tag: 'otono-2025-quiromasaje-nivel1-norte',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/quiromasaje-nivel-1.jpg',
    temario: [
      'Anatomía y fisiología del aparato locomotor',
      'Técnicas básicas de quiromasaje',
      'Masaje de relajación y descontracturante',
      'Técnicas de palpación y exploración',
      'Maniobras básicas del masaje terapéutico',
      'Indicaciones y contraindicaciones',
      'Posturas y ergonomía del terapeuta',
      'Protocolos de actuación básicos',
      'Ética profesional y relación terapéutica'
    ],
    duracion: '24 sesiones / 6 meses',
    precio: {
      cuotas: 6,
      importe: 85,
      matricula: 150
    },
    practicas: '50 horas prácticas en empresas',
    certificacion: 'Bolsa empleo + Agencia colocación oficial',
    profesorDetalle: {
      nombre: 'Luis J. González',
      foto: '/images/profesores/luis.jpg',
      especialidad: 'Especialista en Quiromasaje y Terapias Manuales',
      descripcion: 'Profesional certificado en quiromasaje y técnicas de terapia manual. Especialista en tratamientos de relajación y bienestar. Amplia experiencia en centros de fisioterapia y wellness.'
    },
    modalidadInfo: {
      tipo: 'Formación presencial en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '24 sesiones - 6 meses de duración',
      certificacion: 'Certificado profesional + Bolsa empleo + Agencia colocación oficial'
    },
    copy: {
      slogan: "Iníciate en el quiromasaje terapéutico profesional",
      textosPrincipales: [
        "Formación completa en quiromasaje básico",
        "Técnicas terapéuticas fundamentales",
        "Preparación para el ejercicio profesional"
      ],
      titulos: [
        "Técnicas fundamentales",
        "Formación práctica",
        "Oportunidades profesionales"
      ],
      descripciones: [
        "Domina las técnicas básicas del quiromasaje terapéutico con metodología práctica y profesional",
        "Aprende mediante práctica supervisada las maniobras esenciales del masaje rehabilitador",
        "Accede a un sector de alta demanda con posibilidades de autoempleo y trabajo en centros"
      ]
    }
  },

  // 15. Quiromasaje Nivel II Santa Cruz
  {
    slug: 'quiromasaje-nivel2-santacruz',
    nombre: 'Quiromasaje Nivel II',
    sede: 'Santa Cruz', 
    tag: 'otono-2025-quiromasaje-nivel2-santacruz',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/quiromasaje-nivel-2.jpg',
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
    duracion: '20 sesiones / 5 meses',
    precio: {
      cuotas: 5,
      importe: 85,
      matricula: 150
    },
    practicas: '50 horas prácticas en empresas',
    certificacion: 'Bolsa empleo + Agencia colocación oficial',
    profesorDetalle: {
      nombre: 'Luis J. González',
      foto: '/images/profesores/luis.jpg',
      especialidad: 'Especialista en Quiromasaje y Terapias Manuales',
      descripcion: 'Profesional certificado en quiromasaje y técnicas de terapia manual avanzada. Especialista en tratamientos de rehabilitación y bienestar. Amplia experiencia en centros de fisioterapia y wellness.'
    },
    modalidadInfo: {
      tipo: 'Formación presencial en grupos reducidos',
      horario: '1 día por semana - 3 horas por sesión',
      sesiones: '20 sesiones - 5 meses de duración',
      certificacion: 'Certificado profesional + Bolsa empleo + Agencia colocación oficial'
    },
    copy: {
      slogan: "Especialízate en técnicas avanzadas de quiromasaje terapéutico",
      textosPrincipales: [
        "Técnicas avanzadas de masaje terapéutico",
        "Especialización en patologías musculares",
        "Preparación para autoempleo profesional"
      ],
      titulos: [
        "Técnicas Avanzadas",
        "Especialización",
        "Autoempleo"
      ],
      descripciones: [
        "Domina las técnicas más avanzadas del quiromasaje con enfoque terapéutico especializado",
        "Especialízate en el tratamiento de patologías específicas del sistema locomotor",
        "Preparación completa para ejercer como profesional independiente o en centros especializados"
      ]
    }
  },

  // 16. Quiromasaje Nivel II Norte
  {
    slug: 'quiromasaje-nivel2-norte',
    nombre: 'Quiromasaje Nivel II',
    sede: 'Norte',
    tag: 'otono-2025-quiromasaje-nivel2-norte',
    inicio: 'Julio 2025',
    imagen: '/images/cursos/quiromasaje-nivel-2.jpg',
    temario: [
      'Masaje terapéutico: indicaciones, contraindicaciones y pautas',
      'Técnicas funcionales (Jones) y estructurales (inhibición, miotensiva)',
      'Tests de valoración: ruptura, contrarresistencia y movimiento articular',
      'Fricción transversa profunda de Cyriax (F.T.P.)',
      'Crioterapia, termoterapia y baños de contraste',
      'Tratamiento de lesiones musculares, tendinosas y articulares',
      'Masaje deportivo: pre-competición, post-competición y de entrenamiento',
      'Orientación laboral y gestión de clientes en bienestar'
    ],
    duracion: '20 sesiones / 5 meses',
    precio: {
        cuotas: 5,
        importe: 85,
        matricula: 150
    },
    practicas: '50 horas prácticas en empresas',
    certificacion: 'Diploma CEP en Quiromasaje Nivel II',
    profesorDetalle: {
        nombre: 'Marco',
        foto: '/images/profesores/luis.jpg', // Placeholder hasta tener foto de Marco
        especialidad: 'Especialista en Quiromasaje y Terapias Manuales',
        descripcion: 'Profesional certificado en quiromasaje y técnicas de terapia manual avanzada. Especialista en tratamientos de rehabilitación y bienestar. Amplia experiencia en centros de fisioterapia y wellness.'
    },
    modalidadInfo: {
        tipo: 'Formación presencial en grupos reducidos',
        horario: '1 día por semana - 3 horas por sesión',
        sesiones: '20 sesiones - 5 meses de duración',
        certificacion: 'Diploma profesional + Opción doble diploma + Agencia de colocación'
    },
    copy: {
        slogan: "Tu cuerpo es tu compañero de vida. Cuídalo, escúchalo, atiéndelo.",
        textosPrincipales: [
            "Conocimientos avanzados de las principales técnicas del masaje deportivo y terapéutico, anatomía y trato al paciente.",
            "Adquiere la confianza, habilidades y conocimientos para trabajar en balnearios, spas, gimnasios, o abrir tu propio centro.",
            "Curso práctico para trabajar como quiromasajista en centros spa, deportivos y hoteles."
        ],
        titulos: ["Especialista en Masaje Deportivo", "Experto en Masaje Terapéutico", "Prácticas en Empresas del Sector"],
        descripciones: [
            "Aprende las técnicas de masaje deportivo para antes, durante y después de la competición.",
            "Domina el tratamiento de lesiones comunes como contracturas, tendinitis y esguinces.",
            "Realiza 50 horas de prácticas en empresas para una inserción laboral real y efectiva."
        ]
    }
  },

  // 17. CICLO FORMATIVO DE GRADO SUPERIOR HIGIENE BUCODENTAL (OFICIAL)
  {
    slug: 'cfgs-higiene-bucodental-santacruz',
    nombre: 'Ciclo Formativo de Grado Superior Higiene Bucodental',
    sede: 'Santa Cruz',
    tag: 'otono-2025-cfgs-higiene-bucodental-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    temario: [
      'Módulo 1: Recepción y logística en la clínica dental',
      'Módulo 2: Estudio de la cavidad oral',
      'Módulo 3: Exploración de la cavidad oral',
      'Módulo 4: Intervención bucodental',
      'Módulo 5: Epidemiología en salud oral',
      'Módulo 6: Educación para la salud oral',
      'Módulo 7: Conservadora, periodoncia, cirugía e implantes',
      'Módulo 8: Prótesis y ortodoncia',
      'Módulo 9: Primeros auxilios',
      'Módulo 10: Formación y orientación laboral',
      'Módulo 11: Empresa e iniciativa emprendedora',
      'Módulo 12: Formación en centros de trabajo'
    ],
    duracion: '3 cursos escolares - Modalidad semipresencial',
    precio: {
      cuotas: 30, // 10 cuotas por año académico durante 3 años
      importe: 160, // Precio contado: 30 × 160€ = 4.800€ + 200€ matrícula = 5.000€
      matricula: 200
    },
    practicas: 'Prácticas con pacientes reales desde 1º año + 350h en empresa',
    certificacion: 'Título oficial MEC - Centro autorizado Nº 38017275',
    // profesorDetalle: Sin profesor asignado actualmente según datos oficiales CEP
    modalidadInfo: {
      tipo: 'Ciclo Formativo Oficial homologado por el Ministerio de Educación y Formación Profesional - Centro autorizado por Consejería de Educación',
      horario: 'Semipresencial - Miércoles 17:00-21:00h',
      sesiones: '3 cursos escolares (septiembre a junio cada año)',
      certificacion: 'Título oficial expedido por el Ministerio de Educación y Formación Profesional - Acceso becas MEC'
    },
    copy: {
      slogan: "Conviértete en Higienista Bucodental con Título Oficial homologado por el Ministerio de Educación",
      textosPrincipales: [
        "Título oficial homologado por el Ministerio de Educación y Formación Profesional",
        "3 cursos escolares con prácticas reales desde 1º año",
        "Centro autorizado por Consejería de Educación - Becas MEC disponibles"
      ],
      titulos: [
        "Titulación Oficial MEC",
        "Prácticas Reales 3 Años",
        "Becas MEC Disponibles"
      ],
      descripciones: [
        "Formación oficial reconocida por el Ministerio de Educación con validez nacional. Incluye libros, uniforme, material prácticas, plataforma online y clases grabadas",
        "Prácticas con pacientes reales desde el primer año en higiene bucodental bajo supervisión profesional durante los 3 cursos escolares",
        "Puedes solicitar becas del Ministerio de Educación. Trabajarás en centros privados y concertados con título oficial homologado por el MEC"
      ]
    }
  },

  // 18. CICLO FORMATIVO DE GRADO MEDIO FARMACIA Y PARAFARMACIA (OFICIAL)
  {
    slug: 'cfgm-farmacia-parafarmacia-santacruz',
    nombre: 'Ciclo Formativo de Grado Medio Farmacia y Parafarmacia',
    sede: 'Santa Cruz',
    tag: 'otono-2025-cfgm-farmacia-parafarmacia-santacruz',
    inicio: 'Septiembre 2025',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    temario: [
      'Módulo 1: Oficina de farmacia',
      'Módulo 2: Dispensación de productos farmacéuticos',
      'Módulo 3: Dispensación de productos parafarmacéuticos',
      'Módulo 4: Operaciones básicas de laboratorio',
      'Módulo 5: Formulación magistral',
      'Módulo 6: Promoción de la salud',
      'Módulo 7: Primeros auxilios',
      'Módulo 8: Anatomofisiología y patología básicas',
      'Módulo 9: Formación y orientación laboral',
      'Módulo 10: Empresa e iniciativa emprendedora',
      'Módulo 11: Formación en centros de trabajo'
    ],
    duracion: '3 cursos escolares - Modalidad semipresencial',
    precio: {
      cuotas: 30, // 10 cuotas por año académico durante 3 años
      importe: 160, // Precio contado: 30 × 160€ = 4.800€ + 200€ matrícula = 5.000€
      matricula: 200
    },
    practicas: 'Aula práctica con material real + 350 horas en farmacias',
    certificacion: 'Título oficial MEC - Centro autorizado Nº 38017275',
    profesorDetalle: {
      nombre: 'Alexis Galán',
      foto: '/images/profesores/alexis.jpg',
      especialidad: 'Farmacéutico especialista en Farmacia Comunitaria',
      descripcion: 'Farmacéutico titulado con amplia experiencia en farmacia comunitaria y hospitalaria. Especialista en formulación magistral y atención farmacéutica. Formador oficial de ciclos formativos sanitarios.'
    },
    modalidadInfo: {
      tipo: 'Ciclo Formativo Oficial homologado por el Ministerio de Educación y Formación Profesional - Centro autorizado por Consejería de Educación',
      horario: 'Semipresencial - Jueves 17:00-21:00h',
      sesiones: '3 cursos escolares (septiembre a junio cada año)',
      certificacion: 'Título oficial expedido por el Ministerio de Educación y Formación Profesional - Acceso becas MEC'
    },
    copy: {
      slogan: "Técnico oficial en Farmacia y Parafarmacia - Título homologado por el Ministerio de Educación",
      textosPrincipales: [
        "Título oficial homologado por el Ministerio de Educación y Formación Profesional",
        "3 cursos escolares con prácticas en farmacias reales",
        "Centro autorizado por Consejería de Educación - Becas MEC disponibles"
      ],
      titulos: [
        "Titulación Oficial MEC",
        "Prácticas Farmacia Real",
        "Becas MEC Disponibles"
      ],
      descripciones: [
        "Formación oficial reconocida por el Ministerio de Educación con validez nacional. Incluye libros, uniforme, material prácticas, plataforma online y clases grabadas",
        "Prácticas en farmacias y parafarmacias reales durante los 3 cursos escolares con experiencia profesional supervisada",
        "Puedes solicitar becas del Ministerio de Educación. Trabajarás en centros privados y concertados con título oficial homologado por el MEC"
      ]
    }
  }
]; 