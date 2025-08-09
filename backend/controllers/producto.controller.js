import { productoModel } from "../models/producto.model.js";

const readProductos = async (req, res) => {
  const muebles = await productoModel.getProductos();
  res.json(muebles);
};

const readProducto = async (req, res) => {
  const { id } = req.params;
  const muebles = await productoModel.getProducto(id.toLowerCase());
  if (!muebles) {
    return res.status(404).json({ message: "Mueble not found" });
  }
  res.json(muebles);
};

export const productoController = {
  readProductos,
  readProducto,
};
