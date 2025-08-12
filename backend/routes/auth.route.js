// routes/auth.route.js
import { Router } from "express";
import { loginUser } from "../src/controllers/auth.controller.js";
import { registerCliente } from "../src/controllers/clientes.controller.js";
import { createUserMiddleware } from "../middlewares/user.middleware.js";

const router = Router();

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/register
router.post("/register", createUserMiddleware, registerCliente);

export default router;
