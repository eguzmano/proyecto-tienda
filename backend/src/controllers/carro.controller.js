import { getCarroModel, addItemCarroModel, deleteItemCarroModel } from "../models/carro.model.js";

export const getCarroController = async (req, res) => {
  try {
    const { clienteId } = req.params;              // <-- ojo con el nombre del param
    const idNum = Number(clienteId);
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).json({ message: "clienteId inválido" });
    }

    const items = await getCarroModel(idNum);
    return res.json(items);
  } catch (error) {
    console.error("[GET /carro] error:", error);   // <-- LOG al server
    return res.status(500).json({ message: "Error al obtener el carro", detail: error.message });
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