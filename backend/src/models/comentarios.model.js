
import pool from "../../db/config.js";

export const getComentariosModel = async () => {
  const sqlQuery = 'SELECT * FROM COMENTARIOS'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getComentariosPorProductoModel = async (productoId) => {
  const sql = {
    text: "SELECT * FROM comentarios WHERE producto_id = $1 ORDER BY fecha DESC, id DESC",
    values: [productoId]
  };
  const response = await pool.query(sql);
  return response.rows; 
};

export const createComentarioModel = async (cliente_id, producto_id, comentario, calificacion, fecha) => {
  const SQLquery = {
     text: `
      INSERT INTO comentarios (cliente_id, producto_id, comentario, calificacion)
      VALUES ($1, $2, $3, $4)
      RETURNING id, cliente_id, producto_id, comentario, calificacion, fecha
    `,
    values: [cliente_id, producto_id, comentario, calificacion]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}
