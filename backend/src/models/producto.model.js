import pool from "../../db/config.js";

export const getProductos = async () => {
  const sqlQuery = 'SELECT * FROM PRODUCTOS'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getProducto = async (id) => {
  const SQLquery = {
    text: 'SELECT * FROM PRODUCTOS WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(sqlQuery)
  return response.rows[0]
};


