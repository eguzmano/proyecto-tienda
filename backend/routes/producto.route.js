import { Router } from "express";
import {readProductos, readProducto, createProducto, setProducto} from "../src/controllers/producto.controller.js";

const router = Router();

router.get("/", readProductos);
router.get("/:id", readProducto);

router.post("/", createProducto);
router.put("/:id", setProducto);

export default router;
