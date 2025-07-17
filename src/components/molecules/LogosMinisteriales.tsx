import React from 'react';

interface LogosMinisterialesProps {
  className?: string;
}

const LogosMinisteriales: React.FC<LogosMinisterialesProps> = ({ className = "" }) => {
  return (
    <section className={`logos-ministeriales bg-gray-50 py-8 mt-8 border-t border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Este curso está financiado por el Servicio Público de Empleo Estatal (SEPE) 
            y cofinanciado por el Fondo Social Europeo (FSE), dentro del marco del 
            Programa Operativo de Empleo, Formación y Educación 2021-2027.
          </p>
          
          <div className="logos-container flex justify-center items-center gap-8 flex-wrap">
            <div className="logo-item">
              <img 
                src="/images/certificaciones/sepe.png" 
                alt="SEPE - Servicio Público de Empleo Estatal" 
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
            <div className="logo-item">
              <img 
                src="/images/certificaciones/ministerio-educacion.png" 
                alt="Ministerio de Trabajo y Economía Social" 
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
            <div className="logo-item">
              <img 
                src="/images/certificaciones/fse.png" 
                alt="Fondo Social Europeo - Unión Europea" 
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>Programa cofinanciado por el FSE+ en un 80%</p>
            <p>Una manera de hacer Europa</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosMinisteriales;