import pool from "../../db/config.js";

export const getVentas = async () => {
  const sqlQuery = 'SELECT * FROM VENTAS'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getVenta = async (id) => {
  const SQLquery = {
    text: 'SELECT * FROM VENTAS WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
};

export const createVentaModel = async (cliente_id, total , fecha , estado) => {
  const SQLquery = {
    text: 'INSERT INTO VENTAS (cliente_id, total , fecha , estado) VALUES ($1, $2, $3, $4 ) RETURNING *',
    values: [cliente_id, Number(total) , fecha , estado]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const setVentaModel = async (cliente_id, total , fecha , estado, id) => {
  const SQLquery = {
    text: 'UPDATE VENTAS SET cliente_id = $1, total = $2, fecha = $3, estado = $4 WHERE id = $5 RETURNING *',
    values: [cliente_id, Number(total) , fecha , estado, id]
  }
  try {
    const response = await pool.query(SQLquery)
    return response.rows[0]
  } catch (error) {
    console.log(error)
  }
}

export const deleteVentaModel = async (id) => {
  const SQLquery = {
    text: 'DELETE FROM VENTAS WHERE id = $1',
    values: [id]
  }
  const result = await pool.query(SQLquery)
  return result.rowCount
}