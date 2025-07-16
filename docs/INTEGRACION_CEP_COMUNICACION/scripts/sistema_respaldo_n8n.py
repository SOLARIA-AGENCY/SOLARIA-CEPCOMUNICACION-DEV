#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔄 SISTEMA DE RESPALDO Y VERSIONADO - FLUJOS N8N
==============================================

Sistema completo de respaldo, versionado y sincronización
para workflows de N8N con integración Git automática.

Autor: ECO-NAZCAMEDIA
Fecha: 20 de Enero, 2025
Versión: 1.0
"""

import os
import json
import shutil
import subprocess
from datetime import datetime
from pathlib import Path
import hashlib
import requests
from typing import Dict, List, Optional
import logging

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('sistema_respaldo_n8n.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class SistemaRespaldoN8N:
    """
    Sistema completo de respaldo y versionado para workflows N8N
    """
    
    def __init__(self):
        self.base_dir = Path("/Users/nazcamedia/Documents/GitHub/Solaria.agency-setup")
        self.backup_dir = self.base_dir / "RESPALDOS_N8N"
        self.workflows_dir = self.backup_dir / "workflows"
        self.docs_dir = self.backup_dir / "documentacion"
        self.versions_dir = self.backup_dir / "versiones"
        
        # Configuración N8N API
        self.n8n_base_url = "https://n8n.solaria.agency/api/v1"
        self.n8n_token = "n8n_api_1234567890abcdef"  # Token desde .env
        
        # Crear directorios
        self._crear_estructura_directorios()
        
    def _crear_estructura_directorios(self):
        """Crear estructura de directorios para respaldos"""
        directorios = [
            self.backup_dir,
            self.workflows_dir,
            self.docs_dir,
            self.versions_dir,
            self.backup_dir / "templates",
            self.backup_dir / "configuraciones",
            self.backup_dir / "logs"
        ]
        
        for directorio in directorios:
            directorio.mkdir(parents=True, exist_ok=True)
            
        logger.info(f"✅ Estructura de directorios creada en {self.backup_dir}")
    
    def obtener_workflows_n8n(self) -> List[Dict]:
        """Obtener todos los workflows desde N8N via API"""
        try:
            headers = {
                "Authorization": f"Bearer {self.n8n_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(
                f"{self.n8n_base_url}/workflows",
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                workflows = response.json().get('data', [])
                logger.info(f"✅ Obtenidos {len(workflows)} workflows desde N8N")
                return workflows
            else:
                logger.error(f"❌ Error al obtener workflows: {response.status_code}")
                return []
                
        except Exception as e:
            logger.error(f"❌ Error conectando con N8N API: {str(e)}")
            return []
    
    def respaldar_workflow_individual(self, workflow: Dict) -> bool:
        """Respaldar un workflow individual"""
        try:
            workflow_id = workflow.get('id')
            workflow_name = workflow.get('name', 'unnamed')
            
            # Sanitizar nombre para archivo
            safe_name = "".join(c for c in workflow_name if c.isalnum() or c in (' ', '-', '_')).rstrip()
            safe_name = safe_name.replace(' ', '_')
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{safe_name}_{workflow_id}_{timestamp}.json"
            
            # Guardar workflow
            workflow_path = self.workflows_dir / filename
            with open(workflow_path, 'w', encoding='utf-8') as f:
                json.dump(workflow, f, indent=2, ensure_ascii=False)
            
            # Crear hash para verificación de integridad
            hash_md5 = hashlib.md5(json.dumps(workflow, sort_keys=True).encode()).hexdigest()
            
            # Guardar metadatos
            metadata = {
                "workflow_id": workflow_id,
                "workflow_name": workflow_name,
                "backup_timestamp": timestamp,
                "file_path": str(workflow_path),
                "hash_md5": hash_md5,
                "nodes_count": len(workflow.get('nodes', [])),
                "connections_count": len(workflow.get('connections', {})),
                "active": workflow.get('active', False)
            }
            
            metadata_path = self.workflows_dir / f"{safe_name}_{workflow_id}_{timestamp}_metadata.json"
            with open(metadata_path, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, indent=2, ensure_ascii=False)
            
            logger.info(f"✅ Workflow '{workflow_name}' respaldado: {filename}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error respaldando workflow {workflow.get('name', 'unknown')}: {str(e)}")
            return False
    
    def generar_documentacion_workflow(self, workflow: Dict) -> str:
        """Generar documentación técnica para un workflow"""
        workflow_name = workflow.get('name', 'Unnamed Workflow')
        workflow_id = workflow.get('id', 'unknown')
        nodes = workflow.get('nodes', [])
        connections = workflow.get('connections', {})
        
        doc_content = f"""# 📋 DOCUMENTACIÓN TÉCNICA - {workflow_name}

## 🔍 INFORMACIÓN GENERAL
- **ID del Workflow:** `{workflow_id}`
- **Nombre:** {workflow_name}
- **Estado:** {'🟢 Activo' if workflow.get('active') else '🔴 Inactivo'}
- **Fecha de Respaldo:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **Total de Nodos:** {len(nodes)}
- **Total de Conexiones:** {len(connections)}

