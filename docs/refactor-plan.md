# CEP Formación – Plan de Refactorización y Migración de Datos

> **Última actualización:** 2025-07-07 11:18 (CEST)
> **Contexto:** Regresamos al commit estable de `main` para reiniciar el proceso de migración de datos de forma controlada en la rama `refactor/data-migration`.
> **Objetivo:** Solucionar las inconsistencias de datos y errores de UI mediante la duplicación de cursos multi-sede y la refactorización de componentes.

---

## 1. Reglas de Negocio y Desarrollo

### 1.1. Nomenclatura y Estructura de Datos
*   **Sedes:** Identificarse **exclusivamente** como `"CEP NORTE"` o `"CEP SANTA CRUZ"`.
*   **Códigos:** Sufijos `-NORTE` o `-STACRUZ` para cursos duplicados (ej: `QUIROMASAJE-STACRUZ`). No usar `TF` o `GC`.
*   **Identificadores:**
    *   `slugBase`: Para el **tipo** de curso (ej: `quiromasaje-11-meses`).
    *   `codigo`: Para la **instancia** del curso (ej: `QUIROMASAJE-STACRUZ`).
    *   `slug`: Para la **URL** de la página del curso (ej: `quiromasaje-11-meses-santa-cruz`).

### 1.2. Lógica de Etiquetas de Estado (CursoCard)
*   La etiqueta es dinámica según `fechaInicio`.
*   **Matrícula Cerrada (Rojo):** Más de 5 días después de `fechaInicio`.
*   **Últimas Plazas:** En el rango de 5 días antes y 5 días después de `fechaInicio`.
*   **Mes Año:** Para cualquier otra fecha futura (ej: "Octubre 2025").
*   **Próximamente:** Si `fechaInicio` no está definido.

### 1.3. Principios Técnicos
*   **Adición sobre Modificación:** Añadir nuevos campos en lugar de alterar existentes si hay riesgo de impacto.
*   **Cero Errores:** Errores de build, linter o consola son bloqueantes.
*   **Assets:** No crear imágenes nuevas. Usar, duplicar o renombrar las existentes.

---

## 2. Estrategia de Ejecución Controlada (Lecciones Aprendidas)

Para garantizar un proceso robusto y sin errores, seguiremos esta estrategia:

1.  **Cambios Atómicos:** Modificaremos `base-cursos.json` curso por curso. Cada migración de un curso será un paso discreto y verificable.
2.  **Validación Previa:** Antes de ejecutar una modificación de archivo (`replace_file_content`), leeremos el bloque de código a reemplazar para asegurar que el `TargetContent` es 100% exacto.
3.  **Fuente de Verdad:** Todas las actualizaciones de datos (fechas, precios, etc.) se basarán exclusivamente en el contenido de `Cursos_CEP_2025.markdown`. No se improvisarán datos.
4.  **Ciclo de Validación (Tú-Yo):** Después de cada modificación de datos, pausaremos y te pediré una **verificación visual** explícita. No continuaremos con el siguiente curso hasta tener tu visto bueno.

---

## 3. Arquitectura de Datos Objetivo

El objetivo es transformar `base-cursos.json` para que cada curso tenga una entrada por sede.

```jsonc
// Ejemplo de un curso duplicado para una sede
{
  "nombre": "Quiromasaje (11 meses) - Santa Cruz",
  "codigo": "QUIROMASAJE-STACRUZ",
  "slug": "quiromasaje-11-meses-santa-cruz",
  "slugBase": "quiromasaje-11-meses",
  "sede": "CEP SANTA CRUZ",
  "fechaInicio": "2025-06-20", // Formato YYYY-MM-DD
  "horario": "Viernes 10:00-14:00",
  // ... resto de campos específicos de la instancia
}
```

---

## 4. Plan de Trabajo y Próximos Pasos

Nos encontramos en la rama `refactor/data-migration-v2`. El proceso será iterativo y controlado.

**Próximo Paso Inmediato: Migración del curso "Quiromasaje"**

1.  **Validación Previa:** Leer `base-cursos.json` para obtener el bloque exacto del curso original (`codigo: "QUIROMASAJE"`).
2.  **Fuente de Verdad:** Leer `Cursos_CEP_2025.markdown` para extraer los datos actualizados de ambas sedes.
3.  **Construcción:** Generar los dos nuevos objetos JSON para el curso (Norte y Santa Cruz) aplicando la arquitectura definida.
4.  **Ejecución:** Reemplazar el bloque original en `base-cursos.json` con los dos nuevos bloques.
5.  **Verificación Visual:**
    *   Ejecutar `npm run dev`.
    *   Te pediré que compruebes que la web carga y que los dos cursos de Quiromasaje aparecen correctamente en sus respectivas sedes.

**Siguientes Pasos (tras tu validación):**

*   Continuar con el siguiente curso multi-sede, repitiendo el proceso.
*   Una vez migrados todos los datos, refactorizar los componentes de la UI (`HomePage`, `CursoCard`, etc.).

---

> **Fin del documento.** Este plan servirá como guía para continuar el desarrollo.
