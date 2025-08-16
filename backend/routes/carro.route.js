import { Router } from "express";
import {getCarroController, addItemCarroController, deleteItemCarroController} from "../src/controllers/carro.controller.js";

const router = Router();

router.get("/clientes/:clienteId/carro", getCarroController);
router.post("/clientes/:clienteId/carro", addItemCarroController);
router.delete("/clientes/:clienteId/carro/:productoId", deleteItemCarroController);

export default router;