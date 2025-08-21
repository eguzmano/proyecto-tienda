import pool from "../../db/config.js";

export const getDetalle_Detalle_Ventas = async () => {
  const sqlQuery = 'SELECT * FROM detalle_venta'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getDetalle_Ventas = async (id) => {
  const SQLquery = {
    text: 'SELECT * FROM detalle_venta WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
};

export const createDetalle_VentasModel = async (venta_id, producto_id , cantidad , precio_unitario) => {
  const SQLquery = {
    text: 'INSERT INTO detalle_venta (venta_id, producto_id , cantidad , precio_unitario) VALUES ($1, $2, $3, $4 ) RETURNING *',
    values: [venta_id, producto_id , Number(cantidad) , Number(precio_unitario)]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const setDetalle_VentasModel = async (venta_id, producto_id , cantidad , precio_unitario, id) => {
  const SQLquery = {
    text: 'UPDATE detalle_venta SET cliente_id = $1, total = $2, fecha = $3, estado = $4 WHERE id = $5 RETURNING *',
    values: [venta_id, producto_id , Number(cantidad) , Number(precio_unitario), id]
  }
  try {
    const response = await pool.query(SQLquery)
    return response.rows[0]
  } catch (error) {
    console.log(error)
  }
}

export const deleteDetalle_VentasModel = async (id) => {
  const SQLquery = {
    text: 'DELETE FROM detalle_venta WHERE id = $1',
    values: [id]
  }
  const result = await pool.query(SQLquery)
  return result.rowCount
}