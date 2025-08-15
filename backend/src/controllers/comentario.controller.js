import { getComentariosModel, getComentarioModel, createComentarioModel } from "../../src/models/comentarios.model.js";

export const readComentarios = async (req, res) => {
  try {
    const comentarios = await getComentariosModel()
    res.status(200).json({ comentarios })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const readComentario = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'Comentario ID es requerido' })
    }
    const comentario = await getComentarioModel(id)
    res
      .status(!comentario ? 404 : 200)
      .json(!comentario ? { error: 'Comentario no encontrada' } : { comentario })

  } catch (error) {
    res.status(500).json({ error: error.message })
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
