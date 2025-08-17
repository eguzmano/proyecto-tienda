import { getCarroModel, addItemCarroModel, deleteItemCarroModel, patchCarroItem } from "../models/carro.model.js";

export const getCarroController = async (req, res) => {
  try {
    const clienteId = parseInt(req.params.clienteId);
    const items = await getCarroModel(clienteId);
    res.json(items);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const patchCarroItemController = async (req, res) => {
  try {
    const clienteId  = parseInt(req.params.clienteId);
    const productoId = parseInt(req.params.productoId);
    const delta      = parseInt(req.body?.delta) || 1; // +1 por defecto

    const item = await patchCarroItem(clienteId, productoId, delta);

    // si volvió null, puede ser que se eliminó (cantidad <=0) o no existía y delta <= 0
    if (item === null) return res.json({ message: "Item eliminado o no existía" });

    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const addItemCarroController = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { producto_id, cantidad } = req.body;
    const item = await addItemCarroModel(clienteId, producto_id, cantidad || 1);
    res.status(201).json({item});
  } catch (error) {
    res.status(500).json({ message: "Error al agregar item al carro" });
  }
};

export const deleteItemCarroController = async (req, res) => {
  try {
    const { clienteId, productoId } = req.params;
    const item = await deleteItemCarroModel(clienteId, productoId);
    if (!item) return res.status(404).json({ message: "Item no encontrado" });
    res.json({ message: "Item eliminado", item });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar item" });
  }
};