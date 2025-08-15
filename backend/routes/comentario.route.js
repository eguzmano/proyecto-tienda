import { Router } from "express";
import { readComentarios, readComentario, createComentario } from "../src/controllers/comentario.controller.js";

const router = Router();

router.get("/", readComentarios);
router.get("/:id", readComentario);
router.post("/", createComentario)

export default router;
