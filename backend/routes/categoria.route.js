import { Router } from "express";
import { readCategorias, readCategoria } from "../src/controllers/categoria.controller.js"; 

const router = Router();

router.get("/", readCategorias);
router.get("/:id", readCategoria);

export default router;
