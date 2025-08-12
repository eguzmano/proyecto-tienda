import { readFile } from "node:fs/promises";
import pool from "../../db/config.js";




const getProductos = async () => {
  const sqlQuery = 'SELECT * FROM PRODUCTOS'
    const response = await pool.query(sqlQuery)
    return response.rows
};

const getProducto = async (id) => {
  const muebles = await getProductos();
  return muebles.find((muebles) => muebles.id === id);
};

export const productoModel = {
  getProductos,
  getProducto,
};
