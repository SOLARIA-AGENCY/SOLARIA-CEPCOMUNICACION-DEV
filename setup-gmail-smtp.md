# Configuración Gmail SMTP para NodeMailer (Método Actualizado)

Google ha descontinuado el acceso a "aplicaciones menos seguras". El método correcto y seguro es usar una **Contraseña de Aplicación**.

## 📋 Pasos para configurar Contraseña de Aplicación en Gmail

### 1. Activar la Verificación en 2 Pasos (2FA)
- Es un requisito indispensable. Si aún no está activa, ve a [Seguridad de la Cuenta de Google](https://myaccount.google.com/security).
- En la sección "Cómo inicias sesión en Google", haz clic en **Verificación en 2 pasos** y sigue las instrucciones para activarla.

### 2. Generar una Contraseña de Aplicación
- Una vez activada la 2FA, vuelve a la página de [Seguridad de la Cuenta de Google](https://myaccount.google.com/security).
- Busca y haz clic en **Contraseñas de aplicaciones** (puede que necesites volver a introducir tu contraseña).
- En la sección "Seleccionar aplicación", elige **Correo**.
- En "Seleccionar dispositivo", elige **Otro (nombre personalizado)**.
- Asígnale un nombre descriptivo, por ejemplo: `NodeMailer CEP Web`.
- Haz clic en **Generar**.
- Se mostrará una contraseña de 16 caracteres en un recuadro amarillo. **Copia esta contraseña. No la podrás ver de nuevo.**

### 3. Actualizar el archivo `.env`
- Pega la contraseña de 16 caracteres que acabas de generar en tu archivo de entorno (por ejemplo, `.env.local` o `.env`).

```bash
# Reemplaza en tu archivo .env
GMAIL_EMAIL=tu_correo@gmail.com
GMAIL_APP_PASSWORD=aquí_la_contraseña_de_16_caracteres
```

### 4. Reiniciar servidor
```bash
# Terminar servidor actual (Ctrl+C)
node server-dev.js
```

## ✅ Verificación de funcionamiento

El servidor debe mostrar:
```
✅ Gmail SMTP configurado correctamente
📨 Endpoint Gmail/NodeMailer activo: http://localhost:3001/api/formsubmit-proxy
💼 Gmail configurado para CEP: cep.ocupados@gmail.com + cc: agency.solaria@gmail.com
```

## 🚨 Troubleshooting

### ¿No aparece la opción "Contraseñas de aplicaciones"?

Si has activado la Verificación en 2 Pasos pero no ves la opción para crear Contraseñas de Aplicaciones, puede deberse a una de estas razones (según la documentación de Google):

1.  **Tu cuenta usa una "Llave de acceso" (Passkey):** Como se ve en la captura de pantalla, si tienes una "Llave de acceso" configurada, Google deshabilita la opción de "Contraseñas de aplicaciones" por seguridad, incluso si tienes otros métodos de 2FA.
    *   **Solución Definitiva:** Debes **eliminar temporalmente la llave de acceso** de tu cuenta de Google. 
        1. Ve a [Llaves de acceso y llaves de seguridad](https://myaccount.google.com/signinoptions/passkeys).
        2. Elimina la llave de acceso existente.
        3. Vuelve a la sección de [Seguridad](https://myaccount.google.com/security) y la opción **"Contraseñas de aplicaciones" aparecerá inmediatamente**.
        4. Genera tu contraseña de aplicación siguiendo los pasos de esta guía.
        5. (Opcional pero recomendado) Una vez generada y guardada la contraseña, puedes volver a configurar tu llave de acceso si lo deseas.
2.  **Usas una cuenta de trabajo o centro educativo (Google Workspace):** El administrador de tu organización puede haber deshabilitado la creación de contraseñas de aplicación. En este caso, deberás contactar con tu administrador de TI.
3.  **Tienes activada la Protección Avanzada:** Este es un programa de seguridad de Google de muy alto nivel que restringe el acceso de la mayoría de aplicaciones de terceros y deshabilita las contraseñas de aplicación.

### Error "Invalid login"
- Verificar que 2FA esté activado.
- Asegurarse de usar la **Contraseña de Aplicación** de 16 caracteres, no la contraseña de la cuenta de Google.
- Verificar que no hay espacios al copiar/pegar la contraseña.

### Error "Less secure app access"
- No usar contraseña normal de Gmail
- Usar solo App Password generada

### Emails no llegan
- Verificar carpeta Spam en cep.ocupados@gmail.com
- Verificar que el dominio no esté bloqueado

## 📧 Flujo de Email Configurado

1. **Usuario envía formulario** → CEP website
2. **NodeMailer envía email** → cep.ocupados@gmail.com (principal)
3. **Copia automática** → agency.solaria@gmail.com (seguimiento)
4. **Fallback FormSubmit** → Si falla NodeMailer

## 🔒 Seguridad

- ✅ App Password es específica para esta aplicación
- ✅ No compromete la contraseña principal de Gmail
- ✅ Se puede revocar independientemente
- ✅ Comunicación encriptada SMTP/TLS