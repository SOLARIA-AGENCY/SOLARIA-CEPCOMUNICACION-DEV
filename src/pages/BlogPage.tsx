import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CepHeader from '../components/organisms/CepHeader';
import CepFooter from '../components/organisms/CepFooter';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishDate: string;
  slug: string;
  keywords: string[];
  urgency?: boolean;
  featured?: boolean;
  courseRelated?: string[];
}

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles: BlogArticle[] = [
    // ARTÍCULOS DE URGENCIA
    {
      id: 'julio-2025',
      title: '⏰ Últimas Plazas Disponibles: Cursos de Julio 2025 en CEP Tenerife',
      excerpt: '¿Pensando en formarte este verano? Estos cursos empiezan en menos de 2 semanas. Auxiliar de Farmacia, Quiromasaje Nivel II y ATV Combo con plazas limitadas.',
      category: 'Urgente',
      readTime: 8,
      publishDate: '2025-06-20',
      slug: 'ultimas-plazas-cursos-julio-2025-cep-tenerife',
      keywords: ['cursos julio 2025 tenerife', 'auxiliar farmacia tenerife', 'quiromasaje tenerife', 'auxiliar veterinario tenerife', 'formación urgente canarias'],
      urgency: true,
      featured: true,
      courseRelated: ['auxiliar-farmacia', 'quiromasaje', 'auxiliar-veterinario']
    },
    {
      id: 'microblading-2025',
      title: '💰 Microblading en Tenerife: Invierte 800€, Gana hasta 2.000€/mes',
      excerpt: 'Una sesión de microblading en Tenerife cuesta entre 250-400€. Con 10 clientas al mes ya generas más que un salario promedio. Descubre esta oportunidad única.',
      category: 'Estética',
      readTime: 12,
      publishDate: '2025-06-18',
      slug: 'microblading-tenerife-invierte-800-gana-2000-mes',
      keywords: ['microblading tenerife', 'curso microblading canarias', 'cejas microblading santa cruz', 'micropigmentación tenerife'],
      urgency: true,
      featured: true,
      courseRelated: ['microblading', 'estetica']
    },

    // ARTÍCULOS ESTRATÉGICOS NUEVOS
    {
      id: 'peluqueria-canina-auge',
      title: '🐕 ¿Por Qué la Peluquería Canina Está en Auge en Tenerife?',
      excerpt: 'Con más de 85.000 perros registrados en Tenerife y solo 12 peluquerías caninas profesionales, existe una oportunidad de negocio extraordinaria esperándote.',
      category: 'Mundo Animal',
      readTime: 15,
      publishDate: '2025-06-17',
      slug: 'peluqueria-canina-tenerife-profesion-auge',
      keywords: ['peluquería canina tenerife', 'curso peluquería perros canarias', 'peluquero canino puerto cruz', 'formación mascotas tenerife'],
      featured: true,
      courseRelated: ['peluqueria-canina', 'mundo-animal']
    },
    {
      id: 'instructor-yoga-canarias',
      title: '🧘‍♀️ Instructor de Yoga: La Profesión que Buscan en las Islas Canarias',
      excerpt: 'Un instructor de yoga en Tenerife puede ganar entre 40-80€ por clase. Con 300+ días de sol al año, Canarias es el paraíso perfecto para esta profesión en auge.',
      category: 'Bienestar',
      readTime: 18,
      publishDate: '2025-06-16',
      slug: 'instructor-yoga-canarias-profesion-auge',
      keywords: ['instructor yoga tenerife', 'curso yoga canarias', 'formación profesor yoga', 'certificación yoga tenerife'],
      featured: true,
      courseRelated: ['instructor-yoga', 'bienestar']
    },
    {
      id: 'adiestramiento-canino-futuro',
      title: '🐕‍🦺 Adiestramiento Canino: Profesión del Futuro con Certificación ANACP',
      excerpt: 'En Tenerife hay más de 85.000 perros y solo 8 adiestradores certificados. Es la profesión con mayor demanda insatisfecha del sector animal. ¿Te sumas?',
      category: 'Mundo Animal',
      readTime: 20,
      publishDate: '2025-06-15',
      slug: 'adiestramiento-canino-tenerife-profesion-futuro',
      keywords: ['adiestramiento canino tenerife', 'curso adiestrador perros', 'ANACP tenerife', 'educador canino canarias'],
      featured: true,
      courseRelated: ['adiestramiento-canino', 'mundo-animal']
    },

    // ARTÍCULOS EXISTENTES
    {
      id: 'salidas-auxiliar-veterinario',
      title: '7 Salidas Profesionales de Auxiliar Veterinario en Tenerife Que No Conocías',
      excerpt: 'Descubre las oportunidades laborales más rentables para auxiliares veterinarios en Tenerife. Desde clínicas especializadas hasta empresas de alimentación animal.',
      category: 'Mundo Animal',
      readTime: 12,
      publishDate: '2025-01-15',
      slug: '7-salidas-profesionales-auxiliar-veterinario-tenerife',
      keywords: ['salidas profesionales auxiliar veterinario', 'auxiliar veterinaria tenerife', 'trabajo veterinario canarias'],
      courseRelated: ['auxiliar-veterinario']
    },
    {
      id: 'farmacia-vs-parafarmacia',
      title: 'Diferencias Entre Farmacia y Parafarmacia: ¿Qué Estudiar en 2025?',
      excerpt: 'Análisis completo de las diferencias entre trabajar en farmacia vs parafarmacia. Salarios, funciones y las mejores opciones formativas en Tenerife.',
      category: 'Sanidad',
      readTime: 10,
      publishDate: '2025-01-12',
      slug: 'diferencias-farmacia-parafarmacia-que-estudiar-2025',
      keywords: ['diferencias farmacia parafarmacia', 'auxiliar farmacia tenerife', 'curso farmacia canarias'],
      courseRelated: ['auxiliar-farmacia']
    },
    {
      id: 'estudiantes-extranjeros-venezuela',
      title: 'Guía Completa: Estudiantes Extranjeros Estudiar en Tenerife (Venezuela)',
      excerpt: 'Todo lo que necesitas saber para estudiar en Tenerife siendo venezolano. Requisitos, homologaciones, mejores cursos y facilidades económicas disponibles.',
      category: 'Guías',
      readTime: 15,
      publishDate: '2025-01-10',
      slug: 'guia-estudiantes-extranjeros-estudiar-tenerife-venezuela',
      keywords: ['estudiar en tenerife venezuela', 'cursos para venezolanos tenerife', 'formación extranjeros canarias'],
      courseRelated: ['todos']
    },
    {
      id: 'quiromasaje-tenerife-razones',
      title: '5 Razones para Formarte en Quiromasaje en Tenerife',
      excerpt: 'El mercado del quiromasaje en Tenerife crece un 15% anual. Descubre por qué es una de las mejores inversiones formativas que puedes hacer en 2025.',
      category: 'Bienestar',
      readTime: 8,
      publishDate: '2025-01-08',
      slug: '5-razones-formarte-quiromasaje-tenerife',
      keywords: ['curso quiromasaje tenerife', 'quiromasaje santa cruz tenerife', 'formación masajes canarias'],
      courseRelated: ['quiromasaje']
    }
  ];

  const categories = ['all', 'Urgente', 'Mundo Animal', 'Sanidad', 'Estética', 'Bienestar', 'Guías'];
  
  const urgentArticles = articles.filter(article => article.urgency);
  const featuredArticles = articles.filter(article => article.featured && !article.urgency);
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles.filter(article => !article.urgency)
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Urgente': 'bg-red-600 text-white',
      'Mundo Animal': 'bg-green-600 text-white',
      'Sanidad': 'bg-blue-600 text-white',
      'Estética': 'bg-pink-600 text-white',
      'Bienestar': 'bg-purple-600 text-white',
      'Guías': 'bg-orange-600 text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600 text-white';
  };

  return (
    <>
      <Helmet>
        <title>Blog CEP Formación | Guías, Consejos y Tendencias Formativas en Tenerife</title>
        <meta name="description" content="Descubre las mejores oportunidades formativas en Tenerife. Guías completas, análisis del mercado laboral y consejos para tu desarrollo profesional." />
        <meta name="keywords" content="blog formación tenerife, cursos profesionales canarias, salidas laborales tenerife, formación profesional canarias, CEP formación blog" />
        <link rel="canonical" href="https://cep-formacion.com/blog" />
        
        {/* Schema.org para Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog CEP Formación",
            "description": "Blog oficial de CEP Formación con guías, análisis y tendencias del mercado formativo en Tenerife",
            "url": "https://cep-formacion.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "CEP Formación",
              "url": "https://cep-formacion.com"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <CepHeader />
        
        <main className="pt-20">
          {/* Banner de Urgencia */}
          {urgentArticles.length > 0 && (
            <div className="bg-red-600 text-white py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex animate-pulse h-3 w-3 rounded-full bg-red-300"></span>
                    <span className="font-semibold text-lg">🚨 URGENT</span>
                    <span className="text-red-100">|</span>
                    <span className="font-medium">Últimas plazas disponibles para cursos de Julio 2025</span>
                    <a 
                      href={`/blog/${urgentArticles[0].slug}`}
                      className="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors ml-4"
                    >
                      Ver Disponibilidad →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                  Blog CEP Formación
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                  Guías completas, análisis del mercado laboral y las mejores oportunidades formativas en Tenerife
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-blue-800 font-semibold">📊 {articles.length} Artículos</span>
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-full">
                    <span className="text-green-800 font-semibold">🎯 Estrategias SEO</span>
                  </div>
                  <div className="bg-purple-50 px-4 py-2 rounded-full">
                    <span className="text-purple-800 font-semibold">💼 Mercado Laboral 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artículos Urgentes */}
          {urgentArticles.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🚨 Artículos Urgentes
                </h2>
                <p className="text-gray-600">Información crítica que necesitas conocer ahora</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {urgentArticles.map((article) => (
                  <article key={article.id} className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg overflow-hidden border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold animate-pulse">
                          URGENTE
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{article.readTime} min lectura</span>
                        <span>{new Date(article.publishDate).toLocaleDateString('es-ES')}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.keywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Leer Ahora →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Filtros de Categorías */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {category === 'all' ? 'Todos' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Artículos Destacados */}
          {selectedCategory === 'all' && featuredArticles.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ⭐ Artículos Destacados
                </h2>
                <p className="text-gray-600">Los artículos más relevantes para tu formación profesional</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.slice(0, 3).map((article) => (
                  <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                          DESTACADO
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{article.readTime} min</span>
                        <span>{new Date(article.publishDate).toLocaleDateString('es-ES')}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.keywords.slice(0, 2).map((keyword, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Leer más →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Todos los Artículos */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'all' ? '📚 Todos los Artículos' : `📂 ${selectedCategory}`}
              </h2>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'Explora nuestra biblioteca completa de contenido formativo'
                  : `Artículos especializados en ${selectedCategory.toLowerCase()}`
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      {article.featured && (
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                          NUEVO
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{article.readTime} min lectura</span>
                      <span>{new Date(article.publishDate).toLocaleDateString('es-ES')}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.keywords.slice(0, 2).map((keyword, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Leer más →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Listo para Dar el Siguiente Paso?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Descubre nuestros cursos profesionales y convierte tu pasión en una carrera exitosa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/cursos"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Ver Todos los Cursos
                </a>
                <a 
                  href="/contacto"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
                >
                  Contactar Asesor
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

export default BlogPage; 