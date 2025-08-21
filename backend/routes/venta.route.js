import { Router } from "express";
import {readVenta, readVentas, createVenta, setVentaController, deleteVenta} from "../src/controllers/venta.controller.js";

const router = Router();

router.get("/", readVentas);
router.get("/:id", readVenta);
router.post("/", createVenta);
router.put("/:id", setVentaController);
router.delete('/:id', deleteVenta)

export default router;
