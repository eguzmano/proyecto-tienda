import pool from "../../db/config.js";

export const getCarro = async () => {
  const sqlQuery = {
    text: 'SELECT * FROM CATEGORIAS WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(sqlQuery)
  return response.rows[0]
};

