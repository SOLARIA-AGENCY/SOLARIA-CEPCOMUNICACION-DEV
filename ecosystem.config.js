// ================================================================
// CONFIGURACIÓN PM2 PARA CEPCOMUNICACION.COM API
// Gestión de procesos optimizada para VPS Hostinger
// ================================================================

module.exports = {
  apps: [{
    name: 'cep-api',
    script: './server-production.js',
    
    // Configuración de instancias
    instances: 1, // Una instancia para VPS básico
    exec_mode: 'fork', // Fork mode para una instancia
    
    // Variables de entorno específicas
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    
    // Configuración de reinicio automático
    watch: false, // No watch en producción
    max_memory_restart: '512M', // Reiniciar si excede 512MB
    
    // Configuración de logs
    log_file: '/var/log/pm2/cep-api-combined.log',
    out_file: '/var/log/pm2/cep-api-out.log',
    error_file: '/var/log/pm2/cep-api-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Configuración de reinicio
    restart_delay: 4000, // Esperar 4s antes de reiniciar
    max_restarts: 10, // Máximo 10 reinicios
    min_uptime: '10s', // Mínimo 10s de uptime antes de considerar stable
    
    // Configuración de autorestart
    autorestart: true,
    
    // Configuración de cron restart (reinicio diario a las 3 AM)
    cron_restart: '0 3 * * *',
    
    // Variables adicionales
    node_args: '--max-old-space-size=512', // Limitar memoria Node.js
    
    // Script hooks
    post_update: ['npm install', 'echo "Aplicación actualizada"'],
    
    // Configuración específica para producción
    kill_timeout: 3000, // 3s para kill graceful
    listen_timeout: 3000, // 3s timeout para listen
    
    // Configuración de monitoring
    pmx: true,
    
    // Configuración adicional de PM2
    time: true // Mostrar timestamps en logs
  }],

  // Configuración de deployment (opcional)
  deploy: {
    production: {
      user: 'cepapp',
      host: ['api.cepcomunicacion.com'],
      key: '~/.ssh/id_rsa',
      ref: 'origin/main',
      repo: 'git@github.com:SOLARIA-AGENCY/SOLARIA-CEPCOMUNICACION.git',
      path: '/var/www/cepapi',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};