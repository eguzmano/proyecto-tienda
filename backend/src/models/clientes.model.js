import { readFile, writeFile } from "node:fs/promises";
import pool from "../../db/config.js";
import bcrypt from 'bcryptjs'


export const createClienteModel = async (nombre, email, contraseña, direccion, telefono, rol_id = 1) => {
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const SQLquery = {
    text: `
      INSERT INTO clientes (nombre, email, password, direccion, telefono, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nombre, email, rol_id, creado_en
    `,
    values: [nombre, email, hashedPassword, direccion, telefono, rol_id],
  };

    const response = await pool.query(SQLquery);
    return response.rows[0];
};

export const findClienteByEmailModel = async (email) => {
    const SQLquery = {
        text: 'SELECT * FROM clientes WHERE email= $1',
        values:[email]
    }
    const response = await pool.query(SQLquery);
    return response.rows[0];
}

export const deleteClienteModel = async (id) => {
  const SQLquery = {
    text: 'DELETE FROM CLIENTES WHERE id = $1',
    values: [id]
  }
  const result = await pool.query(SQLquery)
  return result.rowCount
}