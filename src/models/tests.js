const {pool: poolmysql} = require("../config/database-mysql");
const {pool} = require("../config/database");

// Otras consultas con postgres y mysql

// inner join entre users y posts

getUsersWithRoles = async () => {

    // Con postgres
    // const query = `SELECT * FROM modules INNER JOIN languages ON modules.id_language = languages.id 
    //     WHERE modules.id = $1`;
    // const { rows } = await pool.query(query, [1]);
    // console.log(rows);
  
    // Con mysql
    // const query = "SELECT *, roles.name as role_name FROM users INNER JOIN roles ON users.role_id = roles.id";
    // const [rows] = await poolmysql.query(query);
    // console.log(rows);
  };

getUsersWithRoles();