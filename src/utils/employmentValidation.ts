/**
 * Validaciones específicas para formularios de empleo
 * Extiende validaciones existentes sin modificar funcionalidad base
 */

import { EmploymentFormData, EmploymentStatus } from '../types/employment';

export const validateEmploymentForm = (formData: EmploymentFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // Validaciones básicas
  if (!formData.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio';
  }

  if (!formData.apellidos.trim()) {
    errors.apellidos = 'Los apellidos son obligatorios';
  }

  if (!formData.email.trim()) {
    errors.email = 'El email es obligatorio';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'El email no tiene un formato válido';
  }

  if (!formData.telefono.trim()) {
    errors.telefono = 'El teléfono es obligatorio';
  } else if (!isValidPhone(formData.telefono)) {
    errors.telefono = 'El teléfono no tiene un formato válido';
  }

  // DNI es opcional por políticas de privacidad
  if (formData.dni && formData.dni.trim() && !isValidDNI(formData.dni)) {
    errors.dni = 'El DNI no tiene un formato válido';
  }

  if (!formData.situacion_laboral) {
    errors.situacion_laboral = 'La situación laboral es obligatoria';
  }

  // Validaciones específicas para ocupados
  // La empresa actual es opcional para mayor flexibilidad
  if (formData.situacion_laboral === 'ocupados' && formData.empresa_actual && formData.empresa_actual.trim().length > 0) {
    // Solo validamos formato si se proporciona
    if (formData.empresa_actual.trim().length < 2) {
      errors.empresa_actual = 'El nombre de la empresa debe tener al menos 2 caracteres';
    }
  }

  // Validaciones específicas para desempleados
  if (formData.situacion_laboral === 'desempleados') {
    if (!formData.sector_interes?.trim()) {
      errors.sector_interes = 'El sector de interés es obligatorio para desempleados';
    }
  }

  if (!formData.disponibilidad) {
    errors.disponibilidad = 'La disponibilidad horaria es obligatoria';
  }

  if (!formData.provincia.trim()) {
    errors.provincia = 'La provincia es obligatoria';
  }

  if (!formData.consentimiento_datos) {
    errors.consentimiento_datos = 'Debes aceptar el tratamiento de datos personales';
  }

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[0-9]{9,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidDNI = (dni: string): boolean => {
  const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  if (!dniRegex.test(dni)) return false;
  
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const numbers = dni.substring(0, 8);
  const letter = dni.substring(8, 9).toUpperCase();
  
  return letters.charAt(parseInt(numbers, 10) % 23) === letter;
};

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const formatDNI = (dni: string): string => {
  return dni.toUpperCase().replace(/[^0-9TRWAGMYFPDXBNJZSQVHLCKE]/g, '');
};

export const getEmploymentSpecificRequirements = (type: EmploymentStatus): string[] => {
  switch (type) {
    case 'ocupados':
      return [
        'Ser trabajador activo de cualquier sector',
        'Tener contrato laboral vigente',
        'Residir en Canarias',
        'Disponibilidad horaria compatible con trabajo'
      ];
    case 'desempleados':
      return [
        'Estar inscrito como demandante de empleo',
        'Residir en Canarias',
        'Tener más de 16 años',
        'Compromiso con la búsqueda activa de empleo'
      ];
    default:
      return [];
  }
};

export const getEmploymentSpecificBenefits = (type: EmploymentStatus): string[] => {
  switch (type) {
    case 'ocupados':
      return [
        '100% Gratuito (financiado SEPE)',
        'Certificación oficial reconocida',
        'Horarios compatibles con trabajo',
        'Mejora tu CV y empleabilidad',
        'Aplicación práctica inmediata'
      ];
    case 'desempleados':
      return [
        '100% Gratuito (financiado SEPE/SCE)',
        'Certificados de profesionalidad',
        'Prácticas en empresas incluidas',
        'Orientación laboral personalizada',
        'Mejora tu empleabilidad'
      ];
    default:
      return [];
  }
};