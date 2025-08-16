import { Router } from 'express'
import {getFavoritosClienteController, createFavoritoController, deleteFavoritoController} from "../src/controllers/favorito.controller.js";


const router = Router()

router.get('/favoritos/:cliente_id', getFavoritosClienteController)
router.post('/favoritos', createFavoritoController)
router.delete('/favoritos', deleteFavoritoController)


export default router