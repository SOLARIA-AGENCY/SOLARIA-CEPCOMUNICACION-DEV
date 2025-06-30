# Credenciales de Seguimiento Web - CEP Formación

Este documento centraliza todas las credenciales y IDs de los servicios de seguimiento y analítica web implementados en el sitio de CEP Formación.

## Google Tag Manager (GTM)

- **Nombre del Contenedor**: CEP Formación
- **ID del Contenedor**: `GTM-5D4839F3`
- **Implementación**: El script de GTM se carga en el `<head>` del archivo `index.html`. El fragmento `<noscript>` se encuentra justo después de la apertura del `<body>`.
- **Estado**: **ACTIVO** y gestionado a través del banner de consentimiento de cookies.

---

## Facebook Pixel

- **Nombre del Pixel**: CEP COMUNICACION Pixel Solaria Agency
- **ID del Pixel**: `1189071876088388`
- **Propietario**: Solaria Agency
- **Implementación**: El código base del Pixel se carga en el `<head>` del archivo `index.html`, inicializándose después de que el usuario otorga su consentimiento a través del banner de cookies.
- **Estado**: **ACTIVO** y condicionado al consentimiento del usuario.

---

## Google Analytics (GA4)

- **ID de Medición**: `G-347NGFNZ90`
- **Implementación**: Integrado a través de Google Tag Manager y directamente en `index.html` con modo de consentimiento.
- **Estado**: **ACTIVO**.

## Notas de Implementación

- **Consentimiento**: Todos los scripts de seguimiento (GTM, FB Pixel, GA4) están gobernados por un banner de consentimiento de cookies. No se activan hasta que el usuario otorga el permiso explícito.
- **Archivo de Configuración**: `index.html`
- **Dashboard Técnico**: El estado de estos servicios se puede visualizar en la página `SolariaStatusPage`. 