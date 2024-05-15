const { pool } = require('../config/database');

exports.getAll = async () => {
    const query = `SELECT * FROM challenges`;
    const { rows } = await pool.query(query);
    return rows;
  }