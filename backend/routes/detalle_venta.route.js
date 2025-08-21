import { Router } from "express";
import { readDetalleVenta, createDetalleVenta} from "../src/controllers/detalle_venta.controller.js";

const router = Router();

router.get("/:id", readDetalleVenta);
router.post("/", createDetalleVenta)

export default router;
