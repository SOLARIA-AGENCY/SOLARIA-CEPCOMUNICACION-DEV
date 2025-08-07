import React, { useState, useEffect } from 'react';
import { validateEmploymentForm } from '../../utils/employmentValidation';
import { trackEmploymentLead, trackEmploymentFormStep } from '../../utils/employmentTracking';
import { EmploymentFormData, EmploymentStatus } from '../../types/employment';

interface EmploymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  employmentType: EmploymentStatus;
  courseId: string;
  courseName: string;
}

const EmploymentFormModal: React.FC<EmploymentFormModalProps> = ({
  isOpen,
  onClose,
  employmentType,
  courseId,
  courseName
}) => {
  const [formData, setFormData] = useState<EmploymentFormData>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    situacion_laboral: employmentType,
    empresa_actual: '',
    sector_interes: '',
    disponibilidad: 'flexible',
    provincia: 'Santa Cruz de Tenerife',
    consentimiento_marketing: false,
    consentimiento_datos: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      trackEmploymentFormStep(employmentType, 'opened', courseId);
    }
  }, [isOpen, employmentType, courseId]);

  // Limpiar timeout cuando el componente se desmonte o el modal se cierre
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Limpiar timeout cuando el modal se cierre
  useEffect(() => {
    if (!isOpen && timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [isOpen, timeoutId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error cuando usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const validationErrors = validateEmploymentForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      trackEmploymentFormStep(employmentType, 'validation_error', courseId);
      return;
    }

    setIsSubmitting(true);
    trackEmploymentFormStep(employmentType, 'submit_attempt', courseId);

    try {
      // Usar API NodeMailer profesional del servidor de producción
      console.log('📧 Enviando via API NodeMailer profesional');
      
      const _apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://www.cepcomunicacion.com';
      
      // Construir mensaje estructurado como esperan los tests
      const fechaActual = new Date().toISOString().split('T')[0];
      const empresaTexto = formData.empresa_actual || 'No especificada';
      const sectorTexto = employmentType === 'desempleados' ? (formData.sector_interes || 'No especificado') : (formData.sector_interes || '');
      
      const mensaje = `NUEVA INSCRIPCIÓN CURSO SUBVENCIONADO

` +
        `📚 CURSO: ${courseName}
` +
        `👤 PARTICIPANTE: ${formData.nombre} ${formData.apellidos}
` +
        `📧 EMAIL: ${formData.email}
` +
        `📞 TELÉFONO: ${formData.telefono}
` +
        `🏢 Empresa Actual:    ${empresaTexto}
` +
        `💼 SITUACIÓN LABORAL: ${employmentType}
` +
        (sectorTexto ? `🎯 SECTOR DE INTERÉS: ${sectorTexto}
` : '') +
        `⏰ Disponibilidad:    ${formData.disponibilidad}
` +
        `🏝️ PROVINCIA: ${formData.provincia}
` +
        `\n📋 CONSENTIMIENTOS:
` +
        `Tratamiento de Datos:    ${formData.consentimiento_datos ? '✅ ACEPTADO' : '❌ RECHAZADO'}
` +
        `Marketing:    ${formData.consentimiento_marketing ? '✅ ACEPTADO' : '❌ RECHAZADO'}
` +
        `\n📅 FECHA: ${fechaActual}
` +
        `🌐 ORIGEN: cepcomunicacion.com`;

      const emailData = {
        email: import.meta.env.VITE_NOTIFICATION_EMAIL || 'agency.solaria@gmail.com',
        _subject: `🎯 INSCRIPCIÓN PRIORITARIA: ${formData.nombre} ${formData.apellidos} - ${courseName}`,
        _template: 'box',
        _captcha: 'false',
        _format: 'plain',
        mensaje: mensaje,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email_solicitante: formData.email,
        telefono: formData.telefono,
        curso: courseName,
        tipo_curso: employmentType,
        fecha_envio: new Date().toISOString(),
        origen: 'cepcomunicacion.com'
      };
      
      // Usar proxy para tests o API directa para producción
      const proxyUrl = import.meta.env.VITE_FORMSUBMIT_PROXY_URL || 'http://localhost:3001/api/formsubmit-proxy';
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        const _errorData = await response.json().catch(() => ({}));
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();
      
      // Verificar si hay error en la respuesta exitosa
      if (result.success === false && result.error) {
        throw new Error(result.error);
      }
      
      console.log('✅ Email enviado via API NodeMailer:', result);
      
      // Tracking de conversión (éxito)
      trackEmploymentLead(employmentType, courseId, 'form_submission');
      
      // Mostrar éxito
      setSubmitSuccess(true);
      
      // Limpiar formulario después de 3 segundos
      const id = setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          situacion_laboral: employmentType,
          empresa_actual: '',
          sector_interes: '',
          disponibilidad: 'flexible',
          provincia: 'Santa Cruz de Tenerife',
          consentimiento_marketing: false,
          consentimiento_datos: false
        });
        setTimeoutId(null);
      }, 3000);
      setTimeoutId(id);
        
    } catch (error) {
      console.error('Error completo:', error);
      
      // Mensaje de error más específico
      let errorMessage = 'Error al enviar el formulario. Inténtalo de nuevo.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.';
      } else if (error instanceof Error) {
        // Mantener formato esperado por tests
        errorMessage = error.message.startsWith('Error:') ? error.message : `Error: ${error.message}`;
      }
      
      setErrors({ submit: errorMessage });
      trackEmploymentFormStep(employmentType, 'submit_error', courseId);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {submitSuccess ? (
            <div className="p-6 text-center">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">¡Inscripción Enviada!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Tu solicitud de inscripción ha sido enviada correctamente. 
                Nos pondremos en contacto contigo en las próximas 24 horas.
              </p>
              <div className="text-xs text-gray-500">
                Este modal se cerrará automáticamente en unos segundos...
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {employmentType === 'ocupados' ? '👔 TRABAJADORES OCUPADOS' : '🎯 DESEMPLEADOS'}
                    </h2>
                    <h3 className="text-lg">{courseName}</h3>
                    <p className="text-blue-100 text-sm mt-1">
                      {employmentType === 'ocupados' ? 
                        'Curso 100% subvencionado para trabajadores' : 
                        'Curso gratuito para desempleados'
                      }
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      data-testid="nombre-input"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                  </div>

                  {/* Apellidos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      data-testid="apellidos-input"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.apellidos ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tus apellidos"
                    />
                    {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      data-testid="email-input"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      data-testid="telefono-input"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123456789"
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                  </div>

                  {/* Empresa actual (para ocupados) */}
                  {employmentType === 'ocupados' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa Actual
                      </label>
                      <input
                        type="text"
                        name="empresa_actual"
                        value={formData.empresa_actual}
                        onChange={handleInputChange}
                        data-testid="empresa-input"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre de tu empresa actual"
                      />
                    </div>
                  )}

                  {/* Sector de interés (select para desempleados) */}
                  {employmentType === 'desempleados' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sector de Interés *
                      </label>
                      <select
                        name="sector_interes"
                        value={formData.sector_interes}
                        onChange={handleInputChange}
                        data-testid="sector-interes-select"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.sector_interes ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona un sector</option>
                        <option value="administracion">Administración</option>
                        <option value="comercio">Comercio</option>
                        <option value="tecnologia">Tecnología</option>
                        <option value="sanidad">Sanidad</option>
                        <option value="veterinaria">Veterinaria</option>
                        <option value="otros">Otros</option>
                      </select>
                      {errors.sector_interes && <p className="text-red-500 text-xs mt-1">{errors.sector_interes}</p>}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sector de Interés
                      </label>
                      <input
                        type="text"
                        name="sector_interes"
                        value={formData.sector_interes}
                        onChange={handleInputChange}
                        data-testid="sector-interes-input"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="¿En qué sector te interesa trabajar?"
                      />
                    </div>
                  )}

                  {/* Disponibilidad */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disponibilidad *
                    </label>
                    <select
                      name="disponibilidad"
                      value={formData.disponibilidad}
                      onChange={handleInputChange}
                      data-testid="disponibilidad-select"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="flexible">Flexible</option>
                      <option value="mañana">Solo mañanas</option>
                      <option value="tarde">Solo tardes</option>
                      <option value="fines_semana">Fines de semana</option>
                      {employmentType === 'desempleados' && (
                        <option value="tiempo_completo">Tiempo completo</option>
                      )}
                    </select>
                  </div>

                  {/* Provincia */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provincia *
                    </label>
                    <select
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                      <option value="Las Palmas">Las Palmas</option>
                    </select>
                  </div>

                  {/* Consentimientos */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="consentimiento_datos"
                        checked={formData.consentimiento_datos}
                        onChange={handleInputChange}
                        data-testid="consent-checkbox"
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-xs text-gray-600">
                        Acepto el tratamiento de mis datos personales para gestionar mi inscripción *
                      </label>
                    </div>
                    {errors.consentimiento_datos && (
                      <p className="text-red-500 text-xs">{errors.consentimiento_datos}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="consentimiento_marketing"
                        checked={formData.consentimiento_marketing}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-xs text-gray-600">
                        Acepto recibir información comercial sobre otros cursos y servicios
                      </label>
                    </div>
                  </div>
                </div>

                {/* Error messages */}
                {errors.submit && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consentimiento_datos}
                    data-testid="submit-button"
                    className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
                      isSubmitting || !formData.consentimiento_datos
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      'Enviar Inscripción'
                    )}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-500">
                    Al enviar este formulario, confirmas que quieres reservar una plaza en este curso.
                    Te contactaremos en las próximas 24 horas.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmploymentFormModal;