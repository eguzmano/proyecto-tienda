import capitalize from '../../utils/capitalize'
import formatNumber from '../../utils/formatNumber'
import { useContext, useEffect, useMemo } from 'react'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import { UserContext } from '../../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom'
import { toastSuccess, toastError, modalConfirm } from '../../utils/toast'
import './DetailProduct.css'
import { FavoritesContext } from '../../context/FavoritesContext'
import { ProductComments, CardProduct } from '../../components'

const DetailProduct = () => {
  const { id } = useParams()
  const { product, fetchProduct, products, deleteProduct } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id, fetchProduct])

  const productId = Number(id)
  const isFav = useMemo(() => favorites.some(f => Number(f.producto_id) === productId), [favorites, productId])
  const similares = useMemo(() => {
    if (!products || !product) return []
    const catId = Number(product.categoria_id)
    const currentId = Number(product.id)
    return products
      .filter(p => Number(p.categoria_id) === catId && Number(p.id) !== currentId)
      .slice(0, 3)
  }, [products, product])

  if (!product) return <p className='text-center mt-5'>Cargando producto...</p>

  const handleFavorite = async () => {
    try {
      const result = await toggleFavorite(id)
      if (result && !isFav) toastSuccess('Agregado a favoritos')
      else if (result && isFav) toastSuccess('Eliminado de favoritos')
      else toastError('Error al actualizar favoritos')
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error('Favorite error', e)
      toastError('Error al actualizar favoritos')
    }
  }

  const handleDelete = async () => {
    const result = await modalConfirm({ title: '¿Eliminar producto?', text: 'Esta acción no se puede deshacer.' })
    if (result.isConfirmed) {
      try {
        await deleteProduct(id)
        toastSuccess('Producto eliminado')
        navigate('/productos')
      } catch (error) {
        console.error('Delete product error', error)
        toastError('Error al eliminar')
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
          className={`detail-icon-btn favorite${isFav ? ' fav' : ''}`}
          onClick={handleFavorite}
          aria-label='Agregar a favoritos'
        >
          <i className={isFav ? 'bi bi-heart-fill' : 'bi bi-heart'} />
        </button>
        <div className='row g-0'>
          <div className='col-md-6'>
            <img src={product.imagen_url} className='img-fluid rounded-start' alt={product.nombre} />
          </div>
          <div className='col-md-6'>
            <div className='card-body p-4 h-100 d-flex flex-column justify-content-between align-items-start'>
              <h4 className='card-title fs-2'>{product.nombre ? capitalize(product.nombre) : ''}</h4>
              <p className='card-text fs-5 text-start'>{product.descripcion}</p>
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
