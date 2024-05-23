const { pool } = require('../config/database');

exports.getAll = async () => {
    const query = `SELECT * FROM challenges`;
    const { rows } = await pool.query(query);
    return rows;
}

exports.save = async (name, description, id_language, content = {}) => {
    const query = `INSERT INTO challenges (name, description, id_section, content)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, name, description, id_seccion, content`;
    const values = [name, description, id_language, JSON.stringify(content)];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

exports.findById = async (id) => {
    const query = `SELECT * FROM challenges WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

exports.findByRouteId = async (id_route) => {
    const query = `SELECT * FROM challenges WHERE id_seccion = $1`;
    const { rows } = await pool.query(query, [id_language]);
    return rows;
}