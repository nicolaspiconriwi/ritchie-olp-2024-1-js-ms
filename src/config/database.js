const { Pool } = require('pg');

// Verifica si la variable de entorno DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

// Crea una nueva instancia de Pool con la cadena de conexión a la base de datos
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Exporta el pool para que pueda ser utilizado en otros archivos
module.exports = { pool };

/**
 * Que es POOL?
 * 
 * Pool es una clase que nos permite conectarnos a una base de datos de PostgreSQL.
 * El concepto de Pool significa que se crean varias conexiones a la base de datos y se
 * reutilizan en lugar de crear una nueva conexión cada vez que se necesita una. Esto
 * mejora el rendimiento de la aplicación al evitar la sobrecarga de crear y cerrar
 * conexiones a la base de datos.
 * 
 * Caso de uso:
 * 
 * En una aplicación web, cada vez que un usuario realiza una solicitud al servidor, se
 * necesita una conexión a la base de datos para recuperar o almacenar datos. Si se
 * creara una nueva conexión a la base de datos cada vez que un usuario realiza una
 * solicitud, la aplicación se volvería lenta y podría no escalar bien.
 * 
 * En cambio, si se utiliza un Pool, se pueden reutilizar las conexiones a la base de
 * datos y se pueden manejar múltiples solicitudes de manera eficiente. Esto mejora el
 * rendimiento de la aplicación y permite que maneje un mayor número de usuarios
 * simultáneamente.
 */