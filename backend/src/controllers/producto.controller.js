import { createProductoModel, deleteProductoModel, getProducto, getProductos, setProductoModel } from "../models/producto.model.js";

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

// controller
export const deleteProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const rowCount = await deleteProductoModel(id);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Éxito: sin contenido
    return res.status(204).send();
  } catch (error) {
    // FK constraint -> hay registros asociados (comentarios, ventas, etc.)
    if (error.code === '23503') {
      return res.status(409).json({
        error: 'No se puede eliminar el producto porque tiene registros asociados.'
      });
    }
    return res.status(500).json({ error: 'Error al procesar la solicitud', detail: error.message });
  }
};
