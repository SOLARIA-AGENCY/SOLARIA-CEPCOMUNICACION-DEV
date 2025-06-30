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
fecha_extraccion: "2025-01-02"
estado: "activo"
---
```

### Secciones Principales
- **Datos del Curso**: Duración, modalidad, precio, requisitos
- **Descripción del Curso**: Objetivos y dirigido a
- **Temario Completo**: Contenido detallado estructurado
- **Organización del Curso**: Metodología y horarios
- **Profesorado**: Información del equipo docente
- **Salidas Profesionales**: Oportunidades laborales

## Cursos Respaldados

### **Cursos Principales (Ya implementados en nuestra web)**
1. **adiestramiento-canino.md** - Adiestramiento Canino I (660€)
2. **auxiliar-clinicas-esteticas.md** - Auxiliar de Clínicas Estéticas (1.250€)
3. **auxiliar-enfermeria.md** - Auxiliar de Enfermería (1.150€)
4. **farmacia-parafarmacia.md** - Farmacia y Parafarmacia (1.150€)
5. **agente-funerario-tanatopraxia.md** - Tanatoestética y Tanatopraxia
6. **auxiliar-veterinaria.md** - Auxiliar de Veterinaria

### **Ciclos Formativos Oficiales (Ministerio de Educación)**
7. **ciclo-formativo-grado-medio-farmacia-parafarmacia.md** - CFGM Técnico en Farmacia y Parafarmacia
8. **ciclo-formativo-grado-superior-higiene-bucodental.md** - CFGS Higiene Bucodental

### **Cursos Adicionales Extraídos**
9. **ayudante-tecnico-veterinario-atv.md** - Ayudante Técnico Veterinario (690€)
10. **quiromasaje-nivel-1.md** - Quiromasaje Nivel I (660€)
11. **quiromasaje-nivel-2.md** - Quiromasaje Nivel II Terapéutico y Deportivo (575€)
12. **auxiliar-odontologia-higiene-online.md** - Auxiliar de Odontología e Higiene Online
13. **auxiliar-optica-online.md** - Auxiliar de Óptica Online
14. **entrenador-personal.md** - Entrenador/a Personal (1.050€)
15. **instructor-yoga.md** - Instructor/a de Yoga (1.075€)
16. **dietetica-nutricion.md** - Dietética y Nutrición
17. **peluqueria-canina.md** - Peluquería Canina
18. **adiestramiento-canino-ii.md** - Adiestramiento Canino II
19. **tecnico-veterinario-felinos.md** - Técnico Veterinario en Felinos

## Categorías de Cursos

### **Sanidad**
- Auxiliar de Enfermería
- Auxiliar de Clínicas Estéticas
- Farmacia y Parafarmacia
- Auxiliar de Odontología e Higiene
- Auxiliar de Óptica
- Tanatoestética y Tanatopraxia

### **Veterinaria**
- Auxiliar de Veterinaria
- Ayudante Técnico Veterinario (ATV)
- Peluquería Canina
- Técnico Veterinario en Felinos

### **Adiestramiento**
- Adiestramiento Canino I
- Adiestramiento Canino II

### **Salud y Bienestar**
- Quiromasaje Nivel I
- Quiromasaje Nivel II
- Entrenador/a Personal
- Instructor/a de Yoga
- Dietética y Nutrición

### **Ciclos Formativos**
- CFGM Técnico en Farmacia y Parafarmacia (5.000€ sin financiación / 6.000€ con financiación)
- CFGS Higiene Bucodental (5.000€ sin financiación / 6.000€ con financiación)

## Información de Precios Extraída

| Curso | Precio Total | Modalidad de Pago |
|-------|--------------|-------------------|
| Adiestramiento Canino I | 660€ | 6 cuotas 85€ + 150€ matrícula |
| Auxiliar Clínicas Estéticas | 1.250€ | 10 cuotas 110€ + 150€ matrícula |
| Auxiliar de Enfermería | 1.150€ | 10 cuotas 100€ + 150€ matrícula |
| Farmacia y Parafarmacia | 1.150€ | 10 cuotas 100€ + 150€ matrícula |
| ATV | 690€ | 6 cuotas 90€ + 150€ matrícula |
| Quiromasaje Nivel I | 660€ | 6 cuotas 85€ + 150€ matrícula |
| Quiromasaje Nivel II | 575€ | 5 cuotas 85€ + 150€ matrícula |
| Entrenador Personal | 1.050€ | 10 cuotas 90€ + 150€ matrícula |
| Instructor de Yoga | 1.075€ | 10 cuotas 90€ + 175€ matrícula |
| **CFGM Farmacia y Parafarmacia** | **5.000€ / 6.000€** | **Sin financiación / Con financiación** |
| **CFGS Higiene Bucodental** | **5.000€ / 6.000€** | **Sin financiación / Con financiación** |

## Modalidades Disponibles

- **Presencial**: Mayoría de cursos
- **Online**: Auxiliar de Odontología, Auxiliar de Óptica
- **Semipresencial**: Ciclos Formativos (1 día por semana)
- **Híbrido**: Algunos cursos ofrecen ambas modalidades

## Información Detallada de Financiación - Ciclos Formativos

### **Modalidades de Pago Ciclos Formativos:**

#### **OPCIÓN 1: SIN FINANCIACIÓN**
- **Precio**: 5.000€ total
- **Desglose**: 200€ matrícula + 4.800€ curso
- **Ventaja**: Ahorro de 1.000€

#### **OPCIÓN 2: CON FINANCIACIÓN**
- **Precio**: 6.000€ total
- **Desglose**: 200€ matrícula + 30 cuotas de 160€
- **Distribución**: 10 cuotas por año académico durante 3 años
- **Ventaja**: Pago fraccionado cómodo

### **Detalles Operativos:**
- **Reserva de plaza**: Matrícula de 200€
- **Duración**: 3 cursos escolares (septiembre a junio cada año)
- **Modalidad**: Semipresencial (1 día por semana)
- **Horarios**: Miércoles 17:00-21:00h (Higiene Bucodental) / Jueves 17:00-21:00h (Farmacia)
- **Becas**: Disponibles becas del Ministerio de Educación
- **Titulación**: Oficial homologada por el MEC

## Certificaciones Especiales

- **Ciclos Formativos**: Títulos oficiales del Ministerio de Educación
- **Instructor de Yoga**: Certificación European Yoga Alliance (ELLA)
- **Cursos Online**: Doble titulación (centro + plataforma)

## Características Comunes

- **Grupos reducidos** en todos los cursos
- **Prácticas en empresas** incluidas
- **Agencia de colocación oficial** en la mayoría
- **Profesorado con experiencia** profesional y docente
- **Pago fraccionado** disponible
- **Requisitos mínimos**: 2º ESO o EGB (salvo Ciclos Formativos)

## Uso de la Información

Esta información puede utilizarse para:

1. **Poblar landing pages** automáticamente
2. **Crear comparativas** de cursos
3. **Generar contenido SEO** optimizado
4. **Desarrollar formularios** de inscripción
5. **Crear campañas publicitarias** segmentadas
6. **Backup de contenido** ante posibles pérdidas

## Fecha de Extracción

**2 de enero de 2025** - Información actualizada de www.cursostenerife.es

---

**Nota**: Esta información se mantiene como respaldo y referencia. Para precios y condiciones actualizadas, siempre consultar la web oficial de cursostenerife.es. 