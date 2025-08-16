import pool from "../../db/config.js";

export const getCarroModel = async (clienteId) => {
    const sqlQuery = {
        text: "SELECT * FROM carros WHERE cliente_id = $1",
        values: [clienteId]
    };
    const response = await pool.query(sqlQuery);
    return response.rows;
};

// Agregar item al carro
export const addItemCarroModel = async (clienteId, productoId, cantidad) => {
    const sqlQuery = {
        text: "INSERT INTO carros (cliente_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *",
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