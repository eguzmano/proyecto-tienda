import pool from "../../db/config.js";

export const getCategoriasModel = async () => {
  const sqlQuery = 'SELECT * FROM CATEGORIAS'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getCategoriaModel = async (id) => {
  const sqlQuery = {
    text: 'SELECT * FROM CATEGORIAS WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(sqlQuery)
  return response.rows[0]
};