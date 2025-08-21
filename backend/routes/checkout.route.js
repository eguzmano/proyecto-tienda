// routes/checkout.routes.js
import { Router } from "express";
import { checkoutController } from "../src/controllers/checkout.controller.js";

const router = Router();

router.post("/checkout/:clienteId", checkoutController);

export default router;
