import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { UserContext } from './UserContext'
import api from '../api/api'

export const FavoritesContext = createContext()

const FavoritesProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState([])

  const fetchFavorites = async () => {
    if (!user?.id) return setFavorites([])
    const { data } = await api.get(`/api/favoritos/${user.id}`)
    setFavorites(data.favoritos || [])
  }

  const addFavorite = async (producto_id) => {
    if (!user?.id) return
    await api.post('/api/favoritos', { cliente_id: user.id, producto_id })
    await fetchFavorites()
  }

  const removeFavorite = async (productoId) => {
    if (!user?.id) return false
    const favorito = favorites.find(f => Number(f.producto_id) === Number(productoId))
    if (!favorito) return false
    setFavorites(prev => prev.filter(f => f.id !== favorito.id))
    try {
      await api.delete(`/api/favoritos/${favorito.id}`)
      return true
    } catch (error) {
      console.error('Error al eliminar favorito:', error)
      return false
    } finally {
      await fetchFavorites()
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [user])

  const toggleFavorite = async (productoId) => {
    const isFav = favorites.some(f => Number(f.producto_id) === Number(productoId))
    if (isFav) return removeFavorite(productoId)
    await addFavorite(productoId)
    return true
  }

  const value = useMemo(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    fetchFavorites,
    toggleFavorite
  }), [favorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
