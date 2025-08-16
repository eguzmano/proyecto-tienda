import { Router } from "express";
import { readComentarios, getComentariosDeProducto, createComentario } from "../src/controllers/comentario.controller.js";

const router = Router();

router.get("/", readComentarios);
router.get("/:id", getComentariosDeProducto);
router.post("/", createComentario)

export default router;
