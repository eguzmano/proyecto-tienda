import './CardProduct.css'
import formatNumber from '../../utils/formatNumber'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CardProduct = ({ nombre, precio, img, id }) => {
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  return (
    <div className='card mx-3 my-3 card-product'>
      <img src={img} className='card-img-top' alt={nombre} />
      <div className='card-body d-flex flex-column'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item fs-4'>{nombre}</li>

          <li className='list-group-item'>Precio: ${formatNumber(precio)}</li>
        </ul>
        <div className='buttons'>
          <button className='btn btn-light me-3' onClick={() => navigate(`/productos/${id}`)}>Ver mas 👀</button>
          <button className='btn btn-dark' onClick={() => addToCart({ id, nombre, precio, img })}>Añadir al 🛒</button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
