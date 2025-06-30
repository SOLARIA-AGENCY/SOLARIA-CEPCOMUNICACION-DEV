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

export const baseCursos: CursoBase[] = [
  { 
    nombre: 'Adiestramiento Canino I', 
    slugBase: 'adiestramiento-canino', 
    imagen: '/images/cursos/adiestramiento-canino.jpg',
    categoria: 'adiestramiento',
    copy: {
      slogan: 'Conviértete en un experto en el comportamiento y educación canina.',
      textosPrincipales: ['Aprende técnicas de adiestramiento de base, modificación de conductas no deseadas, cuidados básicos y primeros auxilios.'],
      titulos: ['Psicología Canina', 'Modificación de Conducta', 'Educación Canina']
    },
    descripcionDetallada: {
      introduccion: "El curso de Adiestramiento de base I ofrece los conocimientos imprescindibles acerca de las técnicas de adiestramiento de base aplicadas a perros, modificación de conductas no deseadas así como los cuidados básicos y primeros auxilios, además de un módulo de orientación laboral, dinámico y actualizado.",
      queAprendes: "Si te gusta el mundo animal y crees que ayudar a las personas a entender a sus mascotas contribuye al bienestar de la sociedad, este curso es para ti. Adquirirás la confianza, habilidades y conocimientos para trabajar como adiestrador canino o aplicarlo con tus propios animales.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 25 sesiones' },
        { icono: 'Users', texto: 'Prácticas con animales reales' },
        { icono: 'Award', texto: 'Preparación examen ANACP' },
        { icono: 'Book', texto: 'Enfoque en psicología canina' }
      ],
      requisitos: ["Tener 2º de ESO o EGB superado."],
      inversion: {
        total: "660€",
        modalidad: "6 cuotas de 85€ + 150€ matrícula",
        incluye: "Agencia de colocación oficial y material didáctico."
      },
      salidasProfesionales: [
        "Adiestrador canino profesional", "Educador canino en centros especializados", "Técnico en modificación de conducta", "Preparador para competiciones caninas", "Asesor en protectoras y refugios", "Colaborador en clínicas veterinarias"
      ],
      modulos: [
        { titulo: "Módulo 1: Técnicas de adiestramiento de base aplicadas a perros", contenido: ["Comportamiento social y bases morfológicas de conducta en el perro.", "Factores básicos modificadores de la conducta.", "Aprendizaje no asociativo y asociativo.", "Programas básicos de obediencia y habilidades.", "Seguridad y autoprotección en el manejo.", "Leyes y normativas sobre protección animal."] },
        { titulo: "Módulo 2: Modificación de conductas no deseadas en perros", contenido: ["Valoración de conductas no deseadas.", "Interpretación del lenguaje corporal canino.", "Reconocimiento de conductas por patología.", "Identificación del tipo de agresión y su tratamiento."] },
        { titulo: "Módulo 3: Cuidados higiénicos aplicados a perros", contenido: ["Metodología y control de la alimentación.", "Alojamiento y transporte.", "Cuidados higiénicos y control sanitario."] },
        { titulo: "Módulo 4: Primeros Auxilios aplicados a Perros", contenido: ["Morfología y fisiología del perro.", "Diagnóstico y valoración inicial.", "Material y técnicas de primeros auxilios.", "Administración de medicamentos y técnicas de inmovilización."] }
      ],
      profesores: [
        { 
          nombre: "Livia Bernardi", 
          foto: "/images/profesores/livia.jpg", 
          especialidad: "Fundadora de Aboras Obediencia",
          bio: "Adiestradora canina profesional en activo, con amplia experiencia docente en el sector y fundadora del reconocido centro Aboras Obediencia.",
          tags: ["Adiestramiento Base", "Modificación de Conducta", "Educación Canina"]
        }
      ],
      cursosComplementarios: ["Auxiliar de Veterinaria", "ATV Felino", "ATV Animales Exóticos", "Adiestramiento Canino II", "Peluquería Canina y Felina"]
    }
  },
  { 
    nombre: 'Adiestramiento Canino II', 
    slugBase: 'adiestramiento-canino-ii', 
    imagen: '/images/cursos/adiestramiento-canino-2.jpg',
    categoria: 'adiestramiento',
    copy: {
      slogan: 'Perfecciona tus habilidades y especialízate en adiestramiento avanzado.',
      textosPrincipales: ['Técnicas Avanzadas', 'Modificación de Conductas Complejas', 'Adiestramiento Especializado'],
      titulos: ['Etología Avanzada', 'Modificación de Conducta Compleja', 'Adiestramiento Profesional Nivel II']
    },
    descripcionDetallada: {
      introduccion: "El curso de Adiestramiento Canino Nivel II es la continuación natural para perfeccionar tus habilidades como adiestrador profesional, profundizando en técnicas avanzadas, modificación de conductas problemáticas y adiestramiento especializado.",
      queAprendes: "Este curso te permitirá especializarte en técnicas de alto nivel, resolver problemas de comportamiento complejos y prepararte para trabajar en centros de adiestramiento, terapia asistida, preparación de perros de trabajo y competiciones deportivas.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: 'Prácticas avanzadas con perros' },
        { icono: 'Award', texto: 'Diploma Nivel II y especialización' }
      ],
      requisitos: ["Haber completado Adiestramiento Canino I o demostrar experiencia equivalente."],
      salidasProfesionales: [
        "Adiestrador especializado", "Consultor en modificación de conducta", "Instructor de deportes caninos", "Terapeuta con animales de compañía", "Formador de adiestradores", "Asesor en centros de acogida", "Especialista en perros de trabajo"
      ],
      modulos: [
        { titulo: "Etología y Técnicas Avanzadas", contenido: ["Etología avanzada y neurociencia aplicada.", "Técnicas de modelado, contracondicionamiento y desensibilización sistemática."] },
        { titulo: "Modificación de Conductas Problemáticas", contenido: ["Tratamiento de agresividad, ansiedad por separación, fobias y comportamientos compulsivos."] },
        { titulo: "Adiestramiento Especializado", contenido: ["Perros de terapia y de trabajo (detección, rescate).", "Introducción a deportes caninos como Agility y Obediencia competitiva."] },
        { titulo: "Desarrollo Profesional", contenido: ["Protocolos de evaluación y diagnóstico comportamental.", "Manejo de grupos, aspectos legales y marketing para adiestradores."] }
      ],
      profesores: [],
      cursosComplementarios: ["Especialización en terapia asistida", "Instructor de deportes caninos", "Etología clínica", "Auxiliar de veterinaria", "Peluquería canina"]
    }
  },
  { 
    nombre: 'Tanatoestética y Tanatopraxia (Agente Funerario)', 
    slugBase: 'agente-funerario', 
    imagen: '/images/cursos/especializacion-sanitaria.jpg',
    categoria: 'sanidad',
    copy: {
      slogan: 'Fórmate en una profesión esencial y de gran demanda social.',
      textosPrincipales: ['Tanatopraxia y Conservación', 'Protocolo Funerario y Atención a Familias'],
      titulos: ['Tanatopraxia Profesional', 'Protocolo y Legislación Funeraria']
    },
    descripcionDetallada: {
      introduccion: "El curso de Tanatopraxia y Tanatoestética te proporciona los conocimientos teóricos y prácticos para la conservación, restauración y presentación estética de cadáveres, una profesión de alta especialización y demanda.",
      queAprendes: "Aprenderás a realizar desde la conservación transitoria y embalsamamiento hasta restauraciones complejas, aplicando técnicas estéticas y manejando las habilidades relacionales necesarias para prestar un servicio profesional y respetuoso en el sector funerario.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: '160 horas de prácticas en empresas' },
        { icono: 'Award', texto: 'Formación completa y especializada' }
      ],
      requisitos: ["Tener 2º de ESO o EGB superado."],
      salidasProfesionales: [
        "Técnico en Tanatopraxia", "Especialista en Tanatoestética", "Funerarias y tanatorios", "Cementerios y crematorios", "Servicios de repatriación", "Empresas de seguros de decesos", "Gestión administrativa funeraria"
      ],
      modulos: [
        { titulo: "Tema 1. Anatomía Humana y Patológica", contenido: ["Estudio de todos los sistemas del cuerpo humano.", "La célula, tejidos y anatomía patológica."] },
        { titulo: "Tema 2. Microbiología y Prevención de Riesgos", contenido: ["Bacteriología, virología y parasitología.", "Prevención de riesgos laborales en el ámbito funerario.", "Gestión de residuos y desinfección."] },
        { titulo: "Tema 3. Legislación y Policía Mortuoria", contenido: ["Medicina legal y forense.", "Reglamento de policía sanitaria mortuoria.", "Deontología y ética profesional."] },
        { titulo: "Tema 4. Ritos y Cultos Funerarios", contenido: ["Estudio de ritos funerarios en diferentes culturas y religiones.", "Protocolo funerario."] },
        { titulo: "Tema 5. Tramitación Documental", contenido: ["Gestión de documentación funeraria: certificados, permisos, etc.", "Normativa de transporte nacional e internacional."] },
        { titulo: "Tema 6. Instrumental, Materiales y Técnicas", contenido: ["Recogida, identificación y trabajo con el cadáver.", "Técnicas de cerrado de boca/ojos, vestido y amortajado.", "Tanatoestética: maquillaje y restauración menor.", "Extracción de tejidos y dispositivos."] },
        { titulo: "Tema 7. Atención al Cliente y Psicología", contenido: ["Procesos de atención al cliente.", "Psicología en el sector funerario y apoyo en el duelo.", "Técnicas de comunicación."] },
        { titulo: "Tema 8. Primeros Auxilios y Emergencias", contenido: ["Activación del sistema de emergencia y valoración.", "Técnicas de reanimación cardiopulmonar."] },
        { titulo: "Tema 9-12. Habilidades Profesionales", contenido: ["Trabajo en equipo.", "Gestión de conflictos y negociación.", "Gestión del tiempo.", "Inteligencia Emocional."] }
      ],
      profesores: [],
      cursosComplementarios: ["Ciclo medio de Farmacia", "Ciclo superior Higiene Bucodental"]
    }
  },
  { 
    nombre: 'Auxiliar de Veterinaria', 
    slugBase: 'auxiliar-clinico-veterinario',
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    categoria: 'veterinaria',
    copy: {
      slogan: 'Tu primer paso hacia una carrera dedicada al cuidado animal.',
      textosPrincipales: ['Anatomía y Fisiología Animal', 'Asistencia en Clínica y Quirófano'],
      titulos: ['Cuidado Integral Animal', 'Asistencia Técnica Veterinaria']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Veterinaria te ofrece los conocimientos imprescindibles del funcionamiento de una clínica veterinaria, las funciones del auxiliar y todos los conocimientos relativos a perros y gatos, con pinceladas en animales exóticos.",
      queAprendes: "Adquirirás la confianza, habilidades y conocimientos para trabajar como Auxiliar en clínicas, hospitales veterinarios, tiendas de animales, centros de acogida y ONGS, o para aplicarlo con tus propias mascotas. Incluye un módulo de orientación laboral actualizado.",
      puntosClave: [
        { icono: 'Clock', texto: '9 meses / 36 sesiones' },
        { icono: 'Users', texto: '350 horas de prácticas en empresas' },
        { icono: 'Award', texto: 'Formación completa en múltiples especies' }
      ],
      requisitos: ["No se especifican requisitos previos, ideal para amantes de los animales."],
      salidasProfesionales: [
        "Auxiliar en clínicas veterinarias", "Hospitales veterinarios", "Tiendas de animales", "Centros de acogida de animales", "ONGs de protección animal", "Zoológicos", "Centros de investigación", "Parques naturales"
      ],
      modulos: [
        { titulo: "Funcionamiento de Clínicas y Ética", contenido: ["Modelos de clínicas, software de gestión.", "Atención al público, ética y deontología."] },
        { titulo: "Manejo y Anatomía", contenido: ["Funciones del auxiliar, técnicas de sujeción.", "Origen y evolución de perro y gato.", "Anatomía básica y fisiología de todos los sistemas."] },
        { titulo: "Reproducción y Nutrición", contenido: ["Ciclo reproductivo, gestación y parto.", "Requerimientos nutricionales y parasitología."] },
        { titulo: "Técnicas de Diagnóstico", contenido: ["Imagenología: Rayos X, ecografía, TAC.", "Toma y procesamiento de muestras sanguíneas."] },
        { titulo: "Inmunología y Farmacología", contenido: ["Sistema inmune, vacunación.", "Administración de fármacos, toxicología."] },
        { titulo: "Animales Exóticos y de Zoológico", contenido: ["Biología y cuidados de roedores, animales de zoológico y marinos."] },
        { titulo: "Etología y Comportamiento", contenido: ["Comportamiento y conducta de perros y gatos.", "Problemas de conducta y humanización."] },
        { titulo: "Asistencia Quirúrgica y Vendajes", contenido: ["El quirófano, instrumental, anestesia.", "Esterilización y cuidados postquirúrgicos.", "Tipos y técnicas de vendajes."] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Multidisciplinar", 
          foto: "/images/profesores/alexis.jpg", 
          especialidad: "Veterinarios y Auxiliares en activo",
          bio: "Nuestro equipo está formado por profesionales con una amplia y contrastada experiencia en clínica de pequeños y grandes animales, garantizando una formación práctica y totalmente actualizada.",
          tags: ["Medicina Veterinaria", "Cirugía", "Cuidado Animal"]
        }
      ],
      cursosComplementarios: ["ATV (Ayudante Técnico Veterinario)", "ATV felinos", "ATV animales Exóticos", "Especialista en animales marinos y cetáceos", "Adiestramiento canino", "Peluquería canina"]
    }
  },
  { 
    nombre: 'Auxiliar de Clínicas Estéticas', 
    slugBase: 'auxiliar-clinicas-esteticas',
    imagen: '/images/cursos/auxiliar-de.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'Especialízate en el sector de la belleza y el bienestar.',
      textosPrincipales: ['Tratamientos Faciales y Corporales', 'Aparatología Estética Avanzada'],
      titulos: ['Medicina Estética Facial', 'Tecnología y Tratamientos Corporales']
    },
     descripcionDetallada: {
      introduccion: "El curso de Técnicas para el Auxiliar en Clínicas Estéticas ofrece los conocimientos imprescindibles del funcionamiento de un centro médico estético y las funciones del auxiliar, preparándote para un sector en auge.",
      queAprendes: "Adquirirás la confianza, habilidades y conocimientos para trabajar como Auxiliar en Centros médicos estéticos, Centros de Estética avanzada, Balnearios y spas. Incluye un módulo de orientación laboral dinámico y actualizado.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: '150 horas de prácticas en empresas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' }
      ],
      requisitos: ["Tener 2º de ESO o EGB superado."],
      inversion: {
        total: "1.250€",
        modalidad: "10 cuotas de 110€ + 150€ matrícula",
        incluye: "Prácticas en empresa y agencia de colocación."
      },
      salidasProfesionales: [
        "Auxiliar en Centros médicos estéticos", "Centros de Estética avanzada", "Balnearios y spa", "Clínicas de medicina estética", "Centros de bienestar"
      ],
      modulos: [
        { titulo: "UD 1: Introducción a la Medicina Estética", contenido: ["Historia, normativa, consentimiento informado.", "Relación médico-paciente y aspectos psicológicos."] },
        { titulo: "UD 2: Bases Anatómicas", contenido: ["Estudio anatómico y antropométrico.", "Anatomía, histología y fisiología de la piel."] },
        { titulo: "UD 3: Aparatología Estética", contenido: ["Principios de la aparatología médico-estética.", "Fundamentos y aplicaciones del Láser."] },
        { titulo: "UD 4: Medicina Estética Facial Avanzada", contenido: ["Rellenos (fillers), hilos de sustentación.", "Rinomodelación, Mentoplastia y Toxina botulínica."] },
        { titulo: "UD 5: Medicina Estética Corporal", contenido: ["Tratamiento de celulitis, estrías, adiposidad y flacidez.", "Patología venosa superficial y linfedema."] },
        { titulo: "UD 6: Dermatología Estética", contenido: ["Introducción a la dermatología estética.", "Tratamientos con láser y luz pulsada."] },
        { titulo: "UD 7: Rejuvenecimiento Cutáneo", contenido: ["Fotoenvejecimiento y envejecimiento cutáneo.", "Principales técnicas y tratamientos."] },
        { titulo: "UD 8: Otras Técnicas y Tratamientos", contenido: ["Electroterapias (depilación, lipólisis).", "Masajes, drenaje linfático y termoterapia."] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Multidisciplinar", 
          foto: "/images/profesores/sara.jpg", 
          especialidad: "Profesionales del sector en activo",
          bio: "El equipo docente está formado por un equipo multidisciplinar en el que todos son profesionales del sector en activo, asegurando una formación relevante y demandada por las empresas.",
          tags: ["Medicina Estética", "Aparatología", "Dermatología"]
        }
      ],
      cursosComplementarios: ["Curso masaje", "Dermocosmética", "Cursos aparatología corporal y facial", "Dietética y nutrición", "Acupuntura facial", "Reiki", "Auxiliar de farmacia y parafarmacia"]
    }
  },
  { 
    nombre: 'Auxiliar de Enfermería', 
    slugBase: 'auxiliar-enfermeria',
    imagen: '/images/cursos/auxiliar-enfermeria.jpg',
    categoria: 'sanidad',
    copy: {
      slogan: 'Una vocación de cuidado, una profesión de futuro.',
      textosPrincipales: ['Cuidados Básicos al Paciente', 'Higiene y Administración Hospitalaria'],
      titulos: ['Técnicas Básicas de Enfermería', 'Gestión y Documentación Sanitaria']
    },
    descripcionDetallada: {
      introduccion: "Si te gusta el área sanitaria, el trato al público, aconsejar, escuchar, ayudar, y fomentar la promoción de la salud, este curso es para ti. Adquirirás las competencias para ser una pieza clave en el equipo de salud.",
      queAprendes: "El curso de Técnicas Auxiliares en Enfermería ofrece los conocimientos imprescindibles acerca de las técnicas básicas de enfermería, documentación e higiene del medio hospitalario. Adquirirás la confianza, habilidades y conocimientos para trabajar como auxiliar en centros médicos, hospitales concertados, y consultas privadas.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: '300h de Prácticas en empresas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' }
      ],
      requisitos: [
        "Tener 2º de ESO o EGB superado."
      ],
      inversion: {
        total: "1.150€",
        modalidad: "10 cuotas de 100€ + 150€ matrícula",
        incluye: "Prácticas garantizadas y agencia de colocación."
      },
      salidasProfesionales: [
        "Auxiliar en centros médicos", "Hospitales concertados", "Consultas privadas", "Clínicas especializadas", "Centros de atención primaria", "Residencias geriátricas", "Centros de día"
      ],
      modulos: [
        { 
          titulo: "Técnicas básicas de enfermería", 
          contenido: ["Rol del auxiliar, estructura del ser humano.", "Higiene, movilización y úlceras por presión.", "Constantes vitales y procedimientos por sistemas (cardiocirculatorio, respiratorio, etc.).", "Cuidados al recién nacido, anciano y paciente terminal.", "Terapéutica quirúrgica, farmacológica y primeros auxilios."] 
        },
        { 
          titulo: "La higiene del medio hospitalario", 
          contenido: ["Unidad del paciente, cama hospitalaria.", "Prevención de infecciones, aislamiento.", "Limpieza, desinfección y esterilización.", "Manejo de muestras biológicas y residuos sanitarios."] 
        },
        {
          titulo: "Operaciones administrativas y documentación sanitaria",
          contenido: ["Organización y niveles de asistencia sanitaria.", "El equipo de enfermería y documentación.", "Gestión de existencias e inventarios."]
        }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Sanitario", 
          foto: "/images/profesores/esther.jpg", 
          especialidad: "Profesionales del sector en activo",
          bio: "El equipo docente está formado por un equipo multidisciplinar en el que todos son profesionales del sector en activo, aportando una visión real y práctica de la profesión.",
          tags: ["Enfermería", "Cuidados Auxiliares", "Gestión Sanitaria"]
        }
      ],
      cursosComplementarios: ["Curso masaje", "Auxiliar de Odontología", "Dietética y nutrición", "Auxiliar de farmacia y parafarmacia", "Ciclo medio de farmacia", "Ciclo superior de higiene bucodental", "Inglés"]
    }
  },
  { 
    nombre: 'Auxiliar de Farmacia y Parafarmacia', 
    slugBase: 'auxiliar-farmacia-dermo',
    imagen: '/images/cursos/farmacia-parafarmacia.jpg',
    categoria: 'sanidad',
    copy: {
      slogan: 'Conviértete en un profesional clave en la oficina de farmacia.',
      textosPrincipales: ['Dispensación de Productos Farmacéuticos', 'Dermocosmética y Parafarmacia'],
      titulos: ['Farmacología Aplicada', 'Dermocosmética Profesional']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Farmacia ofrece los conocimientos imprescindibles del funcionamiento de una oficina de farmacia, las funciones del auxiliar y un módulo de orientación laboral, dinámico y actualizado.",
      queAprendes: "Adquirirás la confianza, habilidades y conocimientos para trabajar como Auxiliar en Farmacias o parafarmacias, y almacenes de medicamentos. Si te gusta el área sanitaria y el trato al público, este curso es para ti.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: '250h de Prácticas en empresas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' }
      ],
       requisitos: ["Tener 2º de ESO o EGB superado."],
       inversion: {
        total: "1.150€",
        modalidad: "10 cuotas de 100€ + 150€ matrícula",
        incluye: "Prácticas y agencia de colocación."
      },
      salidasProfesionales: [
        "Auxiliar en farmacias", "Auxiliar en parafarmacias", "Almacén de medicamentos", "Distribuidoras farmacéuticas", "Laboratorios farmacéuticos", "Hospitales (servicio de farmacia)", "Centros sociosanitarios"
      ],
      modulos: [
        { titulo: "Anatomopatología", contenido: ["Estudio de los sistemas del cuerpo humano: piel, esquelético-muscular, cardiocirculatorio, etc.", "Constantes vitales y primeros auxilios."] },
        { titulo: "Farmacología", contenido: ["Conceptos básicos sobre medicamentos, prescripción y dispensación.", "Biofarmacia, farmacocinética y farmacovigilancia.", "Farmacología por sistemas, homeopatía y fitoterapia.", "Medicamentos de uso animal y farmacia hospitalaria."] },
        { titulo: "Parafarmacia", contenido: ["Productos de alimentación, puericultura y sanitarios.", "Productos para incontinencia, ginecológicos y anticonceptivos.", "Dermocosmética, cosmética solar, ortopedia y óptica."] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Farmacéutico", 
          foto: "/images/profesores/goreti.jpg", 
          especialidad: "Profesionales del sector en activo",
          bio: "El equipo docente está formado por un equipo multidisciplinar en el que todos son profesionales del sector en activo, proporcionando una formación actualizada y orientada al mercado laboral.",
          tags: ["Farmacia", "Parafarmacia", "Dermocosmética"]
        }
      ],
      cursosComplementarios: ["Curso masaje", "Dermocosmética", "Dietética y nutrición", "Ciclo medio de Farmacia y Parafarmacia", "Inglés"]
    }
  },
  { 
    nombre: 'Auxiliar Odontología', 
    slugBase: 'auxiliar-odontologia',
    imagen: '/images/cursos/auxiliar-odontologia.jpg',
    categoria: 'sanidad',
    copy: {
      slogan: 'Asiste al odontólogo y mejora la salud bucodental de los pacientes.',
      textosPrincipales: ['Instrumental Dental', 'Esterilización y Control de Infecciones', 'Atención al Paciente'],
      titulos: ['Instrumental Dental', 'Esterilización', 'Asistencia Odontológica']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Odontología online ofrece los conocimientos imprescindibles del funcionamiento de una clínica odontológica, las funciones del auxiliar de odontología y un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta el área sanitaria, el trato al público, aconsejar, escuchar, ayudar, y fomentar la promoción de la salud bucodental, adquirirás la confianza, habilidades y conocimientos para trabajar como auxiliar en clínicas dentales, centros de salud y consultas privadas especializadas en odontología.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / modalidad online' },
        { icono: 'Users', texto: '200 horas de prácticas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Grupos reducidos' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "690€",
        modalidad: "6 cuotas de 90€ + 150€ matrícula",
        incluye: "Prácticas garantizadas y agencia de colocación."
      },
      salidasProfesionales: [
        "Clínicas dentales", "Centros de salud bucodental", "Consultas privadas de odontología", "Hospitales (servicio de odontología)", "Centros de especialidades odontológicas", "Clínicas de cirugía maxilofacial"
      ],
      modulos: [
        { titulo: "Anatomía Bucal", contenido: ["Anatomía de la cavidad oral", "Dientes y estructuras de soporte", "Sistema estomatognático", "Histología oral"] },
        { titulo: "Instrumental y Material Dental", contenido: ["Instrumental básico de exploración", "Instrumental de operatoria", "Instrumental de cirugía oral", "Materiales dentales"] },
        { titulo: "Asistencia Clínica", contenido: ["Técnicas de asistencia al odontólogo", "Preparación del campo operatorio", "Aspiración y retracción", "Mezcla de materiales"] },
        { titulo: "Radiología Dental", contenido: ["Técnicas radiográficas intraorales", "Protección radiológica", "Procesado y archivo", "Interpretación básica"] },
        { titulo: "Esterilización y Desinfección", contenido: ["Métodos de esterilización", "Control de infecciones", "Manipulación de instrumental", "Protocolos de limpieza"] },
        { titulo: "Prevención en Odontología", contenido: ["Educación para la salud oral", "Técnicas de higiene", "Aplicación de flúor", "Sellado de fisuras"] },
        { titulo: "Atención al Paciente", contenido: ["Comunicación efectiva", "Manejo de la ansiedad", "Citas y agenda", "Documentación clínica"] },
        { titulo: "Urgencias Odontológicas", contenido: ["Primeros auxilios en odontología", "Manejo de urgencias", "Medicación de urgencia", "Protocolos de actuación"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Odontológico", 
          foto: "/images/profesores/cecilia.jpg", 
          especialidad: "Profesionales del sector en activo",
          bio: "El equipo docente está formado por odontólogos e higienistas dentales en activo, proporcionando una formación actualizada y orientada al mercado laboral.",
          tags: ["Odontología", "Higiene Bucodental", "Asistencia Dental"]
        }
      ],
      cursosComplementarios: ["Ciclo superior de Higiene bucodental", "Auxiliar de enfermería", "Dietética y nutrición", "Auxiliar de farmacia", "Inglés"]
    }
  },
  { 
    nombre: 'Dietética y Nutrición', 
    slugBase: 'dietetica-nutricion',
    imagen: '/images/cursos/dietetica-nutricion.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'Promueve hábitos de vida saludable a través de la alimentación.',
      textosPrincipales: ['Elaboración de Dietas Personalizadas', 'Nutrición Deportiva', 'Educación Nutricional'],
      titulos: ['Elaboración de Dietas', 'Nutrición Deportiva', 'Salud y Bienestar']
    },
    descripcionDetallada: {
      introduccion: "El curso de Dietética y Nutrición ofrece los conocimientos imprescindibles acerca de la alimentación y nutrición aplicada a las distintas etapas de la vida, estados fisiológicos y patológicos, así como la elaboración de dietas adaptadas a cada situación, además de un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta promover la salud a través de la alimentación, educar sobre hábitos nutricionales saludables y ayudar a las personas a mejorar su calidad de vida, adquirirás la confianza, habilidades y conocimientos para trabajar como técnico en dietética y nutrición en centros de salud, consultas privadas, centros deportivos y empresas de alimentación.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: '150 horas de prácticas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Modalidad presencial' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "1.150€",
        modalidad: "10 cuotas de 100€ + 150€ matrícula",
        incluye: "Prácticas garantizadas y agencia de colocación."
      },
      salidasProfesionales: [
        "Técnico en dietética y nutrición", "Consultas de nutrición", "Centros de salud y bienestar", "Gimnasios y centros deportivos", "Empresas de catering y restauración", "Residencias geriátricas", "Centros de educación nutricional", "Industria alimentaria"
      ],
      modulos: [
        { titulo: "Alimentación y Cultura", contenido: ["Historia de la alimentación", "Factores que condicionan los hábitos alimentarios", "Alimentación en diferentes culturas", "Evolución de la dieta"] },
        { titulo: "Anatomía y Fisiología", contenido: ["Anatomía y fisiología del aparato digestivo", "Proceso de digestión y absorción", "Metabolismo de nutrientes"] },
        { titulo: "Bromatología", contenido: ["Estudio de los alimentos", "Composición química de los alimentos", "Clasificación de alimentos", "Aditivos alimentarios", "Conservación de alimentos"] },
        { titulo: "Nutrición", contenido: ["Conceptos básicos de nutrición", "Macronutrientes y micronutrientes", "Necesidades nutricionales", "Requerimientos energéticos", "Biodisponibilidad de nutrientes"] },
        { titulo: "Dietética", contenido: ["Elaboración de dietas equilibradas", "Planificación de menús", "Técnicas culinarias saludables", "Dietas terapéuticas"] },
        { titulo: "Dietoterapia", contenido: ["Alimentación en patologías", "Diabetes mellitus", "Enfermedades cardiovasculares", "Trastornos digestivos", "Obesidad", "Desnutrición"] },
        { titulo: "Alimentación en las Diferentes Etapas", contenido: ["Alimentación en el embarazo y lactancia", "Alimentación infantil", "Alimentación en la adolescencia", "Alimentación en el adulto mayor"] },
        { titulo: "Nutrición Deportiva", contenido: ["Necesidades nutricionales del deportista", "Hidratación en el deporte", "Suplementación deportiva", "Alimentación pre, durante y post ejercicio"] },
        { titulo: "Seguridad Alimentaria", contenido: ["Higiene alimentaria", "Enfermedades transmitidas por alimentos", "Sistema APPCC", "Normativa alimentaria"] },
        { titulo: "Educación Nutricional", contenido: ["Técnicas de comunicación", "Diseño de programas educativos", "Promoción de hábitos saludables", "Trabajo con grupos"] },
        { titulo: "Trastornos de la Conducta Alimentaria", contenido: ["Anorexia nerviosa", "Bulimia nerviosa", "Trastorno por atracón", "Abordaje nutricional"] },
        { titulo: "Valoración del Estado Nutricional", contenido: ["Métodos de evaluación nutricional", "Antropometría", "Parámetros bioquímicos", "Encuestas alimentarias"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente en Nutrición", 
          foto: "/images/profesores/nuria.jpg", 
          especialidad: "Dietistas-Nutricionistas en activo",
          bio: "El equipo docente está formado por dietistas-nutricionistas colegiados en activo, con amplia experiencia en consulta privada y centros de salud.",
          tags: ["Dietética", "Nutrición Clínica", "Educación Nutricional"]
        }
      ],
      cursosComplementarios: ["Entrenador personal", "Auxiliar de enfermería", "Auxiliar de farmacia", "Instructor de yoga", "Quiromasaje"]
    }
  },
  { 
    nombre: 'Peluquería Canina y Felina', 
    slugBase: 'peluqueria-canina-felina',
    imagen: '/images/cursos/peluqueria-canina.jpg',
    categoria: 'veterinaria',
    copy: {
      slogan: 'Transforma tu pasión por los animales en una profesión creativa.',
      textosPrincipales: ['Técnicas de Corte por Raza', 'Cosmética y Salud de la Piel Animal', 'Gestión de Peluquería Canina'],
      titulos: ['Técnicas de Corte', 'Cosmética Animal', 'Estilismo Canino']
    },
    descripcionDetallada: {
      introduccion: "El curso de Peluquería Canina y Felina ofrece los conocimientos imprescindibles acerca de las técnicas de peluquería canina y felina, tipos de pelo, cortes por razas, cosmética animal, higiene y cuidados básicos, además de un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta el mundo animal y crees que combinar el cuidado estético con el bienestar animal es tu vocación, adquirirás la confianza, habilidades y conocimientos para trabajar como peluquero canino y felino en centros especializados, clínicas veterinarias, o abrir tu propio salón de peluquería canina.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: 'Prácticas con animales reales' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Modalidad presencial' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "690€",
        modalidad: "6 cuotas de 90€ + 150€ matrícula",
        incluye: "Agencia de colocación oficial y kit de herramientas básico."
      },
      salidasProfesionales: [
        "Peluquero canino y felino", "Centros de estética animal", "Clínicas veterinarias", "Tiendas de animales", "Salones de peluquería canina", "Servicios móviles de peluquería", "Centros de acogida de animales", "Consulta privada a domicilio"
      ],
      modulos: [
        { titulo: "Introducción a la Peluquería Canina", contenido: ["Historia de la peluquería canina", "Anatomía básica del perro y gato", "Sistemas tegumentario", "Tipos de pelo y pelaje"] },
        { titulo: "Instrumental y Herramientas", contenido: ["Tipos de tijeras y su uso", "Máquinas de cortar pelo", "Cepillos y peines especializados", "Productos de higiene y cosmética"] },
        { titulo: "Técnicas de Sujeción y Manejo", contenido: ["Técnicas de sujeción sin estrés", "Manejo de animales nerviosos", "Seguridad en el trabajo", "Primeros auxilios básicos"] },
        { titulo: "Higiene y Baño", contenido: ["Técnicas de baño", "Champús específicos por tipo de pelo", "Secado y cepillado", "Limpieza de oídos y ojos"] },
        { titulo: "Cortes por Razas", contenido: ["Estándares de razas", "Cortes específicos para cada raza", "Técnicas de tijera y máquina", "Acabados profesionales"] },
        { titulo: "Cuidado de Uñas y Almohadillas", contenido: ["Corte de uñas", "Cuidado de almohadillas", "Tratamiento de callos", "Hidratación y protección"] },
        { titulo: "Cosmética y Estética Animal", contenido: ["Productos cosméticos seguros", "Tintes y coloración", "Accesorios y complementos", "Perfumes para mascotas"] },
        { titulo: "Patologías de la Piel", contenido: ["Reconocimiento de problemas cutáneos", "Dermatitis y alergias", "Parásitos externos", "Cuándo derivar al veterinario"] },
        { titulo: "Gestión del Negocio", contenido: ["Organización del salón", "Atención al cliente", "Precios y servicios", "Marketing y promoción"] },
        { titulo: "Técnicas Avanzadas", contenido: ["Cortes creativos", "Competiciones de peluquería canina", "Técnicas de exposición", "Tendencias actuales"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Especializado", 
          foto: "/images/profesores/luis.jpg", 
          especialidad: "Peluqueros caninos profesionales",
          bio: "El equipo docente está formado por peluqueros caninos profesionales en activo, con experiencia en competiciones y salones especializados.",
          tags: ["Peluquería Canina", "Estética Animal", "Competiciones"]
        }
      ],
      cursosComplementarios: ["Auxiliar de veterinaria", "ATV", "Adiestramiento canino", "Técnico veterinario en felinos", "Etología canina"]
    }
  },
  { 
    nombre: 'Quiromasaje Nivel I', 
    slugBase: 'quiromasaje-nivel1',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'Iníciate en el arte del masaje terapéutico y de relajación.',
      textosPrincipales: ['Anatomía Palpatoria', 'Maniobras Básicas de Masaje', 'Masaje Relajante y Estético'],
      titulos: ['Anatomía Palpatoria', 'Maniobras Básicas', 'Quiromasaje Inicial']
    },
    descripcionDetallada: {
      introduccion: "El curso de Quiromasaje Nivel I ofrece los conocimientos imprescindibles acerca de las técnicas básicas de masaje manual, anatomía palpatoria, maniobras fundamentales y aplicación del masaje relajante y estético, además de un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta ayudar a las personas a mejorar su bienestar físico y emocional a través del tacto terapéutico, adquirirás la confianza, habilidades y conocimientos para trabajar como quiromasajista en spas, centros de bienestar, consultas privadas o como complemento a otras terapias.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: 'Prácticas incluidas en aula' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Modalidad presencial' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "690€",
        modalidad: "6 cuotas de 90€ + 150€ matrícula",
        incluye: "Agencia de colocación oficial y material didáctico."
      },
      salidasProfesionales: [
        "Quiromasajista en spas y centros de bienestar", "Consulta privada", "Centros deportivos", "Hoteles con servicios wellness", "Centros de fisioterapia", "Clínicas de medicina estética", "Servicios a domicilio", "Centros geriátricos"
      ],
      modulos: [
        { titulo: "Introducción al Quiromasaje", contenido: ["Historia del masaje", "Beneficios del quiromasaje", "Contraindicaciones", "Ética profesional"] },
        { titulo: "Anatomía Básica", contenido: ["Sistema óseo", "Sistema muscular", "Sistema circulatorio", "Sistema linfático", "Sistema nervioso"] },
        { titulo: "Anatomía Palpatoria", contenido: ["Técnicas de palpación", "Localización de estructuras", "Identificación de tensiones", "Evaluación del tejido"] },
        { titulo: "Preparación para el Masaje", contenido: ["Preparación del espacio", "Higiene y desinfección", "Posiciones del paciente", "Aceites y productos"] },
        { titulo: "Maniobras Básicas", contenido: ["Pases magnéticos", "Roces", "Fricciones", "Amasamientos", "Percusiones", "Vibraciones"] },
        { titulo: "Masaje de Espalda", contenido: ["Técnicas específicas para la espalda", "Tratamiento de contracturas", "Masaje cervical", "Masaje lumbar"] },
        { titulo: "Masaje de Extremidades", contenido: ["Masaje de brazos", "Masaje de piernas", "Técnicas de drenaje", "Masaje de manos y pies"] },
        { titulo: "Masaje Facial", contenido: ["Técnicas de masaje facial", "Beneficios estéticos", "Relajación facial", "Cuidados específicos"] },
        { titulo: "Masaje Relajante", contenido: ["Técnicas de relajación", "Respiración y masaje", "Ambiente terapéutico", "Comunicación con el paciente"] },
        { titulo: "Primeros Auxilios", contenido: ["Técnicas básicas de primeros auxilios", "Actuación en emergencias", "Prevención de lesiones"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Especializado", 
          foto: "/images/profesores/sara.jpg", 
          especialidad: "Quiromasajistas profesionales",
          bio: "El equipo docente está formado por quiromasajistas profesionales en activo, con amplia experiencia en centros de bienestar y consulta privada.",
          tags: ["Quiromasaje", "Terapias Manuales", "Bienestar"]
        }
      ],
      cursosComplementarios: ["Quiromasaje Nivel II", "Entrenador personal", "Instructor de yoga", "Dietética y nutrición", "Auxiliar de enfermería"]
    }
  },
  { 
    nombre: 'Quiromasaje Nivel II', 
    slugBase: 'quiromasaje-nivel2',
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'Avanza en tus técnicas y especialízate en masaje deportivo.',
      textosPrincipales: ['Masaje Deportivo', 'Tratamiento de Lesiones Comunes', 'Técnicas Terapéuticas Avanzadas'],
      titulos: ['Masaje Deportivo', 'Tratamiento de Lesiones', 'Quiromasaje Avanzado']
    },
    descripcionDetallada: {
      introduccion: "El curso de Quiromasaje Nivel II es la continuación natural para perfeccionar tus habilidades como quiromasajista, profundizando en técnicas avanzadas, masaje deportivo, tratamiento de lesiones específicas y terapias especializadas.",
      queAprendes: "Si ya tienes formación en Quiromasaje Nivel I y quieres especializarte en técnicas terapéuticas avanzadas, masaje deportivo y tratamiento de patologías específicas, adquirirás las competencias para trabajar en centros deportivos, clínicas de fisioterapia, equipos deportivos y consulta especializada.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: 'Prácticas avanzadas incluidas' },
        { icono: 'Award', texto: 'Certificación Nivel II' },
        { icono: 'Book', texto: 'Modalidad presencial' }
      ],
      requisitos: ["Haber completado Quiromasaje Nivel I o demostrar experiencia equivalente."],
      inversion: {
        total: "750€",
        modalidad: "6 cuotas de 100€ + 150€ matrícula",
        incluye: "Certificación especializada y material didáctico avanzado."
      },
      salidasProfesionales: [
        "Quiromasajista deportivo especializado", "Centros de alto rendimiento", "Clínicas de fisioterapia", "Equipos deportivos profesionales", "Centros de rehabilitación", "Consulta especializada", "Spas terapéuticos", "Centros de medicina deportiva"
      ],
      modulos: [
        { titulo: "Anatomía Avanzada", contenido: ["Anatomía específica deportiva", "Biomecánica del movimiento", "Cadenas musculares", "Patología del deporte"] },
        { titulo: "Masaje Deportivo", contenido: ["Masaje pre-competición", "Masaje post-competición", "Masaje de mantenimiento", "Técnicas específicas por deporte"] },
        { titulo: "Tratamiento de Lesiones", contenido: ["Lesiones musculares frecuentes", "Contracturas y sobrecargas", "Tendinopatías", "Esguinces y distensiones"] },
        { titulo: "Técnicas Avanzadas", contenido: ["Masaje transverso profundo", "Técnicas neuromusculares", "Liberación miofascial", "Puntos gatillo"] },
        { titulo: "Masaje Terapéutico", contenido: ["Masaje en patologías específicas", "Fibromialgia", "Artritis y artrosis", "Cefaleas tensionales"] },
        { titulo: "Drenaje Linfático Manual", contenido: ["Técnicas de drenaje linfático", "Indicaciones y contraindicaciones", "Tratamiento de edemas", "Beneficios estéticos"] },
        { titulo: "Reflexología Podal", contenido: ["Principios de la reflexología", "Mapas reflejos", "Técnicas de tratamiento", "Integración con quiromasaje"] },
        { titulo: "Masaje con Aceites Esenciales", contenido: ["Aromaterapia aplicada", "Propiedades terapéuticas", "Mezclas específicas", "Precauciones y contraindicaciones"] },
        { titulo: "Evaluación y Diagnóstico", contenido: ["Evaluación postural", "Tests musculares", "Identificación de desequilibrios", "Planificación del tratamiento"] },
        { titulo: "Técnicas Complementarias", contenido: ["Estiramientos asistidos", "Movilizaciones articulares", "Técnicas de relajación", "Respiración terapéutica"] },
        { titulo: "Gestión Profesional", contenido: ["Organización de la consulta", "Historia clínica", "Protocolos de tratamiento", "Derivación a otros profesionales"] },
        { titulo: "Patología y Farmacología", contenido: ["Reconocimiento de patologías", "Interacciones con medicamentos", "Contraindicaciones absolutas", "Trabajo multidisciplinar"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Docente Avanzado", 
          foto: "/images/profesores/sara.jpg", 
          especialidad: "Especialistas en terapias manuales",
          bio: "El equipo docente está formado por fisioterapeutas y quiromasajistas especializados en medicina deportiva y terapias manuales avanzadas.",
          tags: ["Quiromasaje Avanzado", "Medicina Deportiva", "Terapias Manuales"]
        }
      ],
      cursosComplementarios: ["Entrenador personal", "Instructor de yoga", "Osteopatía", "Fisioterapia", "Medicina deportiva"]
    }
  },
  { 
    nombre: 'Ciclo Formativo de Grado Superior en Higiene Bucodental', 
    slugBase: 'cfgs-higiene-bucodental',
    imagen: '/images/cursos/ciclos-formativos.jpg',
    categoria: 'ciclos',
    copy: {
      slogan: 'Conviértete en un profesional esencial de la salud oral con un título oficial.',
      textosPrincipales: ['Título Oficial del Ministerio de Educación', 'Acceso Directo a la Universidad', 'Prácticas en Clínicas Dentales'],
      titulos: ['Título Oficial', 'Acceso Universitario', 'Higiene Bucodental Superior']
    },
    descripcionDetallada: {
      introduccion: "Fórmate como Higienista Bucodental y accede a una profesión con alta demanda en centros de salud públicos y clínicas odontológicas privadas. Obtén un título oficial que te permite el acceso directo a la Universidad.",
      queAprendes: "Este ciclo te capacita para promover la salud bucodental, realizar técnicas de higiene, colaborar en estudios epidemiológicos y aplicar técnicas de apoyo en tratamientos odontológicos complejos. Serás un profesional clave en cualquier equipo de salud dental.",
      puntosClave: [
        { icono: 'Clock', texto: '3 cursos / 2000h' },
        { icono: 'Users', texto: 'Modalidad Presencial y Prácticas' },
        { icono: 'Award', texto: 'Título Oficial con Acceso a Universidad' }
      ],
      requisitos: [
        "Título de Bachiller (cualquier modalidad)",
        "Tener 3º de BUP o COU superado",
        "Título de Formación Profesional de Grado Medio",
        "Estar en posesión de titulación universitaria o equivalente",
        "Haber superado la prueba de acceso a ciclos de grado superior (mayores de 19 años)"
      ],
      salidasProfesionales: [
        "Higienista bucodental en clínicas dentales y centros de salud",
        "Educador en salud bucodental en el sector público y privado",
        "Técnico especialista en hospitales y mutuas",
        "Colaborador en estudios epidemiológicos",
        "Asistente en centros geriátricos y de educación especial"
      ],
      modulos: [
        { titulo: "FISIOPATOLOGÍA GENERAL", contenido: ["Bases anatomofisiológicas", "Procesos patológicos", "Microbiología e inmunología"] },
        { titulo: "ESTUDIO DE LA CAVIDAD ORAL", contenido: ["Anatomía bucodental", "Histología y embriología", "Fisiología del sistema estomatognático"] },
        { titulo: "INTERVENCIÓN BUCODENTAL", contenido: ["Técnicas de higiene", "Aplicación de fluoruros", "Sellado de fisuras"] },
        { titulo: "RECEPCIÓN Y LOGÍSTICA EN LA CLÍNICA DENTAL", contenido: ["Organización del gabinete", "Gestión de pacientes", "Documentación clínica"] },
        { titulo: "FORMACIÓN Y ORIENTACIÓN LABORAL (F.O.L.)", contenido: ["Orientación profesional", "Legislación laboral", "Prevención de riesgos"] },
        { titulo: "PRÓTESIS Y ORTODONCIA", contenido: ["Tipos de prótesis", "Aparatología ortodóncica", "Mantenimiento y cuidados"] },
        { titulo: "EDUCACIÓN PARA LA SALUD ORAL", contenido: ["Programas de promoción de salud", "Técnicas educativas", "Prevención de enfermedades"] },
        { titulo: "PRIMEROS AUXILIOS", contenido: ["Soporte vital básico", "Actuación en emergencias", "Uso de desfibriladores"] },
        { titulo: "CONSERVADORA, PERIODONCIA, CIRUGÍA E IMPLANTES", contenido: ["Odontología conservadora", "Tratamientos periodontales", "Asistencia en cirugía oral"] },
        { titulo: "PROYECTO DE HIGIENE BUCODENTAL", contenido: ["Diseño de proyectos", "Implementación y evaluación", "Metodología de investigación"] },
        { titulo: "FORMACIÓN EN CENTROS DE TRABAJO (FCT)", contenido: ["Prácticas profesionales en empresas del sector.", "Aplicación de conocimientos teóricos.", "Integración en el mundo laboral."] }
      ],
      profesores: [],
      cursosComplementarios: [
        "Seminario de cirugía dental", "Seminario de odontopediatría", "Seminario de ortodoncia", "Seminario de periodoncia", "Inglés (todos los niveles)"
      ],
      inversion: {
        total: "5.000€ (pago único) / 6.000€ (financiado)",
        modalidad: "DURACIÓN: 3 años. Opción financiada: 30 cuotas de 160€ + 200€ matrícula. Se cursan 10 cuotas por año académico (3 años).",
        incluye: "Título Oficial del Ministerio de Educación y acceso directo a la Universidad."
      }
    }
  },
  { 
    nombre: 'Ciclo Formativo de Grado Medio en Técnico en Farmacia y Parafarmacia', 
    slugBase: 'cfgm-farmacia-parafarmacia',
    imagen: '/images/cursos/ciclos-formativos.jpg',
    categoria: 'ciclos',
    copy: {
      slogan: 'Tu puerta de entrada al sector farmacéutico con un título oficial.',
      textosPrincipales: ['Título Oficial del Ministerio de Educación', 'Dispensación Farmacéutica Profesional', 'Prácticas en Oficinas de Farmacia'],
      titulos: ['Título Oficial', 'Práctica Farmacéutica', 'Técnico en Farmacia']
    },
    descripcionDetallada: {
      introduccion: "Fórmate como Técnico en Farmacia y Parafarmacia con un título oficial y adquiere los conocimientos para trabajar en farmacias, parafarmacias y hospitales, dispensando productos y elaborando preparados farmacéuticos.",
      queAprendes: "Este ciclo te capacita para la dispensación de productos farmacéuticos y parafarmacéuticos, la realización de operaciones básicas de laboratorio, la promoción de la salud y la gestión integral de la oficina de farmacia.",
      puntosClave: [
        { icono: 'Clock', texto: '3 cursos / 2000h' },
        { icono: 'Users', texto: 'Modalidad Presencial y Prácticas' },
        { icono: 'Award', texto: 'Título Oficial del Ministerio' }
      ],
      requisitos: [
        "Título de Graduado en Educación Secundaria Obligatoria (ESO)",
        "Título de Formación Profesional Básica",
        "Título de Técnico o Técnico Auxiliar",
        "Haber superado el segundo curso de BUP",
        "Haber superado la prueba de acceso a ciclos de grado medio"
      ],
      salidasProfesionales: [
        "Técnico en farmacia",
        "Auxiliar de farmacia",
        "Técnico en parafarmacia",
        "Técnico en almacén de medicamentos",
        "Técnico en farmacia hospitalaria",
        "Delegado comercial de productos farmacéuticos y parafarmacéuticos"
      ],
      modulos: [
        { titulo: "DISPOSICIÓN Y VENTA DE PRODUCTOS", contenido: ["Dispensación de parafarmacia", "Operaciones básicas de laboratorio", "Promoción de la Salud", "Primeros Auxilios"] },
        { titulo: "OFICINA DE FARMACIA", contenido: ["Organización y gestión", "Atención al cliente", "Sistemas de información"] },
        { titulo: "DISPENSACIÓN DE PRODUCTOS FARMACÉUTICOS", contenido: ["Medicamentos con y sin receta", "Productos sanitarios"] },
        { titulo: "FORMULACIÓN MAGISTRAL", contenido: ["Preparación de medicamentos", "Control de calidad", "Normativa aplicable"] },
        { titulo: "FORMACIÓN Y ORIENTACIÓN LABORAL", contenido: ["Orientación profesional", "Legislación laboral", "Seguridad y salud"] },
        { titulo: "EMPRESA E INICIATIVA EMPRENDEDORA", contenido: ["Creación de empresas", "Gestión empresarial", "Plan de negocio"] },
        { titulo: "FORMACIÓN EN CENTROS DE TRABAJO (FCT)", contenido: ["Prácticas profesionales en empresas del sector.", "Aplicación de conocimientos teóricos.", "Integración en el mundo laboral."] }
      ],
      profesores: [],
      cursosComplementarios: [
        "Curso dermocosmética", "Seminario Unycop", "Curso Auxiliar de óptica", "Ciclo superior de Higiene bucodental", "Inglés (todos los niveles)"
      ],
      inversion: {
        total: "5.000€ (pago único) / 6.000€ (financiado)",
        modalidad: "DURACIÓN: 3 años. Opción financiada: 30 cuotas de 160€ + 200€ matrícula. Se cursan 10 cuotas por año académico (3 años).",
        incluye: "Título Oficial del Ministerio de Educación y acceso a ciclos de grado superior."
      }
    }
  },
  { 
    nombre: 'Auxiliar de Óptica Online', 
    slugBase: 'auxiliar-optica-online', 
    imagen: '/images/cursos/auxiliar-optica.jpg',
    categoria: 'sanidad',
    copy: {
      slogan: 'Especialízate en el cuidado de la salud visual y auditiva.',
      textosPrincipales: ['Conceptos básicos del ojo, lentes y graduación, monturas, lentes de contacto y audífonos.'],
      titulos: ['Óptica y Análisis Visual', 'Graduación e Instrumentos', 'Audiología']
    },
    descripcionDetallada: {
      introduccion: "El curso de Auxiliar de Óptica nos ofrece la garantía de obtener una visión global acerca de los conceptos básicos relativos al ojo, las lentes y la graduación, así como las monturas, lentes de contacto y los audífonos, para finalizar con un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta el trato al público, aconsejar, escuchar, ayudar, fomentar la promoción de la salud, la belleza y el bienestar, adquirirás los conocimientos teórico-prácticos, habilidades y destrezas para trabajar en Centros Auditivos, Centros Ópticos y Farmacias obteniendo doble titulación.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / modalidad online' },
        { icono: 'Users', texto: '200 horas de prácticas' },
        { icono: 'Award', texto: 'Doble titulación' },
        { icono: 'Book', texto: 'Grupos reducidos' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      salidasProfesionales: [
        "Centros Auditivos", "Centros Ópticos", "Farmacias", "Ópticas especializadas", "Centros de audiología"
      ],
      modulos: [
        { titulo: "Óptica y Análisis Visual", contenido: ["Historia de la óptica", "Anatomía ocular", "Proceso visual", "Agudeza visual", "Defectos visuales", "Examen optométrico"] },
        { titulo: "Graduación e Instrumentos Ópticos", contenido: ["Graduación e instrumentos ópticos", "Las lentes oftálmicas", "Catálogo y tarifa de lentes oftálmicas", "Las monturas ópticas", "Nociones básicas sobre las lentes de contacto"] },
        { titulo: "Anatomía del Oído y Audífonos", contenido: ["Anatomía del oído", "Pérdida de audición y audífonos"] },
        { titulo: "Aspectos Profesionales", contenido: ["Código deontológico", "Comportamiento de venta", "Técnicas de venta"] },
        { titulo: "Práctica", contenido: ["Versión demo del software de gestión eficiente de ópticas – Optisoft"] }
      ],
      profesores: [],
      cursosComplementarios: ["Auxiliar de farmacia", "Auxiliar de enfermería", "Ciclo medio de farmacia"]
    }
  },
  { 
    nombre: 'Ayudante Técnico Veterinario (ATV)', 
    slugBase: 'ayudante-tecnico-veterinario-atv', 
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    categoria: 'veterinaria',
    copy: {
      slogan: 'Podemos juzgar el corazón de una persona por la forma en que trata a los animales.',
      textosPrincipales: ['Técnicas avanzadas de asistencia veterinaria, farmacología, imagenología y urgencias veterinarias.'],
      titulos: ['Técnicas Avanzadas', 'Farmacología Veterinaria', 'Imagenología']
    },
    descripcionDetallada: {
      introduccion: "El curso de ATV ofrece los conocimientos imprescindibles acerca de las técnicas y conocimientos que debe manejar un Ayudante Técnico de Veterinaria, que incluye legislación actual, nivel medio de anatomía y fisiología animal, farmacología y toxicología, imagenología, introducción a la odontología veterinaria, atención en el quirófano y hospitalización, urgencias veterinarias y un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si te gusta el mundo animal, ya eres Auxiliar de Veterinaria y deseas ampliar conocimientos, adquirirás la confianza, habilidades y conocimientos para trabajar como ATV en clínicas veterinarias, centros veterinarios, tiendas de animales, ONGs y núcleos zoológicos.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: '50 horas de prácticas en clínicas' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Modalidad presencial y online' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "690€",
        modalidad: "6 cuotas de 90€ + 150€ matrícula",
        incluye: "Agencia de colocación oficial y material didáctico."
      },
      salidasProfesionales: [
        "Clínicas veterinarias", "Hospitales veterinarios", "Centros de investigación", "Zoológicos y parques naturales", "Refugios y protectoras de animales", "Laboratorios de análisis veterinarios", "Industria farmacéutica veterinaria"
      ],
      modulos: [
        { titulo: "Identificación y legislación", contenido: ["Registro Canario de Identificación animal", "Obligaciones del propietario", "Documentos para registro", "Pasaporte y trámites de viaje"] },
        { titulo: "Anatomía y fisiología (nivel medio)", contenido: ["Anatomía del hueso y articulaciones", "Sistema circulatorio", "Sistema respiratorio", "Sistema digestivo", "Sistema urinario", "Sistema reproductor"] },
        { titulo: "Toma de muestras", contenido: ["Tipos de muestras", "Recogida, identificación y conservación", "Tratamiento y envío", "Desperdicios sanitarios"] },
        { titulo: "Enfermedades infecciosas", contenido: ["Aislamiento del paciente", "Zoonosis y protección", "Enfermedades virales, bacterianas y parasitarias"] },
        { titulo: "Farmacología y Toxicología", contenido: ["Medicamentos y conservación", "Administración bajo tutela veterinaria", "Intoxicaciones frecuentes", "Ajustes de tratamientos"] },
        { titulo: "Imagenología", contenido: ["Sujeción para imágenes", "Equipos de Rayos X", "Ecosonografía", "TAC y Resonancia magnética"] },
        { titulo: "Odontología veterinaria", contenido: ["Anatomía del diente", "Limpieza dental", "Enfermedad periodontal", "Material odonto-veterinario"] },
        { titulo: "Sistema Nervioso Central", contenido: ["Cuidados especiales", "Manipulación y observación", "Historia evolutiva"] },
        { titulo: "Manejo quirúrgico", contenido: ["Preparación del paciente", "Anestesia", "Material quirúrgico", "Cuidados postoperatorios"] },
        { titulo: "Hospitalización y urgencia", contenido: ["Área hospitalaria", "Medicación", "Pacientes heridos", "Atención de urgencia"] }
      ],
      profesores: [
        { 
          nombre: "Equipo Veterinario", 
          foto: "/images/profesores/alexis.jpg", 
          especialidad: "Veterinarios en activo",
          bio: "Docentes veterinarias y veterinarios con amplia experiencia profesional en el sector.",
          tags: ["Medicina Veterinaria", "Cirugía", "Urgencias"]
        }
      ],
      cursosComplementarios: ["ATV felinos", "ATV animales Exóticos", "Seminario de urgencias", "Peluquería canina", "Adiestramiento canino"]
    }
  },
  { 
    nombre: 'Entrenador Personal', 
    slugBase: 'entrenador-personal', 
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'El ejercicio no cambia solo tu cuerpo, cambia tu mente, tu actitud y tu humor.',
      textosPrincipales: ['Anatomía, dietética y nutrición aplicada al entrenamiento, programas de ejercicio seguro y efectivo.'],
      titulos: ['Anatomía y Fisiología', 'Entrenamiento Personalizado', 'Nutrición Deportiva']
    },
    descripcionDetallada: {
      introduccion: "El curso de Entrenador/a personal ofrece los conocimientos imprescindibles del Entrenador personal como anatomía, dietética y nutrición aplicada al entrenamiento personal, programas de ejercicio seguro y efectivo adecuado al estado de salud, capacidad, necesidades y metas del cliente y un módulo de orientación laboral dinámico y actualizado.",
      queAprendes: "Si sientes que el ejercicio físico ha cambiado tu vida o crees que te ayudará a cambiarla y además quieres compartirlo, y dedicarte profesionalmente, adquirirás la confianza, habilidades y conocimientos para aplicar a nivel profesional en balnearios, spas, gimnasios, abrir tu propio box o mejorar tu calidad de vida.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: 'Prácticas incluidas en aula' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: '3 horas por sesión' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "1.050€",
        modalidad: "10 cuotas de 90€ + 150€ matrícula",
        incluye: "Agencia de colocación oficial y material didáctico."
      },
      salidasProfesionales: [
        "Gimnasios y centros deportivos", "Entrenador personal independiente", "Centros de bienestar y spas", "Centros de rehabilitación", "Clubes deportivos", "Hoteles con instalaciones deportivas", "Centros de medicina deportiva", "Consulta privada"
      ],
      modulos: [
        { titulo: "Fundamentos Básicos", contenido: ["Preparación física", "Actividad física", "Ejercicio físico", "Deporte"] },
        { titulo: "Anatomía y Fisiología", contenido: ["Introducción al Cuerpo Humano", "Sistema Óseo y Articular", "Sistema Muscular", "Sistemas Cardiovascular y Respiratorio"] },
        { titulo: "Fisiología del Ejercicio", contenido: ["Sistema Nervioso", "Fisiología del ejercicio", "Metabolismo energético", "Biomecánica"] },
        { titulo: "Primeros Auxilios", contenido: ["Técnicas básicas de primeros auxilios", "Actuación en emergencias"] },
        { titulo: "Nutrición y Suplementación", contenido: ["Introducción a la nutrición", "Necesidades calóricas", "Manipulaciones dietéticas", "Suplementos deportivos"] },
        { titulo: "Evaluación y Condición Física", contenido: ["Contracción muscular", "Condición física y evaluación", "Protocolos y valores", "Planilla de Salud"] },
        { titulo: "Técnicas de Entrenamiento", contenido: ["Ejercicios de flexibilidad", "Técnica de ejercicios de fuerza", "Métodos cardiovasculares", "Entrenamiento pliométrico"] },
        { titulo: "Poblaciones Especiales", contenido: ["Clientes preadolescentes y adultos", "Problemas nutricionales", "Enfermedades cardiovasculares", "Problemas ortopédicos"] },
        { titulo: "Planificación y Metodología", contenido: ["Diseño de planilla de entrenamiento", "Principios del Entrenamiento", "Metodología de preparación", "Rol del Entrenador personal"] }
      ],
      profesores: [],
      cursosComplementarios: ["Nutrición deportiva", "Instructor de yoga", "Dietética y nutrición", "Quiromasaje"]
    }
  },
  { 
    nombre: 'Instructor de Yoga', 
    slugBase: 'instructor-yoga', 
    imagen: '/images/cursos/salud-bienestar-y-deporte.jpg',
    categoria: 'bienestar',
    copy: {
      slogan: 'El verdadero yoga no trata de la forma de tu cuerpo, sino de la forma de tu vida.',
      textosPrincipales: ['Hatha Yoga, trabajo en cuerpo, mente y emociones, conocimientos integrales para instructor.'],
      titulos: ['Hatha Yoga', 'Filosofía Oriental', 'Técnicas de Meditación']
    },
    descripcionDetallada: {
      introduccion: "Nuestro curso de Instructor/a de Yoga, basado en el Hatha Yoga se complementa los conocimientos y experiencia práctica de la docente a través de su formación como instructora de yoga y terapeuta transpersonal ofreciendo los conocimientos de forma integral. Por tanto abarcaremos el trabajo en cuerpo, mente y emociones imprescindible para el correcto desempeño de las funciones del instructor o instructora de yoga.",
      queAprendes: "Si sientes que tu camino se encuentra en la práctica del yoga y que deseas contribuir no solo a tu crecimiento y bienestar, sino al de los demás, adquiriremos conocimientos, destrezas, habilidades para crecer personalmente y dedicarnos profesionalmente al Yoga.",
      puntosClave: [
        { icono: 'Clock', texto: '10 meses / 40 sesiones' },
        { icono: 'Users', texto: 'Prácticas incluidas en aula' },
        { icono: 'Award', texto: 'Certificación European Yoga Alliance' },
        { icono: 'Book', texto: '5 horas por sesión' }
      ],
      requisitos: ["2º de ESO o EGB superado."],
      inversion: {
        total: "1.075€",
        modalidad: "10 cuotas de 90€ + 175€ matrícula",
        incluye: "Agencia de colocación oficial y certificación ELLA."
      },
      salidasProfesionales: [
        "Centros de yoga", "Gimnasios y centros deportivos", "Centros de bienestar y spas", "Consulta privada", "Retiros y talleres", "Hoteles wellness", "Centros de rehabilitación", "Clases particulares"
      ],
      modulos: [
        { titulo: "Yoga", contenido: ["¿Qué es el Yoga?", "Origen del Yoga", "Sendas del Yoga", "Los Yoga Sutras de Patanjali", "Los 8 pasos del Yoga"] },
        { titulo: "Tantra", contenido: ["¿Qué es el Tantra?", "Tantra y Yoga", "Base doctrinal", "Mandala, Yantra y Mantra", "La sexualidad Tántrica"] },
        { titulo: "El Universo y el Hombre", contenido: ["La evolución de los elementos", "Los tres cuerpos", "Las dimensiones de la mente", "Los cinco Koshas"] },
        { titulo: "Los Chakras", contenido: ["Potencial a través de los chakras", "Los colores y cualidades", "Técnicas de desbloqueo", "Asanas específicas", "Mantras específicos"] },
        { titulo: "La Energía", contenido: ["Los Nadis", "Ida y Pingala", "Prana y Apana", "Bindu y Nada"] },
        { titulo: "La Mente", contenido: ["La concentración", "La consciencia testigo", "El ego", "Obstáculos mentales", "La transformación del control mental"] },
        { titulo: "El Cuerpo", contenido: ["La columna vertebral", "Sistemas del cuerpo", "Primeros auxilios", "Reanimación Cardiopulmonar básica"] },
        { titulo: "La Salud", contenido: ["Neti y técnicas", "Higiene y hábitos saludables", "Dieta vegetariana", "Los Doshas en ayurveda"] },
        { titulo: "La Respiración", contenido: ["Sistema respiratorio", "Respiración abdominal", "Respiración Yóguica completa", "Control de la cintura abdominal"] },
        { titulo: "Pranayama", contenido: ["Beneficios del pranayama", "Kapalabhati Pranayama", "Nadi Shodhana Pranayama", "Bhramari Pranayama", "Ujjayi Pranayama"] },
        { titulo: "Bandhas", contenido: ["Llaves energéticas", "Jalandhara Bandha", "Uddiyana Bandha", "Mula Bandha", "Maha Bandha"] },
        { titulo: "Calentamiento", contenido: ["Diferentes técnicas", "Bandas extensibles", "Calentamiento dinámico", "En equilibrio", "Apoyado en la música"] },
        { titulo: "Asanas", contenido: ["Normas para la realización", "Actitud mental", "Posturas invertidas", "Posturas de flexión", "Posturas de equilibrio", "La sesión de asanas"] },
        { titulo: "Trataka", contenido: ["La concentración visual", "Trataka y meditación", "Técnica y ejercicios"] },
        { titulo: "Mantras", contenido: ["Nada Yoga", "Ajapa japa", "Danza y mantra", "Diferentes mantras"] }
      ],
      profesores: [
        { 
          nombre: "Vanesa Hernández", 
          foto: "/images/profesores/sara.jpg", 
          especialidad: "Instructora de Yoga certificada",
          bio: "Titulada por la European Yoga Alliance desde 2009, formada por la escuela Satyam Yoga University en India en 2011, con especialización en yoga para niños en 2012.",
          tags: ["Hatha Yoga", "European Yoga Alliance", "Yoga Infantil"]
        }
      ],
      cursosComplementarios: ["Entrenador personal", "Dietética y nutrición", "Quiromasaje", "Instructor de meditación"]
    }
  },
  { 
    nombre: 'Técnico Veterinario en Felinos', 
    slugBase: 'tecnico-veterinario-felinos', 
    imagen: '/images/cursos/auxiliar-veterinaria.jpg',
    categoria: 'veterinaria',
    copy: {
      slogan: 'Los gatos eligen a sus dueños, no al revés.',
      textosPrincipales: ['Especialización única en cuidado específico de gatos, anatomía felina y enfermedades exclusivas.'],
      titulos: ['Medicina Felina', 'Comportamiento Felino', 'Especialización Veterinaria']
    },
    descripcionDetallada: {
      introduccion: "El curso de Técnico Veterinario en Felinos ofrece una especialización única en el cuidado específico de gatos, incluyendo anatomía y fisiología específica felina, enfermedades exclusivas de gatos, técnicas de manejo especializado, medicina preventiva felina, comportamiento y etología felina y un módulo de orientación laboral especializado.",
      queAprendes: "Si ya tienes formación como Auxiliar de Veterinaria y sientes una especial conexión con los felinos, quieres especializarte en su cuidado específico y convertirte en un experto en medicina felina, te especializarás como técnico veterinario experto en felinos para trabajar en clínicas especializadas, hospitales veterinarios, refugios y consulta especializada.",
      puntosClave: [
        { icono: 'Clock', texto: '6 meses / 24 sesiones' },
        { icono: 'Users', texto: 'Prácticas incluidas en aula' },
        { icono: 'Award', texto: 'Agencia de colocación oficial' },
        { icono: 'Book', texto: 'Grupos reducidos' }
      ],
      requisitos: ["Auxiliar de Veterinaria o conocimientos equivalentes."],
      salidasProfesionales: [
        "Clínicas veterinarias especializadas en felinos", "Hospitales veterinarios", "Refugios y protectoras de gatos", "Consulta especializada", "Centros de investigación", "Criaderos especializados"
      ],
      modulos: [
        { titulo: "Anatomía y Fisiología Felina", contenido: ["Diferencias anatómicas específicas", "Sistema digestivo felino", "Sistema urinario", "Sistema respiratorio y cardiovascular", "Órganos de los sentidos", "Sistema reproductor"] },
        { titulo: "Razas Felinas y Genética", contenido: ["Clasificación de razas", "Características específicas", "Predisposiciones genéticas", "Enfermedades hereditarias", "Programas de cría responsable"] },
        { titulo: "Comportamiento y Etología", contenido: ["Comportamiento natural del gato", "Comunicación felina", "Territorialidad y marcaje", "Comportamiento social", "Problemas de comportamiento", "Enriquecimiento ambiental"] },
        { titulo: "Manejo Específico", contenido: ["Técnicas de sujeción sin estrés", "Manejo de gatos agresivos", "Reducción del estrés", "Técnicas de contención", "Transporte y hospitalización"] },
        { titulo: "Patologías Respiratorias", contenido: ["Complejo respiratorio felino", "Asma felino", "Infecciones virales respiratorias"] },
        { titulo: "Patologías Digestivas y Urinarias", contenido: ["Enfermedad inflamatoria intestinal", "Lipidosis hepática", "FLUTD", "Cistitis idiopática", "Obstrucción uretral"] },
        { titulo: "Enfermedades Infecciosas", contenido: ["Leucemia felina (FeLV)", "Inmunodeficiencia felina (FIV)", "Peritonitis infecciosa felina (PIF)", "Panleucopenia felina"] },
        { titulo: "Medicina Preventiva", contenido: ["Programas de vacunación", "Desparasitación", "Medicina geriátrica", "Programas wellness"] },
        { titulo: "Nutrición Especializada", contenido: ["Requerimientos nutricionales", "Alimentación por etapas", "Dietas terapéuticas", "Obesidad felina"] },
        { titulo: "Reproducción y Neonatología", contenido: ["Ciclo reproductivo", "Gestación y parto", "Cuidados neonatales", "Esterilización temprana"] },
        { titulo: "Técnicas Diagnósticas", contenido: ["Toma de muestras", "Interpretación de análisis", "Técnicas de imagen", "Pruebas específicas"] },
        { titulo: "Farmacología Felina", contenido: ["Metabolismo específico", "Medicamentos contraindicados", "Dosificación específica", "Toxicidad"] },
        { titulo: "Urgencias y Cuidados Intensivos", contenido: ["Emergencias frecuentes", "Obstrucción uretral", "Intoxicaciones", "Cuidados intensivos"] },
        { titulo: "Especialidades", contenido: ["Dermatología felina", "Oftalmología y otología", "Geriatría felina", "Cirugía básica"] }
      ],
      profesores: [],
      cursosComplementarios: ["Auxiliar de Veterinaria", "ATV", "Etología clínica", "Medicina veterinaria especializada"]
    }
  },
  { 
    nombre: 'Ciclo Formativo de Grado Medio - Farmacia y Parafarmacia', 
    slugBase: 'cfgm-farmacia-parafarmacia',
    imagen: '/images/cursos/ciclos-formativos.jpg',
    categoria: 'ciclos',
    copy: {
      slogan: 'Tu puerta de entrada al sector farmacéutico con un título oficial.',
      textosPrincipales: ['Título Oficial del Ministerio de Educación', 'Dispensación Farmacéutica Profesional', 'Prácticas en Oficinas de Farmacia'],
      titulos: ['Título Oficial', 'Práctica Farmacéutica', 'Técnico en Farmacia']
    },
    descripcionDetallada: {
      introduccion: "Fórmate como Técnico en Farmacia y Parafarmacia con un título oficial y adquiere los conocimientos para trabajar en farmacias, parafarmacias y hospitales, dispensando productos y elaborando preparados farmacéuticos.",
      queAprendes: "Este ciclo te capacita para la dispensación de productos farmacéuticos y parafarmacéuticos, la realización de operaciones básicas de laboratorio, la promoción de la salud y la gestión integral de la oficina de farmacia.",
      puntosClave: [
        { icono: 'Clock', texto: '3 cursos / 2000h' },
        { icono: 'Users', texto: 'Modalidad Presencial y Prácticas' },
        { icono: 'Award', texto: 'Título Oficial del Ministerio' }
      ],
      requisitos: [
        "Título de Graduado en Educación Secundaria Obligatoria (ESO)",
        "Título de Formación Profesional Básica",
        "Título de Técnico o Técnico Auxiliar",
        "Haber superado el segundo curso de BUP",
        "Haber superado la prueba de acceso a ciclos de grado medio"
      ],
      salidasProfesionales: [
        "Técnico en farmacia",
        "Auxiliar de farmacia",
        "Técnico en parafarmacia",
        "Técnico en almacén de medicamentos",
        "Técnico en farmacia hospitalaria",
        "Delegado comercial de productos farmacéuticos y parafarmacéuticos"
      ],
      modulos: [
        { titulo: "DISPOSICIÓN Y VENTA DE PRODUCTOS", contenido: ["Dispensación de parafarmacia", "Operaciones básicas de laboratorio", "Promoción de la Salud", "Primeros Auxilios"] },
        { titulo: "OFICINA DE FARMACIA", contenido: ["Organización y gestión", "Atención al cliente", "Sistemas de información"] },
        { titulo: "DISPENSACIÓN DE PRODUCTOS FARMACÉUTICOS", contenido: ["Medicamentos con y sin receta", "Productos sanitarios"] },
        { titulo: "FORMULACIÓN MAGISTRAL", contenido: ["Preparación de medicamentos", "Control de calidad", "Normativa aplicable"] },
        { titulo: "FORMACIÓN Y ORIENTACIÓN LABORAL", contenido: ["Orientación profesional", "Legislación laboral", "Seguridad y salud"] },
        { titulo: "EMPRESA E INICIATIVA EMPRENDEDORA", contenido: ["Creación de empresas", "Gestión empresarial", "Plan de negocio"] },
        { titulo: "FORMACIÓN EN CENTROS DE TRABAJO (FCT)", contenido: ["Prácticas profesionales en empresas del sector.", "Aplicación de conocimientos teóricos.", "Integración en el mundo laboral."] }
      ],
      profesores: [],
      cursosComplementarios: [
        "Curso dermocosmética", "Seminario Unycop", "Curso Auxiliar de óptica", "Ciclo superior de Higiene bucodental", "Inglés (todos los niveles)"
      ],
      inversion: {
        total: "5.000€ (pago único) / 6.000€ (financiado)",
        modalidad: "DURACIÓN: 3 años. Opción financiada: 30 cuotas de 160€ + 200€ matrícula. Se cursan 10 cuotas por año académico (3 años).",
        incluye: "Título Oficial del Ministerio de Educación y acceso a ciclos de grado superior."
      }
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
    "dietetica-nutricion": {
      titulo: "Folleto Completo - Dietética y Nutrición",
      descripcion: "Programa completo de dietética y nutrición con enfoque profesional.",
      archivo: "/docs/brochures/folleto-dietetica-nutricion.pdf",
      requiereEmail: false,
      consentimientoRGPD: false
    },
    "auxiliar-odontologia": {
      titulo: "Folleto Completo - Auxiliar de Odontología",
      descripcion: "Programa especializado en odontología e higiene bucodental.",
      archivo: "/docs/brochures/folleto-auxiliar-odontologia.pdf",
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