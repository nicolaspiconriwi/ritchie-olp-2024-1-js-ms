const { pool } = require('../config/database');

exports.getAll = async () => {
  const query = `SELECT * FROM modules`;
  const { rows } = await pool.query(query);
  return rows;
}

exports.save = async (name, description, id_language, content = {}) => {
  const query = `INSERT INTO modules (name, description, id_language, content)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, name, description, id_language, content`;
  const values = [name, description, id_language, JSON.stringify(content)];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.findById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  // TODO: handle case
  return rows[0];
};

exports.findByLanguageId = async (id_language) => {
  const query = `SELECT * FROM modules WHERE id_language = $1`;
  const { rows } = await pool.query(query, [id_language]);
  return rows;
}