import { Router } from "express";
import { productoController } from "../src/controllers/producto.controller.js";

const router = Router();

router.get("/", productoController.readProductos);
router.get("/:id", productoController.readProducto);

export default router;
