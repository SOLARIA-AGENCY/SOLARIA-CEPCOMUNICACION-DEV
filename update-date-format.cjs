const fs = require('fs');
const path = require('path');

// Mapeo de meses
const meses = {
  '01': 'ENERO',
  '02': 'FEBRERO', 
  '03': 'MARZO',
  '04': 'ABRIL',
  '05': 'MAYO',
  '06': 'JUNIO',
  '07': 'JULIO',
  '08': 'AGOSTO',
  '09': 'SEPTIEMBRE',
  '10': 'OCTUBRE',
  '11': 'NOVIEMBRE',
  '12': 'DICIEMBRE'
};

// Función para convertir fecha
function convertirFecha(fechaOriginal) {
  // Buscar patrón: "Inicio DD/MM/YYYY - Día HH:MM-HH:MMH"
  const regex = /Inicio (\d{2})\/(\d{2})\/(\d{4}) - \w+ \d{2}:\d{2}-\d{2}:\d{2}H/;
  const match = fechaOriginal.match(regex);
  
  if (match) {
    const [, dia, mes, año] = match;
    const mesTexto = meses[mes];
    return `INICIO ${dia} ${mesTexto} ${año}`;
  }
  
  return fechaOriginal; // Si no coincide, devolver original
}

// Leer el archivo JSON
const filePath = path.join(__dirname, 'src/config/data/base-cursos.json');
const data = fs.readFileSync(filePath, 'utf8');

// Convertir todas las fechas
const updatedData = data.replace(
  /"Inicio \d{2}\/\d{2}\/\d{4} - \w+ \d{2}:\d{2}-\d{2}:\d{2}H"/g,
  (match) => {
    const fechaSinComillas = match.slice(1, -1); // Quitar comillas
    const fechaConvertida = convertirFecha(fechaSinComillas);
    return `"${fechaConvertida}"`;
  }
);

// Escribir el archivo actualizado
fs.writeFileSync(filePath, updatedData, 'utf8');

console.log('✅ Fechas actualizadas correctamente en base-cursos.json');
console.log('Formato cambiado de "Inicio DD/MM/YYYY - Día HH:MM-HH:MMH" a "INICIO DD MES YYYY"');