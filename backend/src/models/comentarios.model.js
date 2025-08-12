import { readFile } from "node:fs/promises";

const getComentarios = async () => {
  const data = await readFile("db/comentarios.json", "utf-8");
  return JSON.parse(data);
};

const getComentario = async (id) => {
  const comentario = await getComentarios();
  return comentario.find((muebles) => muebles.id === id);
};

export const comentarioModel = {
  getComentarios,
  getComentario,
};
