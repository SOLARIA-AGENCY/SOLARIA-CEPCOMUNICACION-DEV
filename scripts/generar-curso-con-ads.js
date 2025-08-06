#!/usr/bin/env node

/**
 * Script de Generación de Cursos con Configuración de Ads
 * CEP Formación - Versión 2.0
 * 
 * Este script demuestra cómo usar las nuevas plantillas con configuración
 * integrada de publicidad para generar cursos completos con toda su
 * infraestructura de marketing digital.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar plantillas
const plantillasPath = path.join(__dirname, '..', 'plantillas-cursos-automaticas.json');
const plantillas = JSON.parse(fs.readFileSync(plantillasPath, 'utf8'));

/**
 * Configuración de ejemplo para un curso específico
 */
const ejemploCurso = {
  // Datos básicos del curso
  NOMBRE_CURSO: "Auxiliar de Farmacia + Dermocosmética",
  SEDE: "Norte",
  SEDE_COMPLETA: "Norte",
  SEDE_SLUG: "norte",
  SLUG_CURSO: "auxiliar-farmacia-dermo",
  TEMPORADA: "otono-2025",
  TEMPORADA_UPPER: "OTOÑO 2025",
  
  // Configuración de campaña
  ESTADO_CAMPANA: "activa",
  PRIORIDAD_CAMPANA: "PRIORIDAD JULIO 2025",
  DESCRIPCION_FORMULARIO: "Fórmate como Auxiliar de Farmacia especializado en Dermocosmética",
  ESPECIALIDAD_DESTACADA: "con especialización en dermocosmética",
  MES_INICIO: "septiembre",
  
  // Contenido de ads
  TEXTO_AD_1: "🏥 ¿Te apasiona el mundo de la farmacia? Conviértete en Auxiliar de Farmacia + Dermocosmética. Formación práctica con prácticas garantizadas. ¡Solicita información!",
  TEXTO_AD_2: "💊 Auxiliar de Farmacia + Dermocosmética en Tenerife Norte. Curso con alta empleabilidad y prácticas en farmacias reales. ¡Empieza tu nueva carrera profesional!",
  TEXTO_AD_3: "🌟 Especialízate en Farmacia y Dermocosmética. Curso oficial con certificación y bolsa de empleo activa. ¡Tu futuro profesional te espera!",
  
  // Hashtags y audiencia
  HASHTAG_1: "AuxiliarFarmacia",
  HASHTAG_2: "Dermocosmética",
  HASHTAG_3: "TenerifeTrabajo",
  BENEFICIO_PRINCIPAL: "Alta Empleabilidad",
  DESCRIPCION_AUDIENCIA: "Personas de 18-45 años interesadas en el sector sanitario y farmacéutico, residentes en Tenerife Norte",
  
  // IDs de integración (ejemplos)
  MAILCHIMP_LIST_ID: "abc123def456",
  GOOGLE_SHEET_ID: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  WHATSAPP_TEMPLATE_ID: "farmacia_welcome_template",
  EMAIL_TEMPLATE_ID: "farmacia_bienvenida_email",
  
  // Campos opcionales
  CAMPO_OPCIONAL_1: "Zona de Tenerife (opcional)",
  TITULO_ADICIONAL: " en nuestro curso de Auxiliar de Farmacia",
  INFORMACION_ADICIONAL: " con especialización en dermocosmética",
  MENSAJE_ADICIONAL: ". ¡Las plazas son limitadas!"
};

/**
 * Función para reemplazar variables en una plantilla
 */
function reemplazarVariables(texto, variables) {
  if (typeof texto !== 'string') {
    if (Array.isArray(texto)) {
      return texto.map(item => reemplazarVariables(item, variables));
    }
    if (typeof texto === 'object' && texto !== null) {
      const resultado = {};
      for (const [clave, valor] of Object.entries(texto)) {
        resultado[clave] = reemplazarVariables(valor, variables);
      }
      return resultado;
    }
    return texto;
  }
  
  let resultado = texto;
  for (const [variable, valor] of Object.entries(variables)) {
    const regex = new RegExp(`{{${variable}}}`, 'g');
    resultado = resultado.replace(regex, valor);
  }
  return resultado;
}