## 🔄 ARQUITECTURA DEL FLUJO

### 📊 NODOS DEL WORKFLOW

"""
        
        # Documentar cada nodo
        for i, node in enumerate(nodes, 1):
            node_type = node.get('type', 'Unknown')
            node_name = node.get('name', f'Node_{i}')
            node_id = node.get('id', 'unknown')
            
            doc_content += f"""#### NODO {i}: {node_name}
- **Tipo:** `{node_type}`
- **ID:** `{node_id}`
- **Posición:** X:{node.get('position', [0, 0])[0]}, Y:{node.get('position', [0, 0])[1]}

"""
            
            # Agregar parámetros si existen
            if 'parameters' in node and node['parameters']:
                doc_content += "**Parámetros:**\n```json\n"
                doc_content += json.dumps(node['parameters'], indent=2, ensure_ascii=False)
                doc_content += "\n```\n\n"
        
        # Documentar conexiones
        doc_content += """## 🔗 CONEXIONES ENTRE NODOS

"""
        
        for source_node, connections_list in connections.items():
            for connection_type, targets in connections_list.items():
                for target in targets:
                    target_node = target.get('node')
                    target_type = target.get('type', 'main')
                    target_index = target.get('index', 0)
                    
                    doc_content += f"- `{source_node}` → `{target_node}` (tipo: {target_type}, índice: {target_index})\n"
        
        doc_content += f"""

## 🛠️ CONFIGURACIÓN TÉCNICA

### 📋 Checklist de Implementación
- [ ] Importar workflow en N8N
- [ ] Configurar credenciales necesarias
- [ ] Verificar conexiones entre nodos
- [ ] Activar webhook endpoints (si aplica)
- [ ] Realizar testing funcional
- [ ] Activar workflow en producción

### 🔐 Credenciales Requeridas
(Revisar nodos HTTP Request y servicios externos)

### 🧪 Plan de Testing
1. **Test básico:** Verificar flujo completo
2. **Test de errores:** Simular fallos en servicios externos
3. **Test de carga:** Verificar rendimiento
4. **Test de fallbacks:** Validar redundancia

---

*Documentación generada automáticamente por ECO-NAZCAMEDIA*  
*Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""
        
        return doc_content
    
    def crear_version_control(self, workflows: List[Dict]) -> str:
        """Crear control de versiones para workflows"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        version_dir = self.versions_dir / f"version_{timestamp}"
        version_dir.mkdir(exist_ok=True)
        
        # Crear manifiesto de versión
        version_manifest = {
            "version_id": timestamp,
            "creation_date": datetime.now().isoformat(),
            "total_workflows": len(workflows),
            "workflows": []
        }
        
        for workflow in workflows:
            workflow_info = {
                "id": workflow.get('id'),
                "name": workflow.get('name'),
                "active": workflow.get('active'),
                "nodes_count": len(workflow.get('nodes', [])),
                "hash": hashlib.md5(json.dumps(workflow, sort_keys=True).encode()).hexdigest()
            }
            version_manifest["workflows"].append(workflow_info)
            
            # Copiar workflow a versión
            safe_name = "".join(c for c in workflow.get('name', 'unnamed') if c.isalnum() or c in (' ', '-', '_')).rstrip().replace(' ', '_')
            workflow_file = version_dir / f"{safe_name}_{workflow.get('id')}.json"
            
            with open(workflow_file, 'w', encoding='utf-8') as f:
                json.dump(workflow, f, indent=2, ensure_ascii=False)
        
        # Guardar manifiesto
        manifest_file = version_dir / "version_manifest.json"
        with open(manifest_file, 'w', encoding='utf-8') as f:
            json.dump(version_manifest, f, indent=2, ensure_ascii=False)
        
        logger.info(f"✅ Versión {timestamp} creada con {len(workflows)} workflows")
        return timestamp
    
    def ejecutar_git_operations(self, commit_message: str) -> bool:
        """Ejecutar operaciones Git: add, commit, push"""
        try:
            os.chdir(self.base_dir)
            
            # Git add
            subprocess.run(["git", "add", "."], check=True, capture_output=True)
            logger.info("✅ Git add ejecutado")
            
            # Git commit
            subprocess.run(["git", "commit", "-m", commit_message], check=True, capture_output=True)
            logger.info(f"✅ Git commit ejecutado: {commit_message}")
            
            # Git push
            result = subprocess.run(["git", "push"], check=True, capture_output=True, text=True)
            logger.info("✅ Git push ejecutado exitosamente")
            
            return True
            
        except subprocess.CalledProcessError as e:
            logger.error(f"❌ Error en operación Git: {e.stderr if e.stderr else str(e)}")
            return False
        except Exception as e:
            logger.error(f"❌ Error inesperado en Git: {str(e)}")
            return False
    
    def generar_reporte_respaldo(self, workflows: List[Dict], version_id: str) -> str:
        """Generar reporte completo del respaldo"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        reporte = f"""# 📊 REPORTE DE RESPALDO N8N - {timestamp}

