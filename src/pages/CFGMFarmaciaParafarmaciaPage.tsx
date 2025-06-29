import React from 'react';
import { cursoData } from '../config/cursos-otono-2025';
import CursoPageComponent from '../components/templates/CursoPageComponent';

const CFGMFarmaciaParafarmaciaPage: React.FC = () => {
  const cursoEspecifico = cursoData.find(c => c.slug === 'cfgm-farmacia-parafarmacia-santacruz');

  if (!cursoEspecifico) {
    return <div>Curso no encontrado.</div>;
  }

  return <CursoPageComponent curso={cursoEspecifico} />;
};

export default CFGMFarmaciaParafarmaciaPage; 