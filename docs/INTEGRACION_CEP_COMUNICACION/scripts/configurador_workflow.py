#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔄 CONFIGURADOR AUTOMÁTICO - WORKFLOW EMAIL BIENVENIDA
====================================================

Script para crear y configurar automáticamente el workflow
de email de bienvenida en N8N usando MCP.

Autor: ECO-NAZCAMEDIA
Fecha: 20 de Enero, 2025
Versión: 1.0
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ConfiguradorWorkflowEmailBienvenida:
    """
    Configurador automático para el workflow de email de bienvenida
    """
    
    def __init__(self):
        self.workflow_name = "Newsletter Email Bienvenida - CEP Comunicación"
        self.workflow_description = "Flujo automatizado de bienvenida para suscriptores del newsletter con fallback dual CRM"
        
    def generar_nodo_webhook_trigger(self) -> Dict[str, Any]:
        """Generar configuración del nodo Webhook Trigger"""
        return {
            "id": "webhook-trigger-001",
            "name": "Newsletter_Subscription_Webhook",
            "type": "n8n-nodes-base.webhook",
            "typeVersion": 1,
            "position": [240, 300],
            "parameters": {
                "httpMethod": "POST",
                "path": "newsletter-signup",
                "authentication": "none",
                "responseMode": "responseNode",
                "options": {
                    "rawBody": False,
                    "allowedOrigins": "*"
                }
            }
        }
    
    def generar_nodo_email_validator(self) -> Dict[str, Any]:
        """Generar configuración del nodo Email Validator"""
        codigo_validacion = """
// Función de validación y sanitización
const inputData = $input.all();
const results = [];

for (const item of inputData) {
  const data = item.json;
  
  // Validación de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!data.email || !emailRegex.test(data.email)) {
    return [{
      json: {
        error: true,
        message: "Email inválido",
        status_code: 400,
        original_data: data
      }
    }];
  }
  
  // Sanitización
  const sanitizedData = {
    email: data.email.toLowerCase().trim(),
    firstName: data.firstName ? data.firstName.trim() : '',
    lastName: data.lastName ? data.lastName.trim() : '',
    source: data.source || 'unknown',
    utm_campaign: data.utm_campaign || '',
    timestamp: new Date().toISOString()
  };
  
  results.push({ json: sanitizedData });
}

return results;
"""
        
        return {
            "id": "email-validator-002",
            "name": "Email_Validator_Sanitizer",
            "type": "n8n-nodes-base.function",
            "typeVersion": 1,
            "position": [460, 300],
            "parameters": {
                "functionCode": codigo_validacion
            }
        }
    
    def generar_nodo_data_enrichment(self) -> Dict[str, Any]:
        """Generar configuración del nodo Data Enrichment"""
        codigo_enriquecimiento = """
// Enriquecimiento de datos
const inputData = $input.all();
const enrichedResults = [];

for (const item of inputData) {
  const data = item.json;
  
  const enrichedData = {
    ...data,
    subscriber_id: 'CEP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    subscription_date: new Date().toISOString(),
    source_enriched: 'website_newsletter',
    device_info: 'web',
    tags: ['newsletter', 'cep-comunicacion', 'new-subscriber'],
    status: 'active'
  };
  
  enrichedResults.push({ json: enrichedData });
}

return enrichedResults;
"""
        
        return {
            "id": "data-enrichment-003",
            "name": "Data_Enrichment_Engine",
            "type": "n8n-nodes-base.function",
            "typeVersion": 1,
            "position": [680, 300],
            "parameters": {
                "functionCode": codigo_enriquecimiento
            }
        }
    
    def generar_nodo_brevo_registration(self) -> Dict[str, Any]:
        """Generar configuración del nodo Brevo Registration"""
        return {
            "id": "brevo-registration-004",
            "name": "Brevo_Contact_Registration",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 3,
            "position": [900, 200],
            "parameters": {
                "method": "POST",
                "url": "https://api.brevo.com/v3/contacts",
                "headers": {
                    "api-key": "={{$env.BREVO_API_KEY}}",
                    "Content-Type": "application/json"
                },
                "body": {
                    "email": "={{$json.email}}",
                    "attributes": {
                        "FIRSTNAME": "={{$json.firstName}}",
                        "LASTNAME": "={{$json.lastName}}",
                        "SUBSCRIPTION_DATE": "={{$json.subscription_date}}",
                        "SOURCE": "={{$json.source}}",
                        "SUBSCRIBER_ID": "={{$json.subscriber_id}}"
                    },
                    "listIds": [2],
                    "updateEnabled": True
                },
                "options": {
                    "timeout": 10000,
                    "retry": {
                        "enabled": True,
                        "maxRetries": 3,
                        "retryInterval": 1000
                    }
                }
            }
        }
    
    def generar_nodo_brevo_welcome_email(self) -> Dict[str, Any]:
        """Generar configuración del nodo Brevo Welcome Email"""
        return {
            "id": "brevo-welcome-email-005",
            "name": "Brevo_Welcome_Email_Sender",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 3,
            "position": [1120, 200],
            "parameters": {
                "method": "POST",
                "url": "https://api.brevo.com/v3/smtp/email",
                "headers": {
                    "api-key": "={{$env.BREVO_API_KEY}}",
                    "Content-Type": "application/json"
                },
                "body": {
                    "to": [
                        {
                            "email": "={{$json.email}}",
                            "name": "={{$json.firstName}} {{$json.lastName}}"
                        }
                    ],
                    "templateId": 7,
                    "params": {
                        "FIRSTNAME": "={{$json.firstName}}",
                        "LASTNAME": "={{$json.lastName}}",
                        "EMAIL": "={{$json.email}}"
                    }
                },
                "options": {
                    "timeout": 10000,
                    "retry": {
                        "enabled": True,
                        "maxRetries": 2,
                        "retryInterval": 2000
                    }
                }
            }
        }
    
    def generar_nodo_mailchimp_registration(self) -> Dict[str, Any]:
        """Generar configuración del nodo Mailchimp Registration"""
        return {
            "id": "mailchimp-registration-006",
            "name": "Mailchimp_Contact_Registration",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 3,
            "position": [900, 400],
            "parameters": {
                "method": "POST",
                "url": "https://{{$env.MAILCHIMP_SERVER_PREFIX}}.api.mailchimp.com/3.0/lists/{{$env.MAILCHIMP_LIST_ID}}/members",
                "headers": {
                    "Authorization": "Bearer {{$env.MAILCHIMP_API_KEY}}",
                    "Content-Type": "application/json"
                },
                "body": {
                    "email_address": "={{$json.email}}",
                    "status": "subscribed",
                    "merge_fields": {
                        "FNAME": "={{$json.firstName}}",
                        "LNAME": "={{$json.lastName}}"
                    },
                    "tags": "={{$json.tags}}"
                },
                "options": {
                    "timeout": 15000,
                    "retry": {
                        "enabled": True,
                        "maxRetries": 2,
                        "retryInterval": 2000
                    }
                }
            }
        }
    
    def generar_nodo_success_response(self) -> Dict[str, Any]:
        """Generar configuración del nodo Success Response"""
        return {
            "id": "success-response-007",
            "name": "Success_Response",
            "type": "n8n-nodes-base.respondToWebhook",
            "typeVersion": 1,
            "position": [1340, 300],
            "parameters": {
                "respondWith": "json",
                "responseBody": {
                    "success": True,
                    "message": "Suscripción completada exitosamente",
                    "subscriber_id": "={{$json.subscriber_id}}",
                    "email": "={{$json.email}}",
                    "timestamp": "={{new Date().toISOString()}}",
                    "services": {
                        "brevo": "registered",
                        "mailchimp": "registered",
                        "welcome_email": "sent"
                    }
                },
                "responseCode": 200
            }
        }
    
    def generar_nodo_error_response(self) -> Dict[str, Any]:
        """Generar configuración del nodo Error Response"""
        return {
            "id": "error-response-008",
            "name": "Error_Response",
            "type": "n8n-nodes-base.respondToWebhook",
            "typeVersion": 1,
            "position": [680, 500],
            "parameters": {
                "respondWith": "json",
                "responseBody": {
                    "success": False,
                    "message": "={{$json.message || 'Error en el procesamiento'}}",
                    "error_code": "={{$json.status_code || 400}}",
                    "timestamp": "={{new Date().toISOString()}}",
                    "details": "Verifique los datos enviados e intente nuevamente"
                },
                "responseCode": "={{$json.status_code || 400}}"
            }
        }
    
    def generar_conexiones_workflow(self) -> Dict[str, Any]:
        """Generar configuración de conexiones entre nodos"""
        return {
            "Newsletter_Subscription_Webhook": {
                "main": [
                    [
                        {
                            "node": "Email_Validator_Sanitizer",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Email_Validator_Sanitizer": {
                "main": [
                    [
                        {
                            "node": "Data_Enrichment_Engine",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Data_Enrichment_Engine": {
                "main": [
                    [
                        {
                            "node": "Brevo_Contact_Registration",
                            "type": "main",
                            "index": 0
                        },
                        {
                            "node": "Mailchimp_Contact_Registration",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Brevo_Contact_Registration": {
                "main": [
                    [
                        {
                            "node": "Brevo_Welcome_Email_Sender",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Brevo_Welcome_Email_Sender": {
                "main": [
                    [
                        {
                            "node": "Success_Response",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Mailchimp_Contact_Registration": {
                "main": [
                    [
                        {
                            "node": "Success_Response",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            }
        }
    
    def generar_workflow_completo(self) -> Dict[str, Any]:
        """Generar configuración completa del workflow"""
        timestamp = datetime.now().isoformat()
        
        workflow = {
            "name": self.workflow_name,
            "nodes": [
                self.generar_nodo_webhook_trigger(),
                self.generar_nodo_email_validator(),
                self.generar_nodo_data_enrichment(),
                self.generar_nodo_brevo_registration(),
                self.generar_nodo_brevo_welcome_email(),
                self.generar_nodo_mailchimp_registration(),
                self.generar_nodo_success_response(),
                self.generar_nodo_error_response()
            ],
            "connections": self.generar_conexiones_workflow(),
            "active": False,
            "settings": {
                "executionOrder": "v1",
                "saveManualExecutions": True,
                "callerPolicy": "workflowsFromSameOwner",
                "timezone": "Europe/Madrid"
            },
            "staticData": {},
            "versionId": "1.0.0",
            "triggerCount": 1,
            "createdAt": timestamp,
            "updatedAt": timestamp,
            "tags": [
                {
                    "id": "newsletter",
                    "name": "Newsletter"
                },
                {
                    "id": "email-automation",
                    "name": "Email Automation"
                },
                {
                    "id": "cep-comunicacion",
                    "name": "CEP Comunicación"
                }
            ]
        }
        
        return workflow
    
    def guardar_workflow_local(self, workflow: Dict[str, Any]) -> str:
        """Guardar workflow en archivo local"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"workflow_email_bienvenida_cep_{timestamp}.json"
        
        base_dir = Path("./")
        workflows_dir = base_dir / "workflows"
        workflows_dir.mkdir(parents=True, exist_ok=True)
        
        filepath = workflows_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(workflow, f, indent=2, ensure_ascii=False)
        
        logger.info(f"✅ Workflow guardado localmente: {filepath}")
        return str(filepath)

def main():
    """Función principal"""
    logger.info("🚀 Iniciando configuración de workflow de email de bienvenida")
    
    configurador = ConfiguradorWorkflowEmailBienvenida()
    
    # Generar workflow completo
    workflow = configurador.generar_workflow_completo()
    
    # Guardar localmente
    filepath = configurador.guardar_workflow_local(workflow)
    
    logger.info(f"✅ Configuración completada. Archivo: {filepath}")
    logger.info("📋 Próximos pasos:")
    logger.info("   1. Importar el workflow en N8N")
    logger.info("   2. Configurar credenciales de APIs")
    logger.info("   3. Activar el workflow")
    logger.info("   4. Probar con datos reales")
    
    return workflow

if __name__ == "__main__":
    main()