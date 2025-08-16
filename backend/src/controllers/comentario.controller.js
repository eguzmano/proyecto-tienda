import { getComentariosModel, createComentarioModel, getComentariosPorProductoModel } from "../../src/models/comentarios.model.js";

export const readComentarios = async (req, res) => {
  try {
    const comentarios = await getComentariosModel()
    res.status(200).json({ comentarios })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const getComentariosDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).json({ message: "productoId inválido" });
    }

    const comentarios = await getComentariosPorProductoModel(idNum);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

export const createComentario = async (req, res) => {
  try {
    const { 
      cliente_id,
      producto_id,
      comentario,
      calificacion
     } = req.body

    const newComentario = await createComentarioModel(cliente_id, producto_id, comentario, calificacion)
    res.status(201).json({ Producto: newComentario })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
