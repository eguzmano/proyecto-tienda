import { getProducto, getProductos } from "../models/producto.model.js";

export const readProductos = async (req, res) => {
  try {
    const productos = await getProductos()
    res.status(200).json({ productos })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const readProducto = async (req, res) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({ error: 'Producto ID es requerido' })
    }
    const producto = await getProducto(id)
    res
      .status(!travel ? 404 : 200)
      .json(!travel ? { error: 'Producto no encontrado' } : { producto })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

