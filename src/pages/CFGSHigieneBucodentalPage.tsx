import React from 'react';
import { cursoData } from '../config/cursos-otono-2025';
import CursoPageComponent from '../components/templates/CursoPageComponent';

const CFGSHigieneBucodentalPage: React.FC = () => {
  // El índice 16 corresponde al CFGS de Higiene Bucodental en el array de cursos
  const cursoEspecifico = cursoData.find(c => c.slug === 'cfgs-higiene-bucodental-santacruz');

  if (!cursoEspecifico) {
    // Manejo de error en caso de que el curso no se encuentre
    return <div>Curso no encontrado.</div>;
  }

  return <CursoPageComponent curso={cursoEspecifico} />;
};

export default CFGSHigieneBucodentalPage; 