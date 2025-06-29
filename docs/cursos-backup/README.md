# Respaldo de Cursos - cursostenerife.es

Este directorio contiene el respaldo completo de la información de todos los cursos extraídos de **www.cursostenerife.es** mediante Firecrawl.

## Propósito

- **Respaldo permanente**: Garantizar que siempre tenemos acceso a la información completa de cada curso
- **Recuperación ante pérdidas**: En caso de que se borren páginas de la web original
- **Referencia estructurada**: Información organizada y estandarizada para uso en nuestras landing pages
- **Fuente de datos**: Base de datos de contenido para poblar automáticamente nuestras páginas

## Estructura de Archivos

Cada archivo `.md` contiene la información completa de un curso con la siguiente estructura:

### Front Matter (YAML)
```yaml
---
titulo: "Nombre del Curso"
slug: "nombre-curso"
categoria: "categoria"
url_original: "https://cursostenerife.es/cursos/..."
fecha_extraccion: "YYYY-MM-DD"
estado: "activo"
---
```

### Secciones Principales
- **Datos del Curso**: Duración, modalidad, precio, prácticas, requisitos
- **Descripción del Curso**: Qué se aprende y a quién va dirigido
- **Temario**: Contenido detallado por módulos
- **Profesor/a**: Información del equipo docente
- **Salidas Profesionales**: Oportunidades laborales
- **Cursos Complementarios**: Formación adicional recomendada
- **Otros Detalles**: Información adicional relevante

## Cursos Incluidos

### ✅ Cursos Extraídos (6 cursos)

1. **[Adiestramiento Canino](./adiestramiento-canino.md)**
   - Categoría: Adiestramiento
   - Duración: 6 meses / 25 sesiones
   - Precio: 660€ total

2. **[Auxiliar de Clínicas Estéticas](./auxiliar-clinicas-esteticas.md)**
   - Categoría: Sanidad
   - Duración: 10 meses / 40 sesiones
   - Precio: 1.250€ total

3. **[Auxiliar de Enfermería](./auxiliar-enfermeria.md)**
   - Categoría: Sanidad
   - Duración: 10 meses / 40 sesiones
   - Precio: 1.150€ total

4. **[Farmacia y Parafarmacia](./farmacia-parafarmacia.md)**
   - Categoría: Sanidad
   - Duración: 10 meses / 40 sesiones
   - Precio: 1.150€ total

5. **[Tanatoestética y Tanatopraxia (Agente Funerario)](./agente-funerario-tanatopraxia.md)**
   - Categoría: Sanidad
   - Duración: 10 meses / 40 sesiones
   - Precio: No especificado

6. **[Auxiliar de Veterinaria](./auxiliar-veterinaria.md)**
   - Categoría: Veterinaria
   - Duración: 9 meses / 36 sesiones
   - Precio: No especificado

## Información Extraída

### ✅ Datos Capturados
- ✅ Títulos y descripciones completas
- ✅ Temarios detallados por módulos
- ✅ Duración y modalidades
- ✅ Precios (cuando disponibles)
- ✅ Requisitos de acceso
- ✅ Salidas profesionales
- ✅ Cursos complementarios
- ✅ Información de profesores (cuando disponible)

### ⚠️ Limitaciones
- Algunos precios no están especificados en la web original
- Información de profesores limitada en algunos cursos
- Fechas de inicio no incluidas (varían por convocatoria)

## Uso y Mantenimiento

### Actualización del Respaldo
Para actualizar la información, ejecutar el proceso de extracción:
1. Mapear la web de cursostenerife.es
2. Extraer contenido con Firecrawl
3. Procesar y estructurar la información
4. Actualizar archivos .md correspondientes

### Integración con Nuestra Web
La información de estos archivos puede utilizarse para:
- Poblar automáticamente las páginas de cursos
- Generar formularios de inscripción
- Crear comparativas de cursos
- Alimentar el sistema de búsqueda

## Metadatos

- **Fecha de creación**: 2025-01-02
- **Fuente**: www.cursostenerife.es
- **Método de extracción**: Firecrawl (scraping semántico)
- **Formato**: Markdown con front matter YAML
- **Última actualización**: 2025-01-02

## Próximos Pasos

1. **Expansión**: Extraer cursos adicionales de cursostenerife.es
2. **Automatización**: Crear script para actualización automática
3. **Integración**: Conectar con nuestro CMS/base de datos
4. **Validación**: Verificar periódicamente la vigencia de la información

---

**Nota**: Este respaldo es fundamental para mantener la continuidad de nuestro servicio y garantizar que siempre tenemos acceso a información actualizada y completa de todos los cursos. 