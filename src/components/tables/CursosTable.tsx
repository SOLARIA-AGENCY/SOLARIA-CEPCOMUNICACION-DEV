import React from 'react';
import { CursoMaestro } from '../../config/cursos-maestro';

interface CursosTableProps {
  cursos: CursoMaestro[];
  onCursoClick: (curso: CursoMaestro) => void;
}

const CursosTable: React.FC<CursosTableProps> = ({ cursos, onCursoClick }) => {
  if (cursos.length === 0) {
    return <p className="text-gray-500 italic">No hay cursos en esta categoría.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesorado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cursos.map(curso => (
            <tr key={curso.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => onCursoClick(curso)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full object-cover" src={curso.imagen} alt="" />
                  </div>
                  <div className="ml-4 max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{curso.nombre}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{curso.codigo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${curso.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {curso.inicio || 'Próximamente'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {curso.descripcionDetallada?.inversion?.total || 'No disponible'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {curso.descripcionDetallada?.profesores?.map(p => p.nombre).join(', ') || 'No asignado'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CursosTable;
