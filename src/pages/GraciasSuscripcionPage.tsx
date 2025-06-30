import { MailCheck } from 'lucide-react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { Link } from 'react-router-dom';

const GraciasSuscripcionPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CepHeader />
      <main className="flex-grow container mx-auto px-4 py-16 sm:py-24 flex items-center justify-center">
        <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg max-w-2xl w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MailCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-cep-primary mb-4">
            ¡Suscripción Confirmada!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Gracias por unirte a nuestro boletín. Estás a un paso de recibir las últimas novedades, ofertas y contenido exclusivo de CEP Formación directamente en tu bandeja de entrada.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg text-left mb-8">
            <h2 className="font-semibold text-gray-800">Próximos pasos:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
              <li>Revisa tu correo para confirmar que nos recibes correctamente.</li>
              <li>Añade <span className="font-semibold">agency.solaria@gmail.com</span> a tus contactos para evitar el spam.</li>
              <li>¡Prepárate para potenciar tu futuro profesional!</li>
            </ul>
          </div>
          <Link
            to="/"
            className="inline-block bg-cep-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-cep-secondary transition-colors duration-300"
          >
            Volver a la página principal
          </Link>
        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default GraciasSuscripcionPage; 