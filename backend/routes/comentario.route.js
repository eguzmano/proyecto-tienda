import { Router } from "express";
import { comentarioController } from "../src/controllers/comentario.controller.js";

const router = Router();

router.get("/", comentarioController.readComentarios);
router.get("/:id", comentarioController.readComentario);

export default router;
