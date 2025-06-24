import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  curso: {
    nombre: string;
    sede: string;
    tag: string;
  };
}

const CursoInscripcionModal: React.FC<Props> = ({ isOpen, onClose, curso }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      sede: curso.sede,
      curso: curso.nombre,
      tag: curso.tag,
      procedencia: 'landing_web',
      timestamp: new Date().toISOString(),
    };

    // Lógica de envío (p. ej. a un webhook de n8n)
    console.log('Enviando datos:', submissionData);
    // Aquí iría la llamada a fetch/axios para el webhook
    // await fetch('URL_DEL_WEBHOOK', { ... });

    setTimeout(() => { // Simulación de envío
      setIsSubmitting(false);
      alert('¡Gracias! Hemos recibido tu solicitud. Te contactaremos en breve.');
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscríbete en</h2>
          <p className="text-cep-primary text-xl font-semibold mb-6">{curso.nombre} - Sede {curso.sede}</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cep-primary focus:border-cep-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cep-primary focus:border-cep-primary"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  id="telefono"
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cep-primary focus:border-cep-primary"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className="mt-6">
              <p className="text-xs text-gray-500">
                Al enviar, aceptas nuestra <a href="/politica-privacidad" target="_blank" className="underline">política de privacidad</a>. Usaremos tus datos para informarte sobre este curso.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cep-primary hover:bg-cep-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cep-primary disabled:bg-gray-400"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Información'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CursoInscripcionModal; 