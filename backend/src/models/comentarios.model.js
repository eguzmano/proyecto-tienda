
import pool from "../../db/config.js";

export const getComentariosModel = async () => {
  const sqlQuery = 'SELECT * FROM COMENTARIOS'
  const response = await pool.query(sqlQuery)
  return response.rows
};

export const getComentarioModel = async (id) => {
  const sqlQuery = {
    text: 'SELECT * FROM COMENTARIOS WHERE id=$1',
    values: [id]
  }
  const response = await pool.query(sqlQuery)
  return response.rows[0]
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
