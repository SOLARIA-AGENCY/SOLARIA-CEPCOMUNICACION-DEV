// /api/get-analytics.ts
// Este es un endpoint de API simulado (mock) para el desarrollo del dashboard.
// En un entorno de producción, este endpoint debería:
// 1. Autenticarse de forma segura con la API de Google Analytics Data.
// 2. Utilizar credenciales de servicio almacenadas como variables de entorno seguras.
// 3. Realizar una llamada real a la API para obtener las métricas.
// 4. Incluir un manejo de errores robusto.

// Definimos la interfaz de respuesta para la API de Vercel
interface VercelResponse {
  statusCode?: number;
  setHeader(name: string, value: string | string[]): void;
  end(body: string): void;
}

export default function handler(res: VercelResponse) {
  // Simulación de una pequeña demora de la red
  setTimeout(() => {
    // Datos simulados que imitan una respuesta real de la API de Google Analytics
    const mockAnalyticsData = {
      users: "1.2K",
      sessions: "1.5K",
      engagementRate: "75.3%",
      activeUsers: "15",
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // O restringir al dominio de la app
    res.statusCode = 200;
    res.end(JSON.stringify(mockAnalyticsData));
  }, 500); // 500ms de retraso
} 