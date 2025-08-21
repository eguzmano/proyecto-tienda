/* eslint-disable camelcase */
import { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'
import { API_URL } from '../config/env'

export const FavoritesContext = createContext()

const FavoritesProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState([])

  const fetchFavorites = async () => {
    if (!user?.id) return setFavorites([])
    const { data } = await axios.get(`${API_URL}/api/favoritos/${user.id}`)
    setFavorites(data.favoritos || [])
  }

  // producto_id: viene así desde la API; mantenemos la clave para compatibilidad
  const addFavorite = async (producto_id) => {
    if (!user?.id) return
    await axios.post(`${API_URL}/api/favoritos`, { cliente_id: user.id, producto_id })
    await fetchFavorites() // <-- espera a que termine antes de continuar
  }

  const removeFavorite = async (productoId) => {
    if (!user?.id) return false
    const favorito = favorites.find(f => Number(f.producto_id) === Number(productoId))
    if (!favorito) return false
    // Optimista: quita del estado inmediato
    setFavorites(prev => prev.filter(f => f.id !== favorito.id))
    try {
      await axios.delete(`${API_URL}/api/favoritos/${favorito.id}`)
      return true
    } catch (error) {
      console.error('Error al eliminar favorito:', error)
      return false
    } finally {
      await fetchFavorites()
    }
  }

  useEffect(() => {
    if (user && user.id) {
      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [user])

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
