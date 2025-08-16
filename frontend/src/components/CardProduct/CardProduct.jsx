import './CardProduct.css'
import formatNumber from '../../utils/formatNumber'
import capitalize from '../../utils/capitalize'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'bootstrap-icons/font/bootstrap-icons.css'

const CardProduct = ({ nombre, precio, imagen_url, id, onDelete }) => {
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [fav, setFav] = useState(false)

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
        if (onDelete) onDelete(id)
      } catch (error) {
        Swal.fire('Error al eliminar', '', 'error')
      }
    }
  }

  return (
    <div className='card mx-3 my-3 card-product' style={{ position: 'relative' }}>
      {/* Botón eliminar (X) */}
      <button
        className='card-icon-btn delete'
        onClick={handleDelete}
        aria-label='Eliminar producto'
      >
        <i className='bi bi-x-lg' />
      </button>
      {/* Botón favoritos */}
      <button
        className={`card-icon-btn favorite${fav ? ' fav' : ''}`}
        onClick={handleFavorite}
        aria-label='Agregar a favoritos'
      >
        <i className={fav ? 'bi bi-heart-fill' : 'bi bi-heart'} />
      </button>
      <img src={imagen_url} className='card-img-top' alt={nombre} />
      <div className='card-body d-flex flex-column'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item fs-4'>{capitalize(nombre)}</li>
          <li className='list-group-item'>Precio: ${formatNumber(precio)}</li>
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
