import { Router } from "express";
import {getCarroController, addItemCarroController, deleteItemCarroController, patchCarroItemController} from "../src/controllers/carro.controller.js";

const router = Router();

router.get("/clientes/:clienteId/carro", getCarroController);
router.post("/clientes/:clienteId/carro", addItemCarroController);
router.delete("/clientes/:clienteId/carro/:productoId", deleteItemCarroController);
// un solo endpoint para +1 / -1
router.patch("/clientes/:clienteId/carro/:productoId", patchCarroItemController);

export default router;