/**
 * Función principal para generar curso con ads
 */
function generarCursoConAds(tipoCurso = 'plantilla_desempleados', datosPersonalizados = {}) {
  console.log('🚀 Generando curso con configuración de ads integrada...');
  
  // Combinar datos del ejemplo con personalizaciones
  const datosCompletos = { ...ejemploCurso, ...datosPersonalizados };
  
  // Obtener plantilla base
  const plantillaContainer = plantillas[tipoCurso];
  if (!plantillaContainer) {
    console.log('Tipos disponibles:', Object.keys(plantillas).filter(key => !key.startsWith('_')));
    throw new Error(`Tipo de curso '${tipoCurso}' no encontrado`);
  }
  
  // Acceder al template dentro del container
  const plantillaBase = plantillaContainer.template || plantillaContainer;
  
  // Procesar plantilla con datos
  const cursoGenerado = reemplazarVariables(plantillaBase, datosCompletos);
  
  console.log('✅ Curso generado exitosamente');
  console.log('📊 Configuración de ads incluida:');
  
  // Verificar si existe configuracion_ads
  if (cursoGenerado.configuracion_ads) {
    console.log(`   - Tag de seguimiento: ${cursoGenerado.configuracion_ads.campana?.tag_seguimiento || 'No configurado'}`);
    console.log(`   - Formulario Meta: ${cursoGenerado.configuracion_ads.campana?.nombre_formulario || 'No configurado'}`);
    console.log(`   - Lista Mailchimp: ${cursoGenerado.configuracion_ads.campana?.lista_mailchimp || 'No configurado'}`);
    console.log(`   - URL directa: ${cursoGenerado.configuracion_ads.urls_estrategicas?.ruta_directa || 'No configurado'}`);
    console.log(`   - URL semántica: ${cursoGenerado.configuracion_ads.urls_estrategicas?.ruta_semantica || 'No configurado'}`);
  } else {
    console.log('   ⚠️  Configuración de ads no encontrada en la plantilla');
    console.log('   📋 Estructura disponible:', Object.keys(cursoGenerado));
  }
  
  return cursoGenerado;
}

/**
 * Función para exportar configuración de ads a diferentes formatos
 */
function exportarConfiguracionAds(curso, formato = 'json') {
  const configAds = curso.configuracion_ads;
  
  switch (formato) {
    case 'json':
      return JSON.stringify(configAds, null, 2);
    
    case 'csv-formularios':
      const csvHeaders = 'Nombre Formulario,Tag Seguimiento,Lista Mailchimp,URL Directa,URL Semantica\n';
      const csvData = `"${configAds.campana.nombre_formulario}","${configAds.campana.tag_seguimiento}","${configAds.campana.lista_mailchimp}","${configAds.urls_estrategicas.ruta_directa}","${configAds.urls_estrategicas.ruta_semantica}"`;
      return csvHeaders + csvData;
    
    case 'n8n-config':
      return {
        flowName: configAds.automatizacion_n8n.flujo_principal,
        integrations: configAds.automatizacion_n8n.integraciones,
        timing: configAds.automatizacion_n8n.timing,
        actions: configAds.automatizacion_n8n.acciones_automaticas
      };
    
    case 'facebook-ads':
      return {
        campaignName: configAds.campana.nombre_formulario,
        trackingTag: configAds.campana.tag_seguimiento,
        formConfig: configAds.formulario_meta,
        adContent: configAds.contenido_ads,
        pixelEvents: configAds.tracking_analytics.facebook_pixel
      };
    
    default:
      return configAds;
  }
}

/**
 * Función para validar configuración de ads
 */
