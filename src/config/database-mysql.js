const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost', // e.g., 'localhost' or 'your-database-host'
  port: 3306, // Port MySQL
  user: 'root', // e.g., 'root'
  password: '',
  database: 'olp-rirtchie'
});

module.exports = { pool };
