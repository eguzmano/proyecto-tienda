import { createClienteModel, findClienteByEmailModel } from "../models/clientes.model.js";
import jwt from 'jsonwebtoken'


export const registerCliente = async (req, res) => {
  try {
    const { nombre, email, password, direccion, telefono } = req.body
    const user = await createClienteModel(nombre, email, password, direccion, telefono)
    // user debería traer al menos { id, nombre, email, rol_id }

    // Genera token con email (y/o id)
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    // Devuelve solo lo necesario para el front
    return res.status(201).json({
      token,
      email: user.email,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol_id: user.rol_id
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al registrar usuario' })
  }
}
export const getClienteProfile = async (req, res) => {
  try {
    const email = req.user
    const user = await findClienteByEmailModel(email)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol_id: user.rol_id,
      direccion: user.direccion,
      telefono: user.telefono
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const registerAdmin = async (req, res) => {
  try {
    const { nombre, email, password, direccion, telefono } = req.body;

    const user = await createClienteModel(nombre, email, password, direccion, telefono, 2); // rol_id = 2

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      token,
      email: user.email,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol_id: user.rol_id
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al registrar admin' });
  }
};
