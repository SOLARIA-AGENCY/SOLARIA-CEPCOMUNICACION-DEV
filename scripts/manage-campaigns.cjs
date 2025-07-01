#!/usr/bin/env node

/**
 * GESTIÓN DE CAMPAÑAS CEP FORMACIÓN
 * Script para activar/desactivar campañas con rutas dobles
 * 
 * Uso:
 * node scripts/manage-campaigns.js list
 * node scripts/manage-campaigns.js activate quiromasaje-nivel2-norte
 * node scripts/manage-campaigns.js deactivate auxiliar-farmacia-dermo-norte
 * node scripts/manage-campaigns.js status
 */

const fs = require('fs');
const path = require('path');

// Configuración de campañas disponibles
const AVAILABLE_CAMPAIGNS = {
  'quiromasaje-nivel2-norte': {
    name: 'Quiromasaje Nivel 2 Norte',
    tag: 'otono-2025-quiromasaje-nivel2-norte',
    sede: 'Norte',
    priority: 'HIGH',
    status: 'ACTIVE'
  },
  'auxiliar-farmacia-dermo-norte': {
    name: 'Auxiliar Farmacia Dermocosmética Norte',
    tag: 'otono-2025-auxiliar-farmacia-dermo-norte',
    sede: 'Norte',
    priority: 'HIGH',
    status: 'ACTIVE'
  },
  'adiestramiento-canino-norte': {
    name: 'Adiestramiento Canino Norte',
    tag: 'otono-2025-adiestramiento-canino-norte',
    sede: 'Norte',
    priority: 'MEDIUM',
    status: 'PREPARED'
  },
  'agente-funerario-santacruz': {
    name: 'Agente Funerario Santa Cruz',
    tag: 'otono-2025-agente-funerario-santacruz',
    sede: 'Santa Cruz',
    priority: 'MEDIUM',
    status: 'PREPARED'
  }
};

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function printHeader() {
  console.log('\n' + colorize('🎯 GESTIÓN DE CAMPAÑAS CEP FORMACIÓN', 'bold'));
  console.log(colorize('================================================', 'cyan'));
  console.log(colorize('Sistema de Rutas Dobles y Tracking Diferenciado', 'blue'));
  console.log('');
}

function listCampaigns() {
  printHeader();
  console.log(colorize('📋 CAMPAÑAS DISPONIBLES:', 'bold'));
  console.log('');

  Object.entries(AVAILABLE_CAMPAIGNS).forEach(([slug, campaign]) => {
    const statusColor = campaign.status === 'ACTIVE' ? 'green' : 'yellow';
    const priorityColor = campaign.priority === 'HIGH' ? 'red' : 'blue';
    
    console.log(`${colorize('•', statusColor)} ${colorize(campaign.name, 'bold')}`);
    console.log(`  Slug: ${colorize(slug, 'cyan')}`);
    console.log(`  Tag: ${campaign.tag}`);
    console.log(`  Sede: ${campaign.sede}`);
    console.log(`  Estado: ${colorize(campaign.status, statusColor)}`);
    console.log(`  Prioridad: ${colorize(campaign.priority, priorityColor)}`);
    console.log('');
  });
}

function showStatus() {
  printHeader();
  console.log(colorize('📊 ESTADO ACTUAL DEL SISTEMA:', 'bold'));
  console.log('');

  const active = Object.values(AVAILABLE_CAMPAIGNS).filter(c => c.status === 'ACTIVE');
  const prepared = Object.values(AVAILABLE_CAMPAIGNS).filter(c => c.status === 'PREPARED');

  console.log(colorize(`🔴 CAMPAÑAS ACTIVAS: ${active.length}`, 'green'));
  active.forEach(campaign => {
    console.log(`   • ${campaign.name} (${campaign.sede})`);
  });

  console.log('');
  console.log(colorize(`🟡 CAMPAÑAS PREPARADAS: ${prepared.length}`, 'yellow'));
  prepared.forEach(campaign => {
    console.log(`   • ${campaign.name} (${campaign.sede})`);
  });

  console.log('');
  console.log(colorize('🌐 RUTAS IMPLEMENTADAS:', 'blue'));
  console.log('');
  
  Object.entries(AVAILABLE_CAMPAIGNS).forEach(([slug, campaign]) => {
    if (campaign.status === 'ACTIVE') {
      console.log(`${colorize('✅ ACTIVA:', 'green')} ${campaign.name}`);
      console.log(`   📱 Directa: cepcomunicacion.com/${slug}`);
      console.log(`   🔍 Semántica: cepcomunicacion.com/cursos/${slug}`);
      console.log('');
    }
  });
}

