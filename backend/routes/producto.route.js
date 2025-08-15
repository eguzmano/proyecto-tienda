import { Router } from "express";
import {readProductos, readProducto } from "../src/controllers/producto.controller.js";

const router = Router();

router.get("/", readProductos);
router.get("/:id", readProducto);

export default router;
