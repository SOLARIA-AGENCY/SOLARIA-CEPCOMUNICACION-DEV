import React, { useState, useEffect } from 'react';
import { validateEmploymentForm } from '../../utils/employmentValidation';
import { trackEmploymentLead, trackEmploymentFormStep } from '../../utils/employmentTracking';
// import { ocupadosDefaultConfig } from '../../config/cursos-ocupados';
// import { desempleadosDefaultConfig } from '../../config/cursos-desempleados';
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

  // const config = employmentType === 'ocupados' ? ocupadosDefaultConfig : desempleadosDefaultConfig;

  useEffect(() => {
    if (isOpen) {
      trackEmploymentFormStep(employmentType, 'opened', courseId);
    }
  }, [isOpen, employmentType, courseId]);

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
      // Preparar datos para el webhook de n8n
      const _webhookData = {
        nombre: `${formData.nombre} ${formData.apellidos}`,
        email: formData.email,
        telefono: formData.telefono,
        curso: courseName,
        sede: formData.provincia,
        empresa: formData.empresa_actual || 'No especificada',
        experiencia: formData.sector_interes || 'No especificada',
        comentarios: `Disponibilidad: ${formData.disponibilidad}. Marketing: ${formData.consentimiento_marketing ? 'Sí' : 'No'}.`
      };

      // TEMPORAL: Webhook n8n deshabilitado (devuelve 404)
      // TODO: Configurar correctamente el webhook en n8n.srv741809.hstgr.cloud
      console.log('🔄 Usando FormSubmit directamente (webhook n8n temporalmente deshabilitado)');
      
      let response;
      let result;
      const _usedFallback = true; // Usar directamente el fallback que funciona

      // Saltar intento de webhook n8n y usar directamente FormSubmit
      try {
        // Simular error para activar el fallback
        throw new Error('Webhook n8n temporalmente deshabilitado - usando FormSubmit directamente');
      } catch (webhookError) {
        console.warn('Webhook n8n falló, usando fallback FormSubmit:', webhookError);
        // Fallback ya activado arriba
        
        // Fallback a FormSubmit usando proxy local (solución CORS)
        const fallbackEmail = import.meta.env.VITE_NOTIFICATION_EMAIL || 'agency.solaria@gmail.com';
        const proxyUrl = 'http://148.230.118.124/api/formsubmit-proxy';
        
        const formSubmitData = {
          email: fallbackEmail, // Email de destino para el proxy
          _subject: `Nueva inscripción: ${courseName}`,
          _template: 'table',
          _captcha: 'false',
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email_solicitante: formData.email,
          telefono: formData.telefono,
          curso: courseName,
          tipo_curso: employmentType,
          empresa_actual: formData.empresa_actual || 'No especificada',
          provincia: formData.provincia,
          disponibilidad: formData.disponibilidad,
          consentimiento_datos: formData.consentimiento_datos ? 'Sí' : 'No',
          consentimiento_marketing: formData.consentimiento_marketing ? 'Sí' : 'No',
          fecha_envio: new Date().toLocaleString('es-ES'),
          origen: 'Formulario web - Fallback via Proxy'
        };

        response = await fetch(proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formSubmitData)
        });

        if (!response.ok) {
          throw new Error(`Proxy FormSubmit falló: ${response.status}`);
        }

        const proxyResult = await response.json();
        if (!proxyResult.success) {
          throw new Error(proxyResult.error || 'Error en proxy FormSubmit');
        }

        result = { success: true, fallback: true };
      }

      if (result.success) {
        // Tracking de conversión
        trackEmploymentLead(employmentType, courseId, 'form_submission');
        
        // Mostrar éxito
        setSubmitSuccess(true);
        
        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
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
        }, 3000);
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Tipo de error:', typeof error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack');
      
      // Mensaje de error más específico
      let errorMessage = 'Error al enviar el formulario. Inténtalo de nuevo.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.';
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setErrors({ submit: errorMessage });
      trackEmploymentFormStep(employmentType, 'submit_error', courseId);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Inscripción al Curso
              </h2>
              <p className="text-gray-600">{courseName}</p>
              <p className="text-sm text-gray-500">
                {employmentType === 'ocupados' ? 'Curso para trabajadores' : 'Curso para desempleados'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ¡Solicitud enviada correctamente!
              </h3>
              <p className="text-gray-600 mb-4">
                Te contactaremos pronto para más información sobre el curso.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  <strong>Próximos pasos:</strong> Recibirás un email de confirmación y 
                  nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Datos personales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    data-testid="nombre-input"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    data-testid="apellidos-input"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.apellidos ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    data-testid="email-input"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    data-testid="telefono-input"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                </div>
              </div>


              {/* Campos específicos por tipo de empleo */}
              {employmentType === 'ocupados' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa Actual (opcional)
                  </label>
                  <input
                    type="text"
                    name="empresa_actual"
                    value={formData.empresa_actual}
                    onChange={handleInputChange}
                    data-testid="empresa-input"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.empresa_actual ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Opcional - Nombre de tu empresa actual"
                  />
                  {errors.empresa_actual && <p className="text-red-500 text-sm mt-1">{errors.empresa_actual}</p>}
                </div>
              )}

              {employmentType === 'desempleados' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector de Interés *
                  </label>
                  <select
                    name="sector_interes"
                    value={formData.sector_interes}
                    onChange={handleInputChange}
                    data-testid="sector-interes-select"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.sector_interes ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="sanidad">Sanidad</option>
                    <option value="veterinaria">Veterinaria</option>
                    <option value="administracion">Administración</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="comercio">Comercio</option>
                    <option value="otros">Otros</option>
                  </select>
                  {errors.sector_interes && <p className="text-red-500 text-sm mt-1">{errors.sector_interes}</p>}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilidad Horaria *
                  </label>
                  <select
                    name="disponibilidad"
                    value={formData.disponibilidad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
              </div>

              {/* Consentimientos */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="consentimiento_datos"
                    checked={formData.consentimiento_datos}
                    onChange={handleInputChange}
                    data-testid="consent-checkbox"
                    className="mr-2 mt-1"
                    required
                  />
                  <label className="text-sm text-gray-600">
                    Acepto el tratamiento de mis datos personales para la gestión de mi solicitud de información *
                  </label>
                </div>
                {errors.consentimiento_datos && <p className="text-red-500 text-sm">{errors.consentimiento_datos}</p>}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="consentimiento_marketing"
                    checked={formData.consentimiento_marketing}
                    onChange={handleInputChange}
                    className="mr-2 mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    Acepto recibir comunicaciones comerciales sobre cursos y promociones
                  </label>
                </div>
              </div>

              {/* Error general */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="submit-button"
                  className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors mr-auto ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? 'Procesando...' : '¡Inscribirme Ahora!'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentFormModal;