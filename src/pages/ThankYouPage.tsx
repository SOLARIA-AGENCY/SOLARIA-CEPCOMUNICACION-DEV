import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { CheckCircle } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <CepHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="w-full max-w-2xl p-8 md:p-12 space-y-6 bg-white rounded-2xl shadow-xl text-center">
          
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">¡Gracias por tu interés!</h1>
          
          <p className="text-lg text-gray-600">
            Hemos recibido tu solicitud correctamente. Un asesor de CEP Formación se pondrá en contacto contigo a la brevedad posible para darte todos los detalles.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h2 className="text-lg font-semibold text-blue-800">¿Qué sigue ahora?</h2>
            <ul className="text-left text-gray-700 mt-2 space-y-1">
              <li><strong>1. Confirmación:</strong> Recibirás una copia de tu solicitud en tu correo.</li>
              <li><strong>2. Llamada del Asesor:</strong> Te contactaremos en las próximas 24-48 horas hábiles.</li>
              <li><strong>3. Resolución de Dudas:</strong> Podrás preguntar todo lo que necesites sobre el curso, matrícula y facilidades de pago.</li>
            </ul>
          </div>

          <Link
            to="/cursos"
            className="inline-block mt-8 px-8 py-3 font-semibold text-white bg-cep-primary rounded-lg hover:bg-cep-primary-dark transition-colors"
          >
            Ver más cursos
          </Link>

        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default ThankYouPage; 