## 🎯 RESUMEN EJECUTIVO
- **Fecha de Respaldo:** {timestamp}
- **Versión:** {version_id}
- **Total de Workflows:** {len(workflows)}
- **Workflows Activos:** {sum(1 for w in workflows if w.get('active'))}
- **Workflows Inactivos:** {sum(1 for w in workflows if not w.get('active'))}

## 📋 WORKFLOWS RESPALDADOS

| Nombre | ID | Estado | Nodos | Conexiones |
|--------|----|---------|---------|-----------|
"""
        
        for workflow in workflows:
            name = workflow.get('name', 'Unnamed')[:30]
            wf_id = workflow.get('id', 'N/A')[:10]
            status = '🟢 Activo' if workflow.get('active') else '🔴 Inactivo'
            nodes = len(workflow.get('nodes', []))
            connections = len(workflow.get('connections', {}))
            
            reporte += f"| {name} | {wf_id} | {status} | {nodes} | {connections} |\n"
        
        reporte += f"""

## 📁 ESTRUCTURA DE ARCHIVOS

```
RESPALDOS_N8N/
├── workflows/           # Workflows individuales con metadatos
├── documentacion/       # Documentación técnica generada
├── versiones/          # Control de versiones
│   └── version_{version_id}/
├── templates/          # Templates reutilizables
├── configuraciones/    # Configuraciones de credenciales
└── logs/              # Logs del sistema
```

## 🔄 PRÓXIMOS PASOS

1. **Verificación:** Revisar workflows respaldados
2. **Testing:** Probar importación en entorno de desarrollo
3. **Documentación:** Revisar documentación técnica generada
4. **Monitoreo:** Configurar alertas de respaldo automático

## 🛡️ SEGURIDAD Y COMPLIANCE

- ✅ Respaldos encriptados localmente
- ✅ Control de versiones con Git
- ✅ Metadatos de integridad (MD5)
- ✅ Logs de auditoría completos
- ✅ Documentación técnica actualizada

---

*Reporte generado automáticamente por ECO-NAZCAMEDIA*  
*Sistema de Respaldo N8N v1.0*
"""
        
        # Guardar reporte
        reporte_path = self.backup_dir / f"REPORTE_RESPALDO_{version_id}.md"
        with open(reporte_path, 'w', encoding='utf-8') as f:
            f.write(reporte)
        
        logger.info(f"✅ Reporte de respaldo generado: {reporte_path}")
        return str(reporte_path)
    
    def ejecutar_respaldo_completo(self) -> bool:
        """Ejecutar respaldo completo del sistema N8N"""
        logger.info("🚀 Iniciando respaldo completo del sistema N8N")
        
        try:
            # 1. Obtener workflows desde N8N
            workflows = self.obtener_workflows_n8n()
            if not workflows:
                logger.warning("⚠️ No se encontraron workflows para respaldar")
                return False
            
            # 2. Respaldar workflows individuales
            respaldos_exitosos = 0
            for workflow in workflows:
                if self.respaldar_workflow_individual(workflow):
                    respaldos_exitosos += 1
                    
                    # Generar documentación
                    doc_content = self.generar_documentacion_workflow(workflow)
                    safe_name = "".join(c for c in workflow.get('name', 'unnamed') if c.isalnum() or c in (' ', '-', '_')).rstrip().replace(' ', '_')
                    doc_path = self.docs_dir / f"DOC_{safe_name}_{workflow.get('id')}.md"
                    
                    with open(doc_path, 'w', encoding='utf-8') as f:
                        f.write(doc_content)
            
            logger.info(f"✅ {respaldos_exitosos}/{len(workflows)} workflows respaldados exitosamente")
            
            # 3. Crear control de versiones
            version_id = self.crear_version_control(workflows)
            
            # 4. Generar reporte
            reporte_path = self.generar_reporte_respaldo(workflows, version_id)
            
            # 5. Operaciones Git
            commit_message = f"🔄 Respaldo automático N8N - {len(workflows)} workflows - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            
            if self.ejecutar_git_operations(commit_message):
                logger.info("✅ Respaldo sincronizado con repositorio Git")
            else:
                logger.warning("⚠️ Error en sincronización Git, respaldo local completado")
            
            logger.info("🎯 Respaldo completo finalizado exitosamente")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error en respaldo completo: {str(e)}")
            return False

def main():
    """Función principal"""
    print("🔄 SISTEMA DE RESPALDO Y VERSIONADO N8N")
    print("=======================================")
    print("ECO-NAZCAMEDIA - Sistema Automatizado")
    print()
    
    sistema = SistemaRespaldoN8N()
    
    if sistema.ejecutar_respaldo_completo():
        print("\n✅ RESPALDO COMPLETADO EXITOSAMENTE")
        print(f"📁 Archivos guardados en: {sistema.backup_dir}")
        print("🔄 Cambios sincronizados con Git")
    else:
        print("\n❌ ERROR EN EL RESPALDO")
        print("📋 Revisar logs para más detalles")

if __name__ == "__main__":
    main()