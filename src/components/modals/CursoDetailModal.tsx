import React from 'react';
import { CursoMaestro } from '../../config/cursos-maestro';

interface CursoDetailModalProps {
  curso: CursoMaestro | null;
  onClose: () => void;
}

const CursoDetailModal: React.FC<CursoDetailModalProps> = ({ curso, onClose }) => {
  if (!curso) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center font-poppins">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-cep-primary">{curso.nombre}</h2>
            <p className="text-lg text-cep-primary-dark font-semibold">{curso.codigo}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} className="w-full rounded-lg shadow-md mb-6" />
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-700">Información Principal</h4>
                <p><span className="font-semibold">Sede:</span> {curso.sede}</p>
                <p><span className="font-semibold">Inicio:</span> {curso.inicio || 'Próximamente'}</p>
                <p><span className="font-semibold">Categoría:</span> {curso.categoria}</p>
                <p><span className="font-semibold">Modalidad:</span> {curso.modalidad || 'No especificada'}</p>
                <p><span className="font-semibold">Precio:</span> {curso.descripcionDetallada?.inversion?.total || 'No disponible'}</p>
              </div>
              
              {curso.descripcionDetallada?.profesores && curso.descripcionDetallada.profesores.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-700">Profesorado</h4>
                  <ul className="list-disc list-inside">
                    {curso.descripcionDetallada.profesores.map(p => <li key={p.nombre}>{p.nombre} ({p.especialidad})</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            {curso.descripcionDetallada ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-700">¿Qué aprenderás?</h4>
                  <p className="text-gray-600 text-sm">{curso.descripcionDetallada.queAprendes}</p>
                </div>
                
                {curso.descripcionDetallada.puntosClave && (
                  <div>
                    <h4 className="font-bold text-gray-700">Puntos Clave</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {curso.descripcionDetallada.puntosClave.map((pc, i) => <li key={i}>{pc.texto}</li>)}
                    </ul>
                  </div>
                )}

                {curso.descripcionDetallada.modulos && (
                  <div>
                    <h4 className="font-bold text-gray-700">Módulos del Curso</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {curso.descripcionDetallada.modulos.map(m => <li key={m.titulo}>{m.titulo}</li>)}
                    </ul>
                  </div>
                )}

              </div>
            ) : (
              <p className="text-gray-500 italic">No hay descripción detallada disponible para este curso.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoDetailModal;
