const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // e.g., 'localhost' or 'your-database-host'
  user: 'root', // e.g., 'root'
  password: '',
  database: 'olp-rirtchie'
});

// Verificar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    console.error('Error connecting to the database:', err);
    return;
  }

  if (connection) connection.release();

  console.log('Connected to the MySQL database.');

  return;
});

module.exports = pool;
