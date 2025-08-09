import capitalize from '../../utils/capitalize'
import formatNumber from '../../utils/formatNumber'
import { useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductsContext'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {
  const { id } = useParams()
  const { product, fetchProduct } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
    // Opcional: limpiar producto al desmontar
    // return () => clearProduct()
  }, [id, fetchProduct])

  if (!product) return <p className='text-center mt-5'>Cargando producto...</p>

  return (
    <div className='card my-5 mx-auto shadow' style={{ maxWidth: '1200px' }}>
      <div className='row g-0'>
        <div className='col-md-6'>
          <img src={product.img} className='img-fluid rounded-start' alt={product.nombre} />
        </div>
        <div className='col-md-6'>
          <div className='card-body p-4 h-100 d-flex flex-column justify-content-between align-items-start'>
            <h4 className='card-title'>{product.nombre ? capitalize(product.nombre) : ''}</h4>
            <p className='card-text text-start'>{product.descripcion}</p>
            <p className='card-text text-start ms-0'>{product.ingredients ? product.ingredients.map(i => (<li key={i}>🍕 {capitalize(i)}</li>)) : null}</p>
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
