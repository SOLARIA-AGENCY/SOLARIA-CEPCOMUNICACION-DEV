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
    },
    descripcionDetallada: {
      introduccion: "El curso de Adiestramiento de base I ofrece los conocimientos imprescindibles acerca de las técnicas de adiestramiento de base aplicadas a perros, modificación de conductas no deseadas así como los cuidados básicos y primeros auxilios.",
      queAprendes: "Adquirirás la confianza, habilidades y conocimientos para trabajar como adiestrador canino o aplicarlo con nuestros queridos animales. Se incluye un módulo de orientación laboral, dinámico y actualizado.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 25 sesiones' },
        { icono: 'Users', texto: 'Prácticas con animales' },
        { icono: 'Award', texto: 'Preparación examen ANACP' }
      ]
    },
    modulos: [
      { titulo: "Módulo 1: Técnicas de adiestramiento de base aplicadas a perros", contenido: ["Comportamiento social y bases morfológicas de conducta en el perro.", "Morfología", "Factores básicos modificadores de la conducta y principios para su modificación.", "Biología, genética y ecología de la conducta.", "Aprendizaje no asociativo: habituación y sensibilización.", "Aprendizaje asociativo: condicionamiento clásico e instrumental.", "Programas básicos de obediencia y desarrollo de habilidades.", "Seguridad y autoprotección en el adiestramiento.", "Técnicas de manipulación y manejo.", "Bienestar animal: Leyes y normativas."] },
      { titulo: "Módulo 2: Modificación de conductas no deseadas en perros", contenido: ["Valoración de conductas no deseadas.", "Interpretación del lenguaje corporal canino.", "Reconocimiento de conductas generadas por patologías.", "Identificación de factores que producen conductas no deseadas.", "Identificación del tipo de agresión y su tratamiento.", "Medidas de autoprotección y bienestar animal."] },
      { titulo: "Módulo 3: Cuidados higiénicos aplicados a perros", contenido: ["Metodología y control de la alimentación y nutrición.", "Alojamiento y transporte, normativa.", "Cuidados higiénicos, control sanitario y estimulación."] },
      { titulo: "Módulo 4: Primeros Auxilios aplicados a Perros", contenido: ["Morfología y fisiología del perro.", "Diagnóstico y valoración inicial.", "Material de primeros auxilios y manejo.", "Administración de medicamentos.", "Técnicas de inmovilización y traslado.", "Masaje cardíaco."] }
    ],
    salidasProfesionales: [
      "Adiestrador canino profesional",
      "Educador canino en centros especializados",
      "Técnico en modificación de conducta",
      "Preparador para competiciones caninas",
      "Asesor en protectoras y refugios",
      "Colaborador en clínicas veterinarias"
    ]
  },
  { 
    nombre: 'Agente Funerario', 
    slugBase: 'agente-funerario', 
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    copy: {
      slogan: 'Fórmate en una profesión esencial y de gran demanda social.',
      textosPrincipales: ['Tanatopraxia', 'Protocolo Funerario'],
      titulos: ['Tanatopraxia', 'Protocolo Funerario']
    },
    descripcionDetallada: {
      introduccion: "El curso de Agente Funerario te prepara para trabajar en un sector de alta demanda y estabilidad laboral, brindando apoyo profesional a las familias en momentos difíciles.",
      queAprendes: "Adquirirás las competencias profesionales para gestionar servicios funerarios, protocolo ceremonial, tanatopraxia y atención psicológica especializada.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 30 sesiones' },
        { icono: 'Users', texto: 'Modalidad Presencial' },
        { icono: 'Award', texto: 'Prácticas en empresas' }
      ]
    },
    modulos: [
      { titulo: "MÓDULO 1: LEGISLACIÓN FUNERARIA", contenido: ["Normativa estatal y autonómica", "Ley de Sanidad Mortuoria", "Reglamentos de cementerios", "Protección de datos", "Derechos del consumidor", "Documentación legal obligatoria"] },
      { titulo: "MÓDULO 2: TANATOPRAXIA Y CONSERVACIÓN", contenido: ["Fundamentos de la tanatopraxia", "Técnicas de conservación temporal", "Preparación del difunto", "Productos químicos y aplicación", "Higiene y seguridad", "Equipos y materiales"] },
      { titulo: "MÓDULO 3: PSICOLOGÍA DEL DUELO", contenido: ["Proceso de duelo y sus fases", "Atención psicológica a familias", "Comunicación empática", "Manejo de situaciones difíciles", "Apoyo emocional", "Protocolos de acompañamiento"] },
      { titulo: "MÓDULO 4: CEREMONIAL Y PROTOCOLO", contenido: ["Organización de ceremonias religiosas y civiles", "Protocolo en velatorios", "Coordinación de actos funerarios", "Atención a diferentes culturas", "Gestión de espacios"] },
      { titulo: "MÓDULO 5: GESTIÓN ADMINISTRATIVA", contenido: ["Tramitación de documentos oficiales", "Gestión de seguros de decesos", "Facturación y presupuestos", "Relaciones con AAPP", "Gestión de cementerios", "Software del sector"] },
      { titulo: "MÓDULO 6: SERVICIOS FUNERARIOS ESPECIALIZADOS", contenido: ["Repatriación nacional e internacional", "Cremación: procedimientos y normativa", "Inhumación tradicional", "Servicios de memoria", "Flores y ornamentación", "Transporte funerario"] }
    ],
    salidasProfesionales: [
      "Funerarias y tanatorios",
      "Cementerios y crematorios",
      "Servicios de repatriación",
      "Empresas de seguros de decesos",
      "Gestión administrativa funeraria",
      "Asesor de servicios funerarios"
    ]
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
      textosPrincipales: ['Tratamientos Faciales', 'Aparatología Estética'],
      titulos: ['Tratamientos Faciales', 'Aparatología Estética']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Clínicas Estéticas te prepara para trabajar como especialista en tratamientos de belleza y cuidado estético, dominando las técnicas más modernas del sector.",
      queAprendes: "Adquirirás las competencias profesionales para realizar tratamientos faciales, corporales, depilación y manejo de aparatología estética avanzada.",
      puntosClave: [
        { icono: 'Clock', texto: '8 meses / 30 sesiones' },
        { icono: 'Users', texto: 'Modalidad Presencial' },
        { icono: 'Award', texto: '200h de Prácticas' }
      ]
    },
    modulos: [
      { titulo: "MÓDULO 1: INTRODUCCIÓN A LA ESTÉTICA", contenido: ["Historia y evolución de la estética", "Ética profesional", "Legislación y normativas", "Higiene y seguridad", "Organización del gabinete"] },
      { titulo: "MÓDULO 2: ANATOMÍA Y FISIOLOGÍA DE LA PIEL", contenido: ["Estructura de la piel", "Funciones de la piel", "Tipos de piel", "Proceso de envejecimiento", "Alteraciones comunes", "pH cutáneo"] },
      { titulo: "MÓDULO 3: COSMETOLOGÍA", contenido: ["Principios activos", "Formas cosméticas", "Cosméticos por tipo de piel", "Cosmética masculina", "Cosmética solar", "Cosmecéuticos"] },
      { titulo: "MÓDULO 4: TÉCNICAS DE DIAGNÓSTICO ESTÉTICO", contenido: ["Análisis facial con lupa y luz de Wood", "Técnicas de exploración cutánea", "Ficha técnica del cliente", "Fotografía estética", "Protocolos de diagnóstico"] },
      { titulo: "MÓDULO 5: TRATAMIENTOS FACIALES", contenido: ["Limpieza facial profunda", "Exfoliación mecánica y química", "Extracción de comedones", "Masajes faciales", "Mascarillas específicas", "Tratamientos anti-edad"] },
      { titulo: "MÓDULO 6: TRATAMIENTOS CORPORALES", contenido: ["Tratamientos reductores y reafirmantes", "Técnicas anti-celulíticas", "Drenaje linfático manual", "Exfoliación corporal", "Envolturas corporales", "Tratamientos de hidratación"] },
      { titulo: "MÓDULO 7: APARATOLOGÍA ESTÉTICA", contenido: ["Alta frecuencia", "Ultrasonidos", "Radiofrecuencia", "Cavitación", "Presoterapia", "Mantenimiento de equipos"] },
      { titulo: "MÓDULO 8: DEPILACIÓN", contenido: ["Métodos de depilación temporal", "Depilación con cera", "Depilación eléctrica", "Fotodepilación IPL", "Cuidados pre y post depilación", "Contraindicaciones"] }
    ],
    salidasProfesionales: [
      "Centros de estética",
      "Spas y centros wellness",
      "Clínicas de medicina estética",
      "Centros de depilación",
      "Gabinetes de estética propios",
      "Asesor de belleza en grandes superficies"
    ]
  },
  { 
    nombre: 'Auxiliar Enfermería', 
    slugBase: 'auxiliar-enfermeria',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    copy: {
      slogan: 'Una vocación de cuidado, una profesión de futuro.',
      textosPrincipales: ['Cuidados Básicos', 'Higiene y Movilización'],
      titulos: ['Cuidados Básicos', 'Higiene y Movilización']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Enfermería te prepara para trabajar como asistente sanitario especializado en hospitales, clínicas y centros de atención primaria, proporcionando cuidados básicos a los pacientes.",
      queAprendes: "Adquirirás las competencias profesionales para realizar técnicas básicas de enfermería, cuidados auxiliares y apoyo al personal sanitario cualificado.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: 'Modalidad Presencial' },
        { icono: 'Award', texto: '300h de Prácticas' }
      ]
    },
    modulos: [
      { titulo: "MÓDULO 1: ANATOMÍA Y FISIOLOGÍA HUMANA", contenido: ["Organización del cuerpo humano", "Sistema esquelético y muscular", "Sistema cardiovascular", "Sistema respiratorio", "Sistema digestivo", "Sistema nervioso", "Sistema endocrino", "Sistema genitourinario"] },
      { titulo: "MÓDULO 2: FUNDAMENTOS DE ENFERMERÍA", contenido: ["Historia de la enfermería", "Ética y deontología", "Comunicación terapéutica", "Educación para la salud", "Proceso de atención de enfermería", "Documentación sanitaria"] },
      { titulo: "MÓDULO 3: TÉCNICAS BÁSICAS DE ENFERMERÍA", contenido: ["Higiene y aseo del paciente", "Movilización y traslado", "Constantes vitales", "Administración de medicación", "Cuidados de heridas", "Técnicas de vendajes", "Sondajes y drenajes"] },
      { titulo: "MÓDULO 4: CUIDADOS AUXILIARES HOSPITALARIOS", contenido: ["Organización hospitalaria", "Unidades de hospitalización", "Cuidados pre y postoperatorios", "Urgencias y emergencias", "Cuidados intensivos", "Esterilización y desinfección"] },
      { titulo: "MÓDULO 5: CUIDADOS AUXILIARES EN GERIATRÍA", contenido: ["Proceso de envejecimiento", "Patologías geriátricas", "Cuidados específicos del anciano", "Prevención de caídas", "Estimulación cognitiva", "Cuidados paliativos"] },
      { titulo: "MÓDULO 6: PRIMEROS AUXILIOS", contenido: ["Evaluación inicial del paciente", "Reanimación cardiopulmonar (RCP)", "Atención a traumatismos", "Quemaduras y heridas", "Intoxicaciones", "Crisis convulsivas"] }
    ],
    salidasProfesionales: [
      "Hospitales públicos y privados",
      "Centros de atención primaria",
      "Clínicas especializadas (dentales, pediátricas, etc.)",
      "Residencias geriátricas",
      "Centros de día",
      "Atención domiciliaria"
    ]
  },
  { 
    nombre: 'Auxiliar Farmacia y Dermo', 
    slugBase: 'auxiliar-farmacia-dermo',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    copy: {
      slogan: 'Conviértete en un profesional clave en la oficina de farmacia.',
      textosPrincipales: ['Dispensación de Productos', 'Dermocosmética'],
      titulos: ['Dispensación de Productos', 'Dermocosmética']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Farmacia ofrece los conocimientos imprescindibles del funcionamiento de una oficina de farmacia, las funciones del auxiliar de farmacia y un módulo de orientación laboral, dinámico y actualizado.",
      queAprendes: "Adquirirás la confianza, habilidades y conocimientos para trabajar como Auxiliar en Farmacias o parafarmacias, y almacenes de medicamentos.",
      puntosClave: [
        { icono: 'Clock', texto: '12 meses / 48 sesiones' },
        { icono: 'Award', texto: '350h de Prácticas' },
        { icono: 'Users', texto: 'Grupos Reducidos' }
      ]
    },
    modulos: [
      { titulo: "1. Anatomía Humana", contenido: ["Introducción a la Anatomía y Enfermedad", "Aparato Locomotor", "Sistema Nervioso", "Sistema Endocrino", "La sangre", "Aparato Respiratorio, Digestivo y Urinario"] },
      { titulo: "2. El Auxiliar en la Oficina de Farmacia", contenido: ["Marco legislativo", "Personal y servicios", "Compra/venta de Productos", "Acondicionamiento y clasificación", "Medicamentos de uso humano y animal"] },
      { titulo: "3. Los Productos de Parafarmacia", contenido: ["Productos sanitarios", "Antisépticos", "Nutrición", "Cosmética, dermocosmética y solar", "Infantil, ortopedia, óptica y audioprótesis"] },
      { titulo: "4. Dermocosmética", contenido: ["Introducción a la dermocosmética", "Tipos de piel", "Alteraciones cutáneas", "Productos dermocosméticos"] },
      { titulo: "5. Primeros Auxilios Básicos", contenido: ["Técnicas básicas", "Actuación en emergencias", "Protocolos de seguridad", "Manejo de situaciones críticas"] },
      { titulo: "6. Orientación Laboral", contenido: ["Técnicas de búsqueda de empleo", "Elaboración de CV", "Preparación para entrevistas", "Mercado laboral farmacéutico"] }
    ],
    salidasProfesionales: [
      "Oficinas de Farmacia",
      "Parafarmacias",
      "Almacenes de distribución de medicamentos",
      "Farmacias hospitalarias (sector público y privado)",
      "Laboratorios farmacéuticos"
    ]
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