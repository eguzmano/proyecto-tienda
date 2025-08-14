import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import './HomeFeatured.css'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import formatNumber from '../../utils/formatNumber'

const FEATURED_IDS = ['2', '3']

const HomeFeatured = () => {
  const { products } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  const destacados = products.filter(prod => FEATURED_IDS.includes(prod.id))

  return (
    <>
      <h2 className='featured-title'>Destacados</h2>
      {destacados.map((producto, idx) => (
        <div className='featured card my-5' key={producto.id}>
          <div className='row g-0 align-items-center'>
            {idx % 2 === 0
              ? (
                <>
                  <div className='col-md-4'>
                    <img src={producto.img} className='img-fluid rounded' alt={producto.nombre} />
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body-featured'>
                      <h3 className='card-title'>{producto.nombre}</h3>
                      <p className='card-text'>{producto.descripcion}</p>
                      <p className='card-text precio'>Precio: ${formatNumber(producto.precio)}</p>
                      <div className='featured-buttons'>
                        <button
                          className='btn btn-light me-4'
                          onClick={() => navigate(`/productos/${producto.id}`)}
                        >
                          Ver más
                        </button>
                        <button
                          className='btn btn-dark'
                          onClick={() => addToCart(producto)}
                        >
                          Añadir al 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                </>
                )
              : (
                <>
                  <div className='col-md-8'>
                    <div className='card-body-featured'>
                      <h3 className='card-title'>{producto.nombre}</h3>
                      <p className='card-text'>{producto.descripcion}</p>
                      <p className='card-text precio'>Precio: ${formatNumber(producto.precio)}</p>
                      <div className='featured-buttons'>
                        <button
                          className='btn btn-light me-2'
                          onClick={() => navigate(`/productos/${producto.id}`)}
                        >
                          Ver más
                        </button>
                        <button
                          className='btn btn-dark'
                          onClick={() => addToCart(producto)}
                        >
                          Añadir al 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <img src={producto.img} className='img-fluid rounded' alt={producto.nombre} />
                  </div>
                </>
                )}
          </div>
        </div>
      ))}
    </>
  )
}

export default HomeFeatured
