import pool from "../../db/config.js";

export const getFavoritosClienteModel = async (cliente_id) => {
  const SQLquery = {
    text: "SELECT * FROM favoritos WHERE cliente_id = $1 ORDER BY id DESC",
    values: [cliente_id]
  };
  const response = await pool.query(SQLquery);
  return response.rows; 
};

export const addFavoritosClienteModel = async (cliente_id, producto_id) => {
  const SQLquery = {
     text: `
      INSERT INTO favoritos (cliente_id, producto_id)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [cliente_id, producto_id]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const deleteFavoritoModel = async (id) => {
  const SQLquery = {
    text: 'DELETE FROM favoritos WHERE id = $1',
    values: [id]
  }
  const response = await pool.query(SQLquery)
  return response.rows; 
}