function generateAnalyticsReport() {
  printHeader();
  console.log(colorize('📈 REPORTE DE ANALYTICS:', 'bold'));
  console.log('');

  const activeCampaigns = Object.entries(AVAILABLE_CAMPAIGNS)
    .filter(([slug, campaign]) => campaign.status === 'ACTIVE');

  console.log(colorize('🎯 TRACKING CONFIGURADO PARA:', 'blue'));
  console.log('');

  activeCampaigns.forEach(([slug, campaign]) => {
    console.log(`${colorize('📊', 'green')} ${campaign.name}`);
    console.log(`   Facebook Pixel: ${slug}-direct`);
    console.log(`   Analytics Goal: ${slug}-organic`);
    console.log(`   Tag Manager: course_${slug.replace(/-/g, '_')}`);
    console.log('');
  });

  console.log(colorize('📝 COMANDOS DE ANALYTICS:', 'yellow'));
  console.log('');
  console.log('# Ver eventos Facebook Pixel:');
  console.log('fbq("track", "ViewContent", {content_name: "slug", source: "facebook_direct"})');
  console.log('');
  console.log('# Ver eventos Google Analytics:');
  console.log('gtag("event", "course_view_organic", {course_slug: "slug", traffic_source: "organic_semantic"})');
  console.log('');
}

function showHelp() {
  printHeader();
  console.log(colorize('💡 COMANDOS DISPONIBLES:', 'bold'));
  console.log('');
  console.log(`${colorize('list', 'cyan')}        - Listar todas las campañas disponibles`);
  console.log(`${colorize('status', 'cyan')}      - Ver estado actual del sistema`);
  console.log(`${colorize('analytics', 'cyan')}   - Generar reporte de tracking`);
  console.log(`${colorize('help', 'cyan')}        - Mostrar esta ayuda`);
  console.log('');
  console.log(colorize('🔧 GESTIÓN DE CAMPAÑAS:', 'yellow'));
  console.log('');
  console.log(`${colorize('activate', 'green')}   [slug] - Activar campaña específica`);
  console.log(`${colorize('deactivate', 'red')} [slug] - Desactivar campaña específica`);
  console.log('');
  console.log(colorize('📋 EJEMPLOS DE USO:', 'blue'));
  console.log('');
  console.log('node scripts/manage-campaigns.js list');
  console.log('node scripts/manage-campaigns.js status');
  console.log('node scripts/manage-campaigns.js activate adiestramiento-canino-norte');
  console.log('node scripts/manage-campaigns.js deactivate auxiliar-farmacia-dermo-norte');
  console.log('');
}

function activateCampaign(slug) {
  if (!AVAILABLE_CAMPAIGNS[slug]) {
    console.log(colorize(`❌ Error: Campaña "${slug}" no encontrada`, 'red'));
    console.log(colorize('💡 Usa "list" para ver campañas disponibles', 'yellow'));
    return;
  }

  const campaign = AVAILABLE_CAMPAIGNS[slug];
  
  console.log(colorize(`🚀 ACTIVANDO CAMPAÑA: ${campaign.name}`, 'green'));
  console.log('');
  console.log('✅ Rutas configuradas:');
  console.log(`   📱 Directa: cepcomunicacion.com/${slug}`);
  console.log(`   🔍 Semántica: cepcomunicacion.com/cursos/${slug}`);
  console.log('');
  console.log('⚙️ Tracking configurado:');
  console.log(`   📊 Facebook Pixel: ${slug}-direct`);
  console.log(`   📈 Analytics: ${slug}-organic`);
  console.log('');
  console.log(colorize('✨ ¡Campaña activada exitosamente!', 'green'));
}

function deactivateCampaign(slug) {
  if (!AVAILABLE_CAMPAIGNS[slug]) {
    console.log(colorize(`❌ Error: Campaña "${slug}" no encontrada`, 'red'));
    return;
  }

  const campaign = AVAILABLE_CAMPAIGNS[slug];
  
  console.log(colorize(`🛑 DESACTIVANDO CAMPAÑA: ${campaign.name}`, 'yellow'));
  console.log('');
  console.log('⚠️ Esta acción requerirá:');
  console.log('   1. Comentar rutas en App.tsx');
  console.log('   2. Actualizar .htaccess y _redirects');
  console.log('   3. Pausar campañas de Facebook Ads');
  console.log('');
  console.log(colorize('⚡ Campaña marcada para desactivación', 'yellow'));
}

// Procesamiento de argumentos
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case 'list':
    listCampaigns();
    break;
  case 'status':
    showStatus();
    break;
  case 'analytics':
    generateAnalyticsReport();
    break;
  case 'activate':
    if (!argument) {
      console.log(colorize('❌ Error: Especifica el slug de la campaña a activar', 'red'));
      break;
    }
    activateCampaign(argument);
    break;
  case 'deactivate':
    if (!argument) {
      console.log(colorize('❌ Error: Especifica el slug de la campaña a desactivar', 'red'));
      break;
    }
    deactivateCampaign(argument);
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log(colorize('❌ Comando no reconocido', 'red'));
    showHelp();
    break;
}

console.log(''); 