const { Pool } = require('pg');

// Verifica si la variable de entorno DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

// Extrae los parámetros adicionales de la URL para configurar correctamente SSL
const params = new URL(process.env.DATABASE_URL);

const ssl = params.searchParams.get('sslmode') === 'require';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: ssl ? { rejectUnauthorized: false } : false,
});

module.exports = { pool };
