const { pool } = require('../config/database');

exports.getAll = async () => {
  const query = `SELECT * FROM routes`;
  const { rows } = await pool.query(query);
  return rows;
}

exports.save = async (name, description, content = {}) => {
  const query = `INSERT INTO routes (name, description, content)
                 VALUES ($1, $2, $3)
                 RETURNING id, name, content`;
  const values = [name, description, JSON.stringify(content)];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.findById = async (id) => {
  const query = `SELECT * FROM routes WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
