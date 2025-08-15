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
  const response = await pool.query(SQLquery)
  return response.rows[0]
};

export const createProductoModel = async (nombre, descripcion , precio , stock, imagen_url, categoria_id, creado_en) => {
  const SQLquery = {
    text: 'INSERT INTO PRODUCTOS (nombre,  descripcion , precio , stock, imagen_url, categoria_id, creado_en) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
    values: [nombre, descripcion , Number(precio) , Number(stock), imagen_url, categoria_id]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const setProductoModel = async ({ nombre, descripcion , precio , stock, imagen_url, categoria_id, id }) => {
  const SQLquery = {
    text: 'UPDATE PRODUCTOS SET nombre = $1, descripcion = $2, precio = $3, stock = $4,  imagen_url= $5, categoria_id = $6 WHERE id = $7 RETURNING *',
    values: [nombre, descripcion , Number(precio) , Number(stock), imagen_url, categoria_id, id]
  }
  try {
    const response = await pool.query(SQLquery)
    return response.rows[0]
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductoModel = async (id) => {
  const SQLquery = {
    text: 'DELETE FROM PRODUCTOS WHERE id = $1',
    values: [id]
  }
  
  const result = await pool.query(SQLquery)
  return result.rowCount
}