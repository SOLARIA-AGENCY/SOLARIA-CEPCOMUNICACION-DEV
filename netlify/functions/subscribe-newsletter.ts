import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const email = body.email;

    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Se requiere una dirección de correo electrónico válida.' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // Aquí iría la lógica para añadir el email a Mailchimp, una base de datos, etc.
    // Por ahora, simplemente devolvemos un éxito.
    console.log(`Correo recibido para suscripción: ${email}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: '¡Te has suscrito con éxito! Gracias por tu interés.' }),
      headers: { 'Content-Type': 'application/json' },
    };

  } catch (error) {
    console.error('Error en la función de suscripción:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler }; 