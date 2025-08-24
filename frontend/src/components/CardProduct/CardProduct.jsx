import './CardProduct.css'
import formatNumber from '../../utils/formatNumber'
import capitalize from '../../utils/capitalize'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { FavoritesContext } from '../../context/FavoritesContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../../context/ProductsContext'
import { toastSuccess, toastError, modalConfirm } from '../../utils/toast'
import 'bootstrap-icons/font/bootstrap-icons.css'

const CardProduct = ({ nombre, precio, imagen_url, id, onDelete }) => {
  const { addToCart } = useContext(CartContext)
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { deleteProduct } = useContext(ProductContext)
  const [loadingFav, setLoadingFav] = useState(false)
  const isFav = favorites.some(f => Number(f.producto_id) === Number(id))

  const handleFavorite = async () => {
    if (loadingFav) return
    setLoadingFav(true)
    try {
      const result = await toggleFavorite(id)
      if (result && !isFav) toastSuccess('Agregado a favoritos')
      else if (isFav && result) toastSuccess('Eliminado de favoritos')
      else if (!result) toastError('Error al actualizar favoritos')
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') console.error('Fav error', error)
      toastError('Error al actualizar favoritos')
    } finally {
      setLoadingFav(false)
    }
  }

  const handleDelete = async () => {
    const result = await modalConfirm({ title: '¿Eliminar producto?', text: 'Esta acción no se puede deshacer.' })
    if (result.isConfirmed) {
      try {
        await deleteProduct(id)
        toastSuccess('Producto eliminado')
        if (onDelete) onDelete(id)
      } catch (error) {
        console.error('Delete product error', error)
        toastError('Error al eliminar')
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
      <button type='button' className='p-0 border-0 bg-transparent' onClick={() => navigate(`/productos/${id}`)}>
        <img
          src={imagen_url}
          className='card-img-top product-link'
          alt={nombre}
        />
      </button>
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
