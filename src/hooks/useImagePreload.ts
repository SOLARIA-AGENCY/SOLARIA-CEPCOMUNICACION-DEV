import React from 'react';
import imageMap from '../../public/images-optimized/image-map.json';

// Helper hook for preloading critical images
export const useImagePreload = (imagePaths: string[]) => {
  React.useEffect(() => {
    imagePaths.forEach(path => {
      const normalizedPath = path
        .replace('/images/', '')
        .replace(/\.(jpg|jpeg|png)$/i, '');
      
      const imageData = imageMap[normalizedPath as keyof typeof imageMap];
      if (imageData) {
        // Preload largest WebP version
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.type = 'image/webp';
        const largestSource = imageData.sources
          .sort((a, b) => b.width - a.width)[0];
        link.href = `/images-optimized/${largestSource.srcset}`;
        document.head.appendChild(link);
      }
    });
  }, [imagePaths]);
};