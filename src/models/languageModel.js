const { pool } = require('../config/database');

exports.getAll = async () => {
  const query = `SELECT * FROM languages`;
  const { rows } = await pool.query(query);
  return rows;
}

exports.save = async (name, description, id_language, content = {}) => {
  const query = `INSERT INTO languages (name, description, id_route, content)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, name, description, id_route, content`;
  const values = [name, description, id_language, JSON.stringify(content)];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.findById = async (id) => {
  const query = `SELECT * FROM languages WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  // TODO: handle case
  return rows[0];
};

exports.findByRouteId = async (id_route) => {
  const query = `SELECT * FROM languages WHERE id_route = $1`;
  const { rows } = await pool.query(query, [id_language]);
  return rows;
}