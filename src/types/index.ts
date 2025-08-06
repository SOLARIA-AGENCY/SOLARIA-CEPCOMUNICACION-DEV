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

export type Inversion = {
  total: string;
  modalidad: string;
  incluye: string;
};

export type DescripcionDetallada = {
  introduccion: string;
  queAprendes: string;
  puntosClave: PuntoClave[];
  inversion?: Inversion;
  salidasProfesionales: string[];
  modulos: Modulo[];
  profesores: Profesor[];
  requisitos?: string[];
  cursosComplementarios?: string[];
};

export type Curso = {
  nombre: string;
  codigo: string;
  slugBase: string;
  imagen: string;
  categoria: 'sanidad' | 'veterinaria' | 'bienestar' | 'ciclos' | 'adiestramiento' | 'diseño';
  copy: {
    slogan: string;
    textosPrincipales: string[];
    titulos: string[];
  };
  descripcionDetallada?: DescripcionDetallada;
  centro: string;
  turno: string;
  inicio: string;
  subtitulo?: string;
  modalidad?: string;
};

// Global window interface extensions for tracking and analytics
declare global {
  interface Window {
    fbq?: (command: string, event: string, data?: Record<string, unknown>) => void;
    gtag?: {
      (command: 'event', action: string, parameters?: Record<string, unknown>): void;
      (command: 'config' | 'js', target: string | Date, config?: Record<string, unknown>): void;
      (command: string, targetId: string, config?: Record<string, unknown>): void;
    };
    dataLayer?: Array<Record<string, unknown>>;
    cookieconsent?: {
      reset: () => void;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }
}

// Employment course characteristics interface
export interface CursoCharacteristics {
  modalidad?: 'presencial' | 'online' | 'hibrido';
  horario?: 'mañana' | 'tarde' | 'noche';
  compatible_trabajo?: boolean;
  certificacion_oficial?: boolean;
  financiado_sepe?: boolean;
  practicas_empresas?: boolean;
  orientacion_laboral?: boolean;
  certificado_profesionalidad?: boolean;
  financiado_sepe_sce?: boolean;
}