function validarConfiguracionAds(curso) {
  const errores = [];
  const config = curso.configuracion_ads;
  
  // Validar campos obligatorios
  if (!config.campana.tag_seguimiento) {
    errores.push('Tag de seguimiento no configurado');
  }
  
  if (!config.campana.nombre_formulario) {
    errores.push('Nombre de formulario no configurado');
  }
  
  if (!config.urls_estrategicas.ruta_directa || !config.urls_estrategicas.ruta_semantica) {
    errores.push('URLs estratégicas incompletas');
  }
  
  if (!config.tracking_analytics.facebook_pixel.evento_principal) {
    errores.push('Evento principal de Facebook Pixel no configurado');
  }
  
  // Validar formato de tag de seguimiento
  const tagPattern = /^[a-z0-9]+-[a-z0-9-]+-[a-z0-9]+$/;
  if (config.campana.tag_seguimiento && !tagPattern.test(config.campana.tag_seguimiento)) {
    errores.push('Formato de tag de seguimiento inválido (debe ser: temporada-curso-sede)');
  }
  
  return {
    valido: errores.length === 0,
    errores: errores
  };
}

// Ejemplo de uso si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    console.log('🎯 CEP Formación - Generador de Cursos con Ads v2.0\n');
    
    // Generar curso de ejemplo
    const cursoGenerado = generarCursoConAds('plantilla_desempleados');
    
    // Validar configuración
    const validacion = validarConfiguracionAds(cursoGenerado);
    if (validacion.valido) {
      console.log('✅ Configuración de ads válida');
    } else {
      console.log('❌ Errores en configuración de ads:');
      validacion.errores.forEach(error => console.log(`   - ${error}`));
    }
    
    // Exportar en diferentes formatos
    console.log('\n📁 Exportando configuraciones...');
    
    // Guardar configuración completa
    const configCompleta = exportarConfiguracionAds(cursoGenerado, 'json');
    fs.writeFileSync('curso-ads-config.json', configCompleta);
    console.log('   - Configuración completa: curso-ads-config.json');
    
    // Guardar configuración para n8n
    const configN8n = exportarConfiguracionAds(cursoGenerado, 'n8n-config');
    fs.writeFileSync('n8n-automation-config.json', JSON.stringify(configN8n, null, 2));
    console.log('   - Configuración n8n: n8n-automation-config.json');
    
    // Guardar configuración para Facebook Ads
    const configFacebook = exportarConfiguracionAds(cursoGenerado, 'facebook-ads');
    fs.writeFileSync('facebook-ads-config.json', JSON.stringify(configFacebook, null, 2));
    console.log('   - Configuración Facebook Ads: facebook-ads-config.json');
    
    // Guardar CSV para formularios
    const csvFormularios = exportarConfiguracionAds(cursoGenerado, 'csv-formularios');
    fs.writeFileSync('formularios-meta.csv', csvFormularios);
    console.log('   - CSV Formularios: formularios-meta.csv');
    
    console.log('\n🎉 ¡Generación completada exitosamente!');
    console.log('\n📋 Resumen del curso generado:');
    console.log(`   - Nombre: ${cursoGenerado.informacion_basica?.nombre || 'No especificado'}`);
    console.log(`   - Sede: ${cursoGenerado.informacion_basica?.sede || 'No especificado'}`);
    console.log(`   - Tag de seguimiento: ${cursoGenerado.configuracion_ads?.campana?.tag_seguimiento || 'No configurado'}`);
    console.log(`   - Formulario Meta: ${cursoGenerado.configuracion_ads?.campana?.nombre_formulario || 'No configurado'}`);
    
  } catch (error) {
    console.error('❌ Error durante la generación:', error.message);
    process.exit(1);
  }
}

// Exportar funciones para uso como módulo
export {
  generarCursoConAds,
  exportarConfiguracionAds,
  validarConfiguracionAds,
  reemplazarVariables
};