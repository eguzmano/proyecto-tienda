import { createVentaModel, getVenta, getVentas, setVentaModel, deleteVentaModel } from "../models/venta.model.js";

export const readVentas = async (req, res) => {
  try {
    const ventas = await getVentas()
    res.status(200).json({ ventas })
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
  }
};

export const readVenta = async (req, res) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({ error: 'Venta ID es requerido' })
    }
    const venta = await getVenta(id)
    res
      .status(!venta ? 404 : 200)
      .json(!venta ? { error: 'Venta no encontrado' } : { venta })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const createVenta = async (req, res) => {
  try {
    const { 
      cliente_id,
      total,
      fecha,
      estado
     } = req.body

    const newVenta = await createVentaModel(cliente_id, total, fecha, estado)
    res.status(201).json({ Venta: newVenta })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const setVentaController = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      cliente_id,
      total,
      fecha,
      estado
     } = req.body
    const venta = await setVentaModel(
      cliente_id,
      total,
      fecha,
      estado,
      id
    )
    res.status(201).json({ venta })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteVenta = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const rowCount = await deleteVentaModel(id);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Venta no encontrado' });
    }
    // Éxito: sin contenido
    return res.status(204).send();
  } catch (error) {
    if (error.code === '23503') {
      return res.status(409).json({
        error: 'No se puede eliminar la Venta porque tiene registros asociados.'
      });
    }
    return res.status(500).json({ error: 'Error al procesar la solicitud', detail: error.message });
  }
};
