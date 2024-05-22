const { pool } = require('../config/database');
const { pool: poolmysql } = require('../config/database-mysql');

exports.getAll = async () => {
  const query = `SELECT * FROM users`;
  const { rows } = await pool.query(query);
  return rows;
}

exports.save = async (username, email, hashedPassword) => {

  // con postgres
  const query = `INSERT INTO users (username, email, password)
                 VALUES ($1, $2, $3)
                 RETURNING id, username, email`;
  const values = [username, email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];

  // Con mysql
  // const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  // const values = [username, email, hashedPassword];
  // try {
  //   // Ejecuta la consulta usando el pool
  //   const [resp] = await poolmysql.query(query, values);
  //   console.log('Resultados de la consulta:', resp.insertId);
  //   return {
  //     id: resp.insertId,
  //     username,
  //     email
  //   };
  // } catch (err) {
  //   // Maneja el error adecuadamente
  //   console.error('Error ejecutando la consulta:', err);
  //   throw err;
  // }
};

exports.update = async (id, data) => {
  const query = `UPDATE users
                 SET username = $1, email = $2, password = $3
                 WHERE id = $4
                 RETURNING id, username, email`;
  const values = [data.username, data.email, data.password, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

exports.delete = async (id) => {
  const query = `DELETE FROM users WHERE id = $1`;
  await pool.query(query, [id]);
};

exports.findByEmail = async (email) => {
  // Con postgres
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];

  // Con mysql
  // const query = `SELECT * FROM users WHERE email = ?`;
  // const [rows] = await poolmysql.query(query, [email]);
  // return rows[0];
};

exports.findById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  // TODO: handle case
  return rows[0];
};
