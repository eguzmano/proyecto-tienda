import { Router } from "express";
import { getClienteProfile } from "../src/controllers/clientes.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

// GET /api/usuarios/me
router.get("/me", verifyToken, getClienteProfile);

// Aquí puedes agregar futuros endpoints de usuarios:
// router.put("/me", verifyToken, updateCliente);
// router.delete("/me", verifyToken, deleteCliente);

export default router;
