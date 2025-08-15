import { createProductoModel, getProducto, getProductos, setProductoModel } from "../models/producto.model.js";

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
      .status(!producto ? 404 : 200)
      .json(!producto ? { error: 'Producto no encontrado' } : { producto })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const createProducto = async (req, res) => {
  try {
    const { 
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id
     } = req.body

    const newProducto = await createProductoModel(nombre, descripcion, precio, stock, imagen_url, categoria_id)
    res.status(201).json({ Producto: newProducto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const setProducto = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id
     } = req.body
    const producto = await setProductoModel({
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id,
      id
    })
    res.status(201).json({ producto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
