# Mapa Operativo - Campaña OTOÑO 2025 - CEP FORMACIÓN

## Objetivo
Estandarizar la nomenclatura, configuración y organización de los anuncios, formularios, listas de Mailchimp y landings de preinscripción para los 11 cursos confirmados de la campaña de otoño 2025, segmentados por sede geográfica.

---

## Listado Final de Cursos

| Curso                           | Sede Norte       | Sede Santa Cruz     |
|--------------------------------|------------------|---------------------|
| Adiestramiento Canino          | Septiembre 2025  | —                   |
| Agente Funerario               | —                | Septiembre 2025     |
| Aux. Clínico Veterinario (ACV) | Septiembre 2025  | Septiembre 2025     |
| Auxiliar Clínicas Estéticas    | —                | Octubre 2025        |
| Auxiliar de Enfermería         | Noviembre 2025   | Septiembre 2025     |
| Auxiliar Farmacia + Dermo      | Octubre 2025     | —                   |
| Auxiliar en Odontología        | Noviembre 2025   | Noviembre 2025      |
| Dietética y Nutrición          | Septiembre 2025  | —                   |
| Peluquería Canina y Felina     | Septiembre 2025  | Julio 2025          |
| Quiromasaje Nivel II           | Julio 2025       | —                   |

---

## Estructura Estandarizada de Activos

| Curso                           | Sede         | Anuncio Video (Reel)             | Formulario FB                    | Lista Mailchimp                      | Landing Preinscripción           |
|--------------------------------|--------------|----------------------------------|----------------------------------|--------------------------------------|----------------------------------|
| Adiestramiento Canino          | Norte        | Adiestramiento Canino - Norte    | Form Adiestramiento - Norte      | Lista: Adiestramiento Norte OTOÑO   | landing-adiestramiento-norte     |
| Agente Funerario               | Santa Cruz   | Agente Funerario - Santa Cruz    | Form Agente Funerario - SC       | Lista: Agente Funerario SC OTOÑO    | landing-agente-funerario-sc      |
| Aux. Clínico Veterinario       | Norte        | ACV - Norte                      | Form ACV - Norte                 | Lista: ACV Norte OTOÑO              | landing-acv-norte                |
| Aux. Clínico Veterinario       | Santa Cruz   | ACV - Santa Cruz                 | Form ACV - Santa Cruz            | Lista: ACV Santa Cruz OTOÑO         | landing-acv-santacruz            |
| Auxiliar Clínicas Estéticas    | Santa Cruz   | Clínicas Estéticas - Santa Cruz  | Form Clínicas Estéticas - SC     | Lista: Clínicas Estéticas SC OTOÑO  | landing-clinicas-esteticas-sc    |
| Auxiliar de Enfermería         | Norte        | Enfermería - Norte               | Form Enfermería - Norte          | Lista: Enfermería Norte OTOÑO       | landing-enfermeria-norte         |
| Auxiliar de Enfermería         | Santa Cruz   | Enfermería - Santa Cruz          | Form Enfermería - Santa Cruz     | Lista: Enfermería Santa Cruz OTOÑO  | landing-enfermeria-santacruz     |
| Auxiliar Farmacia + Dermo      | Norte        | Farmacia + Dermo - Norte         | Form Farmacia - Norte            | Lista: Farmacia Dermo Norte OTOÑO   | landing-farmacia-norte           |
| Auxiliar en Odontología        | Norte        | Odontología - Norte              | Form Odontología - Norte         | Lista: Odontología Norte OTOÑO      | landing-odontologia-norte        |
| Auxiliar en Odontología        | Santa Cruz   | Odontología - Santa Cruz         | Form Odontología - Santa Cruz    | Lista: Odontología Santa Cruz OTOÑO | landing-odontologia-santacruz    |
| Dietética y Nutrición          | Norte        | Dietética - Norte               | Form Dietética - Norte           | Lista: Dietética Norte OTOÑO        | landing-dietetica-norte          |
| Peluquería Canina y Felina     | Norte        | Peluquería Canina - Norte       | Form Peluquería - Norte          | Lista: Peluquería Norte OTOÑO       | landing-peluqueria-norte         |
| Peluquería Canina y Felina     | Santa Cruz   | Peluquería Canina - Santa Cruz  | Form Peluquería - Santa Cruz     | Lista: Peluquería Santa Cruz OTOÑO  | landing-peluqueria-santacruz     |
| Quiromasaje Nivel II           | Norte        | Quiromasaje II - Norte          | Form Quiromasaje II - Norte      | Lista: Quiromasaje II Norte OTOÑO   | landing-quiromasaje-norte        |

---

## Normas de Configuración

### Facebook Meta Ads
- **Nombre del conjunto:** `[CURSO] - [SEDE] - FB OTOÑO 2025`
- **Objetivo:** Generación de clientes potenciales
- **Optimizar por:** Envío del formulario
- **Pixel/Conversion API:** No usar (independencia operativa)

### Mailchimp
- Crear una **lista por curso y sede**
- Conectar cada formulario Meta al listado correspondiente
- Activar **secuencia de bienvenida** + seguimiento en cada lista

### n8n
- Crear un flujo maestro reutilizable por curso:
  - Ingesta desde formulario FB
  - Registro en hoja GSheet
  - Alta en lista Mailchimp
  - Envío de email + WhatsApp + asignación asesor

---

Este documento se mantendrá vivo y en actualización según evolucione la campaña.

