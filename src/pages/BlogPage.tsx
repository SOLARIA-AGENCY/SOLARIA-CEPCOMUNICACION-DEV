import React from 'react';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

const BlogPage: React.FC = () => {
  return (
    <div>
      <CepHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center">Blog</h1>
        <p className="text-lg text-gray-600 text-center mt-4">
          Próximamente, aquí encontrarás artículos y noticias de interés.
        </p>
      </div>
      <CepFooter />
    </div>
  );
};

export default BlogPage; 