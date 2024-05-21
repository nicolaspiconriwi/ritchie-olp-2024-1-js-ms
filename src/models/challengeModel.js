const { pool } = require('../config/database');

exports.save = async ({ title, content, description }) => {
  const query = `INSERT INTO challenges (title, content, description)
                 VALUES ($1, $2, $3)
                 RETURNING id, title, content, description`;
  // turn content to json
  const values = [title, JSON.stringify(content), description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getAll = async () => {
  const query = `SELECT id, title, content, description FROM challenges`;
  const { rows } = await pool.query(query);
  return rows;
}

exports.getById = async (id) => {
  const query = `SELECT id, title, content, description FROM challenges WHERE id = $1`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

/**
 * JSON.stringify({content}) is used to store the content as a JSON string in the database.
 * JSON.parse(content) is used to parse the content from the database into a JavaScript object.
 */