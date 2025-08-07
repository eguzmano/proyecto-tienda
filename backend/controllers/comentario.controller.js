import { comentarioModel } from "../models/comentarios.model.js";

const readComentarios = async (req, res) => {
  const comentarios = await comentarioModel.getComentarios();
  res.json(comentarios);
};

const readComentario = async (req, res) => {
  const { id } = req.params;
  const comentario = await pro.getComentario(id.toLowerCase());
  if (!comentario) {
    return res.status(404).json({ message: "Comentario not found" });
  }
  res.json(comentario);
};

export const comentarioController = {
  readComentarios,
  readComentario,
};