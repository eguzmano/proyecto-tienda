import pool from "../../db/config.js";

export const getCarroModel = async (clienteId) => {
    const sqlQuery = {
        text: "SELECT * FROM carros WHERE cliente_id = $1",
        values: [clienteId]
    };
    const response = await pool.query(sqlQuery);
    return response.rows;
};

/**
 * Sube o baja la cantidad de un item del carro.
 * - Si no existe y delta > 0: lo crea con esa cantidad.
 * - Si la cantidad queda <= 0: se elimina la fila.
 * Devuelve el item actualizado, o null si se eliminó/no existe.
 */
export const patchCarroItem = async (clienteId, productoId, delta = 1) => {
  // 1) intento actualizar si ya existe
  const upd = await pool.query(
    `UPDATE carros
        SET cantidad = cantidad + $3
      WHERE cliente_id = $1 AND producto_id = $2
      RETURNING *;`,
    [clienteId, productoId, delta]
  );

  if (upd.rowCount > 0) {
    const item = upd.rows[0];
    if (Number(item.cantidad) <= 0) {
      await pool.query(
        `DELETE FROM carros WHERE cliente_id = $1 AND producto_id = $2`,
        [clienteId, productoId]
      );
      return null; // quedó en 0 → lo eliminamos
    }
    return item; // actualizado
  }

  // 2) si no existía y delta > 0, lo creamos
  if (delta > 0) {
    const ins = await pool.query(
      `INSERT INTO carros (cliente_id, producto_id, cantidad)
       VALUES ($1,$2,$3)
       RETURNING *;`,
      [clienteId, productoId, delta]
    );
    return ins.rows[0];
  }

  // 3) si no existía y delta <= 0, no hay nada que hacer
  return null;
};

// Agregar item al carro
export const addItemCarroModel = async (clienteId, productoId, cantidad) => {
    const sqlQuery = {
        text: `INSERT INTO carros (cliente_id, producto_id, cantidad) 
               VALUES ($1, $2, $3)
               ON CONFLICT (cliente_id, producto_id)
               DO UPDATE SET cantidad = carros.cantidad + EXCLUDED.cantidad
               RETURNING *`,
        values: [clienteId, productoId, cantidad]
    };
    const response = await pool.query(sqlQuery)
    return response.rows[0]
};

// Eliminar item del carro
export const deleteItemCarroModel = async (clienteId, productoId) => {
    const sqlQuery = {
        text: "DELETE FROM carros WHERE cliente_id = $1 AND producto_id = $2 RETURNING *",
        values: [clienteId, productoId]
    };
    const response = await pool.query(sqlQuery)
    return response.rows[0]
};