import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  build: {
    // 🚀 OPTIMIZACIONES DE BUILD
    target: 'es2015', // Mejor compatibilidad navegadores modernos
    minify: 'terser', // Mejor minificación
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    reportCompressedSize: true, // Reportar tamaño gzipped
    chunkSizeWarningLimit: 300, // Advertir si chunks > 300KB
    
    // 📦 CONFIGURACIÓN DE CODE SPLITTING
    rollupOptions: {
      output: {
        // Manual chunks para separar vendors pesados
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Leaflet (pesado, solo para mapas)
          'leaflet-vendor': ['leaflet', 'react-leaflet'],
          
          // UI utilities
          'ui-vendor': ['lucide-react', '@emailjs/browser'],
          
          // Crypto y utilidades pesadas
          'utils-vendor': ['crypto-js'],
          
          // React Query (si se usa mucho)
          'query-vendor': ['@tanstack/react-query'],
        },
        
        // Estrategia de nombres para chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/js/${facadeModuleId}-[hash].js`;
        },
        
        // Nombres de assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (extType === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // 🎯 OPTIMIZACIONES ADICIONALES
    cssCodeSplit: true, // Dividir CSS por página
    sourcemap: false, // Desactivar sourcemaps en producción
    
    // Preload de chunks críticos
    modulePreload: {
      polyfill: true,
    },
  },
  
  // ⚡ OPTIMIZACIONES DE DESARROLLO
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // 🧪 CONFIGURACIÓN DE TESTS
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  }
});