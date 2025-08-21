/* eslint-disable camelcase */
import './CardProduct.css'
import formatNumber from '../../utils/formatNumber'
import capitalize from '../../utils/capitalize'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { FavoritesContext } from '../../context/FavoritesContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { API_URL } from '../../config/env'

const CardProduct = ({ nombre, precio, imagen_url, id, onDelete }) => {
  const { addToCart } = useContext(CartContext)
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [loadingFav, setLoadingFav] = useState(false)
  const isFav = favorites.some(f => Number(f.producto_id) === Number(id))

  const handleFavorite = async () => {
    if (loadingFav) return
    setLoadingFav(true)
    try {
      if (isFav) {
        const ok = await removeFavorite(id)
        if (ok) {
          Swal.fire('Eliminado de favoritos', '', 'success')
        }
      } else {
        await addFavorite(id)
        Swal.fire('Agregado a favoritos', '', 'success')
      }
    } catch (error) {
      Swal.fire('Error al actualizar favoritos', '', 'error')
    } finally {
      setLoadingFav(false)
    }
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/productos/${id}`)
        Swal.fire('Producto eliminado', '', 'success')
        if (onDelete) onDelete(id)
      } catch (error) {
        Swal.fire('Error al eliminar', '', 'error')
      }
    }
  }

  return (
    <div className='card mx-3 my-3 card-product' style={{ position: 'relative' }}>
      {user?.rol_id === 2 && (
        <button
          className='card-icon-btn delete'
          onClick={handleDelete}
          aria-label='Eliminar producto'
        >
          <i className='bi bi-x-lg' />
        </button>
      )}
      <button
        className={`card-icon-btn favorite${isFav ? ' fav' : ''}`}
        onClick={handleFavorite}
        aria-label='Agregar a favoritos'
        disabled={loadingFav}
      >
        <i className={isFav ? 'bi bi-heart-fill' : 'bi bi-heart'} />
      </button>
      {user?.rol_id === 2 && (
        <button
          className='card-icon-btn edit'
          onClick={() => navigate(`/productos/editar/${id}`)}
          aria-label='Editar producto'
          style={{ position: 'absolute', top: 50, left: 10, color: '#5E4631', fontSize: '1.5rem', zIndex: 2 }}
        >
          <i className='bi bi-pencil-square' />
        </button>
      )}
      <img
        src={imagen_url}
        className='card-img-top product-link'
        alt={nombre}
        role='button'
        tabIndex={0}
        onClick={() => navigate(`/productos/${id}`)}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/productos/${id}`)}
      />
      <div className='card-body d-flex flex-column'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item fs-4'>{capitalize(nombre)}</li>
          <li className='list-group-item'>Precio: ${formatNumber(Number(precio))}</li>
        </ul>
        <div className='buttons'>
          <button className='btn btn-light me-3' onClick={() => navigate(`/productos/${id}`)}>Ver mas 👀</button>
          <button className='btn btn-dark' onClick={() => addToCart({ id, nombre, precio, imagen_url })}>Añadir al 🛒</button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
