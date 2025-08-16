import { getCategoriasModel, getCategoriaModel } from "../models/categoria.model.js";

export const readCategorias = async (req, res) => {
  try {
    const categorias = await getCategoriasModel()
    res.status(200).json({ categorias })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const readCategoria = async (req, res) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({ error: 'Categoria ID es requerido' })
    }
    const categoria = await getCategoriaModel(id)
    res
      .status(!categoria ? 404 : 200)
      .json(!categoria ? { error: 'Categoria no encontrada' } : { categoria })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

