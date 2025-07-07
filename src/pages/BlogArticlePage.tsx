import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

interface BlogMetadata {
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  category: string;
  keywords: string[];
  image?: string;
}

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // Cargar el archivo markdown
        const response = await fetch(`/src/pages/blog/${slug}.md`);
        
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const text = await response.text();
        
        // Extraer metadatos del front matter
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = text.match(frontMatterRegex);
        
        if (match) {
          const [, frontMatter, articleContent] = match;
          
          // Parsear el front matter básico
          const lines = frontMatter.split('\n');
          const meta: any = {};
          
          lines.forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length > 0) {
              const value = values.join(':').trim();
              if (key.trim() === 'keywords') {
                meta[key.trim()] = value.replace(/[[\\]"]/g, '').split(',').map(k => k.trim());
              } else {
                meta[key.trim()] = value.replace(/['"]/g, '');
              }
            }
          });
          
          setMetadata(meta as BlogMetadata);
          setContent(articleContent.trim());
        } else {
          setContent(text);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading article:', error);
        setNotFound(true);
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Función para convertir markdown básico a HTML
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-semibold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
      .replace(/^\*\*(.+)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/^\* (.+)/gim, '<li class="mb-2">$1</li>')
      .replace(/^(\d+)\. (.+)/gim, '<li class="mb-2">$2</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4 leading-relaxed">')
      .replace(/^(.+)$/gim, '<p class="text-gray-700 mb-4 leading-relaxed">$1</p>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cep-primary hover:text-cep-primary-dark underline" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <CepFooter />
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{metadata?.title ? `${metadata.title} | CEP Formación` : 'Artículo | CEP Formación'}</title>
        <meta name="description" content={metadata?.description || 'Artículo formativo de CEP Formación'} />
        <meta name="keywords" content={metadata?.keywords?.join(', ') || ''} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata?.title || 'CEP Formación'} />
        <meta property="og:description" content={metadata?.description || 'Artículo formativo'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cepcomunicacion.com/blog/${slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata?.title || 'CEP Formación'} />
        <meta name="twitter:description" content={metadata?.description || 'Artículo formativo'} />
        
        {/* Article specific */}
        {metadata?.publishDate && (
          <meta property="article:published_time" content={metadata.publishDate} />
        )}
        {metadata?.category && (
          <meta property="article:section" content={metadata.category} />
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        
        <main>
          {/* Hero del Artículo */}
          <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <nav className="mb-8">
                <a href="/blog" className="text-blue-600 hover:text-blue-700 transition-colors">
                  ← Volver al Blog
                </a>
              </nav>

              {/* Metadatos */}
              {metadata && (
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {metadata.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {metadata.readTime} min lectura
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(metadata.publishDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {metadata.title}
                  </h1>

                  <p className="text-xl text-gray-600 mb-6">
                    {metadata.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {metadata.keywords?.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Imagen destacada si existe */}
              {metadata?.image && (
                <div className="mb-8">
                  <img 
                    src={metadata.image} 
                    alt={metadata.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Contenido del Artículo */}
          <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
              />
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-blue-600 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Te Interesa Esta Área de Formación?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Explora nuestros cursos relacionados y da el primer paso hacia tu nueva carrera profesional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/cursos"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Ver Cursos Disponibles
                </a>
                <a 
                  href="/contacto"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
                >
                  Solicitar Información
                </a>
              </div>
            </div>
          </div>
        </main>

        <CepFooter />
      </div>
    </>
  );
};

export default BlogArticlePage; 