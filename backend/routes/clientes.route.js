import { Router } from "express";
import { getClienteProfile, deleteCliente } from "../src/controllers/clientes.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

// GET /api/usuarios/me
router.get("/me", verifyToken, getClienteProfile);
 router.delete("/me", verifyToken, deleteCliente);
// Aquí puedes agregar futuros endpoints de usuarios:
// router.put("/me", verifyToken, updateCliente);

export default router;
