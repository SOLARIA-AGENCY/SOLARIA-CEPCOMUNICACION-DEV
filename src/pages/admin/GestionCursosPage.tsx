import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { cursosMaestro, CursoMaestro } from '../../config/cursos-maestro';
import CursoDetailModal from '../../components/modals/CursoDetailModal';
import CursosTable from '../../components/tables/CursosTable';

const GestionCursosPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCurso, setSelectedCurso] = useState<CursoMaestro | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCursoClick = (curso: CursoMaestro) => {
    setSelectedCurso(curso);
  };

  const handleCloseModal = () => {
    setSelectedCurso(null);
  };

  const cursosPorSede: { 
    [key: string]: { activos: CursoMaestro[], proximamente: CursoMaestro[] } 
  } = {
    'Norte': { activos: [], proximamente: [] },
    'Santa Cruz': { activos: [], proximamente: [] },
  };

  cursosMaestro.forEach(curso => {
    if (curso.estado === 'activo') {
      cursosPorSede[curso.sede].activos.push(curso);
    } else {
      cursosPorSede[curso.sede].proximamente.push(curso);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cep-primary">Panel de Gestión de Cursos</h1>
        <button 
          onClick={handleLogout} 
          className="bg-cep-danger hover:bg-cep-danger-dark text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Cerrar Sesión
        </button>
      </header>

      <main className="p-8">
        {Object.entries(cursosPorSede).map(([sede, data]) => (
          <div key={sede} className="mb-12">
            <h2 className="text-3xl font-bold text-cep-primary-dark mb-8">Sede {sede}</h2>
            
            <div className="mb-10 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Cursos Activos</h3>
              <CursosTable cursos={data.activos} onCursoClick={handleCursoClick} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Próximos Cursos</h3>
              <CursosTable cursos={data.proximamente} onCursoClick={handleCursoClick} />
            </div>

          </div>
        ))}
      </main>

      {selectedCurso && (
        <CursoDetailModal curso={selectedCurso} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default GestionCursosPage;
