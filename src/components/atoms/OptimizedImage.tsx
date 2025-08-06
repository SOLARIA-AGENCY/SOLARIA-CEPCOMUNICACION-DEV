import React from 'react';
import imageMap from '../../../public/images-optimized/image-map.json';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false
}) => {
  // Normalize the src path to match image map keys
  const normalizedSrc = src
    .replace('/images/', '')
    .replace(/\.(jpg|jpeg|png)$/i, '');
  
  const imageData = imageMap[normalizedSrc as keyof typeof imageMap];
  
  // If no optimized version exists, use original
  if (!imageData) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
      />
    );
  }
  
  // Sort sources by width for proper srcset
  const sortedSources = [...imageData.sources].sort((a, b) => a.width - b.width);
  
  // Build srcset for WebP
  const webpSrcSet = sortedSources
    .map(source => `/images-optimized/${source.srcset} ${source.width}w`)
    .join(', ');
  
  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />
      
      {/* Fallback to optimized JPEG/PNG */}
      <img
        src={`/images-optimized/${imageData.fallback}`}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
};

