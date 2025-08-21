import { getDetalleVenta,getDetalleVentas, createDetalleVentasModel, setDetalleVentasModel, deleteDetalleVentasModel } from "../models/detalle_venta.model.js";


// SOLO ADMINS
export const readDetalleVentas = async (req, res) => {
  try {
    const productos = await getDetalleVentas()
    res.status(200).json({ productos })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const readDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({ error: 'Detalle de venta ID es requerido' })
    }
    const producto = await getDetalleVenta(id)
    res
      .status(!producto ? 404 : 200)
      .json(!producto ? { error: 'Detalle de venta no encontrado' } : { producto })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const createDetalleVenta = async (req, res) => {
  try {
    const { 
      venta_id,
      producto_id,
      cantidad,
      precio_unitario
     } = req.body

    const newDetalleVenta = await createDetalleVentasModel(venta_id, producto_id, cantidad, precio_unitario)
    res.status(201).json({ Producto: newProducto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/*
Esto por si se llegara a ocupar mas adelante

export const setProducto = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      venta_id,
      producto_id,
      cantidad,
      precio_unitario
     } = req.body
    const detalleVenta = await setProductoModel({
      venta_id,
      producto_id,
      cantidad,
      precio_unitario,
      id
    })
    res.status(201).json({ detalleVenta })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// controller
export const deleteDetalleVenta = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const rowCount = await deleteDetalleVentasModel(id);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Detalle de Venta no encontrado' });
    }

    // Éxito: sin contenido
    return res.status(204).send();
  } catch (error) {
    // FK constraint -> hay registros asociados (comentarios, ventas, etc.)
    if (error.code === '23503') {
      return res.status(409).json({
        error: 'No se puede eliminar el Detalle de Venta porque tiene registros asociados.'
      });
    }
    return res.status(500).json({ error: 'Error al procesar la solicitud', detail: error.message });
  }
};
*/