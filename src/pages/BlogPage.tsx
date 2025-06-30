import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';
import { Rss } from 'lucide-react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CepHeader />
      <main className="flex-grow flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <Rss className="mx-auto text-cep-primary h-16 w-16 mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight sm:text-5xl">Nuestro Blog</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos preparando contenido de valor para ti. Muy pronto encontrarás aquí artículos, noticias y consejos sobre el sector de la formación profesional y el empleo.
          </p>
          <div className="mt-8">
            <a 
              href="/inicio" 
              className="inline-block bg-cep-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-cep-primary-dark transition-colors"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </main>
      <CepFooter />
    </div>
  );
};

export default BlogPage; 