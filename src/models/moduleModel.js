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

// exports.update = async (id, data) => {
//   const query = `UPDATE users
//                  SET username = $1, email = $2, password = $3
//                  WHERE id = $4
//                  RETURNING id, username, email`;
//   const values = [data.username, data.email, data.password, id];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// }

// exports.delete = async (id) => {
//   const query = `DELETE FROM users WHERE id = $1`;
//   await pool.query(query, [id]);
// };

// exports.findByEmail = async (email) => {
//   const query = `SELECT * FROM users WHERE email = $1`;
//   const { rows } = await pool.query(query, [email]);
//   return rows[0];
// };

// exports.findById = async (id) => {
//   const query = `SELECT * FROM users WHERE id = $1`;
//   const { rows } = await pool.query(query, [id]);
//   // TODO: handle case
//   return rows[0];
// };
