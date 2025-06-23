/**
 * SOLARIA-VITE-TEMPLATE - Feature Flags Configuration
 * Control dinámico de funcionalidades del template
 */

export const FEATURES = {
  // Dashboard técnico integrado
  DASHBOARD_ENABLED: true,
  
  // Métricas de performance en tiempo real
  PERFORMANCE_METRICS: true,
  
  // API de monitoreo serverless
  API_MONITORING: true,
  
  // Testing automático
  AUTOMATED_TESTING: true,
  
  // PWA capabilities
  PWA_ENABLED: false,
  
  // Analytics integration
  ANALYTICS_ENABLED: false,
  
  // Multi-language support
  I18N_ENABLED: false,
  
  // Husky pre-commit hooks
  HUSKY_ENABLED: true,
  
  // CI/CD pipeline
  CICD_ENABLED: true
}

export const BRAND_CONFIG = {
  name: 'SOLARIA',
  fullName: 'SOLARIA VITE TEMPLATE',
  agency: 'SOLARIA.AGENCY',
  colors: {
    primary: '#f6921d', // Color oficial SOLARIA
    secondary: '#e67e22',
    accent: '#d35400',
    dark: '#a0522d',
    light: '#fdb462'
  },
  urls: {
    website: 'https://solaria.agency',
    github: 'https://github.com/solaria-agency',
    support: 'mailto:hello@solaria.agency'
  },
  logo: {
    main: '/images/solaria-logo.png',
    alt: 'SOLARIA Agency Logo',
    width: 40,
    height: 40
  }
}

export type FeatureFlag = keyof typeof FEATURES;

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return FEATURES[feature];
};

/**
 * Get all enabled features
 */
export const getEnabledFeatures = (): FeatureFlag[] => {
  return Object.entries(FEATURES)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature as FeatureFlag);
};

/**
 * Development utilities
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

export const isProduction = (): boolean => {
  return import.meta.env.PROD;
}; 