/* eslint-disable camelcase */
import capitalize from '../../utils/capitalize'
import formatNumber from '../../utils/formatNumber'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import { UserContext } from '../../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './DetailProduct.css'
import { FavoritesContext } from '../../context/FavoritesContext'
import { ProductComments, CardProduct } from '../../components' // <-- agregar CardProduct
import { API_URL } from '../../config/env'

const DetailProduct = () => {
  const { id } = useParams()
  const { product, fetchProduct, products } = useContext(ProductContext) // <-- traer products también
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext)
  const [fav, setFav] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id, fetchProduct])

  useEffect(() => {
    const isFav = favorites.some(f => Number(f.producto_id) === Number(id))
    setFav(isFav)
  }, [favorites, id])

  if (!product) return <p className='text-center mt-5'>Cargando producto...</p>

  // Top 3 similares por categoría (excluye el mismo producto)
  const similares = (products || [])
    .filter(p =>
      Number(p.categoria_id) === Number(product.categoria_id) &&
      Number(p.id) !== Number(product.id)
    )
    .slice(0, 3)

  const handleFavorite = async () => {
    try {
      if (fav) {
        const ok = await removeFavorite(id)
        if (ok) {
          setFav(false)
          Swal.fire('Eliminado de favoritos', '', 'success')
        }
      } else {
        await addFavorite(id)
        setFav(true)
        Swal.fire('Agregado a favoritos', '', 'success')
      }
    } catch (error) {
      Swal.fire('Error al actualizar favoritos', '', 'error')
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
        navigate('/productos')
      } catch (error) {
        Swal.fire('Error al eliminar', '', 'error')
      }
    }
  }

  return (
    <div>
      <div className='card my-5 mx-auto shadow' style={{ maxWidth: '1200px', position: 'relative' }}>
        {user?.rol_id === 2 && (
          <button
            className='detail-icon-btn delete'
            onClick={handleDelete}
            aria-label='Eliminar producto'
          >
            <i className='bi bi-x-lg' />
          </button>
        )}
        {user?.rol_id === 2 && (
          <button
            className='detail-icon-btn edit'
            onClick={() => navigate(`/productos/editar/${id}`)}
            aria-label='Editar producto'
            style={{ position: 'absolute', top: 55, left: 15, color: '#5E4631', fontSize: '1.5rem', zIndex: 2 }}
          >
            <i className='bi bi-pencil-square' />
          </button>
        )}
        <button
          className={`detail-icon-btn favorite${fav ? ' fav' : ''}`}
          onClick={handleFavorite}
          aria-label='Agregar a favoritos'
        >
          <i className={fav ? 'bi bi-heart-fill' : 'bi bi-heart'} />
        </button>
        <div className='row g-0'>
          <div className='col-md-6'>
            <img src={product.imagen_url} className='img-fluid rounded-start' alt={product.nombre} />
          </div>
          <div className='col-md-6'>
            <div className='card-body p-4 h-100 d-flex flex-column justify-content-between align-items-start'>
              <h4 className='card-title'>{product.nombre ? capitalize(product.nombre) : ''}</h4>
              <p className='card-text text-start'>{product.descripcion}</p>
              <div className='d-flex justify-content-around mx-auto'>
                <h5 className='card-text d-flex align-items-center m-0 me-5'>Precio: ${product.precio ? formatNumber(product.precio) : '0'}</h5>
                <button className='btn btn-dark ms-5' onClick={() => addToCart(product)}>{capitalize('añadir')} 🛒</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comentarios debajo del detalle */}
      <ProductComments productId={Number(id)} />

      {/* Productos similares */}
      <div className='container my-5'>
        <h4 className='mb-3'>Productos Similares</h4>
        <div className='d-flex flex-wrap justify-content-center'>
          {similares.length > 0
            ? similares.map(({ id, nombre, imagen_url, precio }) => (
              <CardProduct
                key={id}
                id={id}
                nombre={nombre}
                imagen_url={imagen_url}
                precio={precio}
              />
            ))
            : <p className='text-muted'>No hay productos similares.</p>}
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
