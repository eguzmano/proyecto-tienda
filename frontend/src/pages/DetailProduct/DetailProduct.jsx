import capitalize from '../../utils/capitalize'
import formatNumber from '../../utils/formatNumber'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './DetailProduct.css'

const DetailProduct = () => {
  const { id } = useParams()
  const { product, fetchProduct } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const [fav, setFav] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
    // Opcional: limpiar producto al desmontar
    // return () => clearProduct()
  }, [id, fetchProduct])

  if (!product) return <p className='text-center mt-5'>Cargando producto...</p>

  const handleFavorite = async () => {
    try {
      await axios.post('http://localhost:5000/api/favoritos', { producto_id: id })
      setFav(true)
      Swal.fire('Agregado a favoritos', '', 'success')
    } catch (error) {
      Swal.fire('Error al agregar a favoritos', '', 'error')
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
        await axios.delete(`http://localhost:5000/api/productos/${id}`)
        Swal.fire('Producto eliminado', '', 'success')
        navigate('/productos')
      } catch (error) {
        Swal.fire('Error al eliminar', '', 'error')
      }
    }
  }

  return (
    <div className='card my-5 mx-auto shadow' style={{ maxWidth: '1200px', position: 'relative' }}>
      {/* Botón eliminar (X) */}
      <button
        className='detail-icon-btn delete'
        onClick={handleDelete}
        aria-label='Eliminar producto'
      >
        <i className='bi bi-x-lg' />
      </button>
      {/* Botón favoritos */}
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
  )
}

export default DetailProduct
