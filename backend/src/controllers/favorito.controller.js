import { addFavoritosClienteModel, getFavoritosClienteModel, deleteFavoritoModel } from "../models/favorito.model.js";


export const getFavoritosClienteController = async (req, res) => {
    try {
        const { cliente_id } = req.params
        const favoritos = await getFavoritosClienteModel(cliente_id)
        res.status(201).json({ favoritos })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createFavoritoController = async (req, res) => {
    try {
        const { cliente_id, producto_id } = req.body
        const newFavorito = await addFavoritosClienteModel(cliente_id, producto_id)
        res.status(201).json({ newFavorito })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteFavoritoController = async (req, res) => {
    try {
        const { id } = req.params
        const favorito = await deleteFavoritoModel(id)

        if (favorito === 0) {
            return res.status(404).json({ error: 'Favorito no encontrado' });
        }
        // Éxito: sin contenido
        return res.status(200).json({ favorito: favorito })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('Error =>', error)

    }
};
