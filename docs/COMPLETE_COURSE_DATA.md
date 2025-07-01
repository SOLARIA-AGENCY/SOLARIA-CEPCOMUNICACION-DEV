# COMPLETE COURSE DATA - SOLARIA CEP COMUNICACIÓN

Este archivo contiene la información completa para generar 14 landings individuales siguiendo la estructura de AdiestramientoCaninoPage.tsx

## ESTRUCTURA OBJETIVO
Cada curso necesita:
- Landing individual completa (como `/adiestramiento-canino`)
- Información detallada: temario, precios, prácticas, profesores
- Ruta directa sin `/curso/` prefijo
- Cards enlazando directamente a la landing

## PROBLEMAS IDENTIFICADOS
1. Cards enlazan a `/curso/[slug]` (estructura básica)
2. Falta información detallada en 13 landings
3. Solo existe AdiestramientoCaninoPage completa
4. Necesario crear 13 páginas adicionales

## DATOS COMPLETOS DE LOS 14 CURSOS

### 1. ADIESTRAMIENTO CANINO - NORTE ✅ (YA EXISTE)
**Ruta:** `/adiestramiento-canino` → mantener como está
**Archivo:** `AdiestramientoCaninoPage.tsx` → ya implementado

### 2. AGENTE FUNERARIO - SANTA CRUZ  
**Ruta nueva:** `/agente-funerario-santacruz`
**Archivo crear:** `AgenteFunerarioSantaCruzPage.tsx`

### 3. AUXILIAR CLÍNICO VETERINARIO - NORTE
**Ruta nueva:** `/auxiliar-clinico-veterinario-norte` 
**Archivo crear:** `AuxiliarClinicoVeterinarioNortePage.tsx`

### 4. AUXILIAR CLÍNICO VETERINARIO - SANTA CRUZ
**Ruta nueva:** `/auxiliar-clinico-veterinario-santacruz`
**Archivo crear:** `AuxiliarClinicoVeterinarioSantaCruzPage.tsx`

### 5. AUXILIAR DE CLÍNICAS ESTÉTICAS - SANTA CRUZ  
**Ruta nueva:** `/auxiliar-clinicas-esteticas-santacruz`
**Archivo crear:** `AuxiliarClinicasEsteticasSantaCruzPage.tsx`

### 6. AUXILIAR DE ENFERMERÍA - NORTE
**Ruta nueva:** `/auxiliar-enfermeria-norte`
**Archivo crear:** `AuxiliarEnfermeriaNortePage.tsx`

### 7. AUXILIAR DE ENFERMERÍA - SANTA CRUZ
**Ruta nueva:** `/auxiliar-enfermeria-santacruz` 
**Archivo crear:** `AuxiliarEnfermeriaSantaCruzPage.tsx`

### 8. AUXILIAR DE FARMACIA CON DERMOCOSMÉTICA - NORTE
**Ruta nueva:** `/auxiliar-farmacia-dermo-norte`
**Archivo crear:** `AuxiliarFarmaciaDermoNortePage.tsx`

### 9. AUXILIAR DE ODONTOLOGÍA + PERIODONCIA - NORTE  
**Ruta nueva:** `/auxiliar-odontologia-norte`
**Archivo crear:** `AuxiliarOdontologiaNortePage.tsx`

### 10. AUXILIAR DE ODONTOLOGÍA + PERIODONCIA - SANTA CRUZ
**Ruta nueva:** `/auxiliar-odontologia-santacruz`
**Archivo crear:** `AuxiliarOdontologiaSantaCruzPage.tsx`

### 11. DIETÉTICA Y NUTRICIÓN - NORTE
**Ruta nueva:** `/dietetica-nutricion-norte`  
**Archivo crear:** `DieteticaNutricionNortePage.tsx`

### 12. PELUQUERÍA CANINA Y FELINA - NORTE
**Ruta nueva:** `/peluqueria-canina-felina-norte`
**Archivo crear:** `PeluqueriaCaninaNortePage.tsx`

### 13. PELUQUERÍA CANINA Y FELINA - SANTA CRUZ  
**Ruta nueva:** `/peluqueria-canina-felina-santacruz`
**Archivo crear:** `PeluqueriaCaninaSantaCruzPage.tsx`

### 14. QUIROMASAJE NIVEL 2 - NORTE
**Ruta nueva:** `/quiromasaje-nivel2-norte`
**Archivo crear:** `QuiromasajeNivel2NortePage.tsx`

## PLAN DE IMPLEMENTACIÓN

### PASO 1: Corregir enlaces en CursosPage.tsx
Cambiar de: `href={/curso/${curso.slug}}` 
A: `href={/${curso.slug}}`

### PASO 2: Crear 13 archivos de páginas faltantes
Usar como plantilla AdiestramientoCaninoPage.tsx

### PASO 3: Actualizar App.tsx  
Añadir 13 rutas nuevas sin `/curso/` prefijo

### PASO 4: Actualizar datos en cursos-otono-2025.ts
Asegurar que los slugs coincidan con las rutas nuevas

### PASO 5: Testing completo
Verificar que todos los enlaces funcionen

---

**ESTADO ACTUAL:** 1/14 landings completas
**OBJETIVO:** 14/14 landings completas con estructura rica
**ACCIÓN INMEDIATA:** Implementar los 13 archivos faltantes 