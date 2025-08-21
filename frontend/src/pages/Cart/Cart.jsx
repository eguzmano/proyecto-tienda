import formatNumber from '../../utils/formatNumber'
import capitalize from '../../utils/capitalize'
import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../config/env'

const Cart = () => {
  const { cart, total, increaseQuantity, decreaseQuantity, removeAll, clearCart } = useContext(CartContext)
  const { token, user } = useContext(UserContext)

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault()
    }
    try {
      // Consumir backend: POST /api/checkout/:clienteId
      const url = `${API_URL}/api/checkout/${user.id}`
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const { data } = await axios.post(url, {}, config)
      const venta = data?.venta
      console.log('Checkout OK:', venta)

      Swal.fire({
        icon: 'success',
        title: '¡Pago exitoso!',
        text: `N° de venta: ${venta?.id || '-'} — Total: $${formatNumber(venta?.total || total)}`,
        timer: 4500,
        showConfirmButton: true
      })

      // El backend ya vació el carro: limpia solo el estado local
      clearCart({ skipApi: true })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.error || '❌ Error al procesar el pago',
        timer: 2500,
        showConfirmButton: false
      })
    }
  }

  const pay = () => {
    if (total > 0) {
      handleSubmit()
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: '⚠️ El carrito está vacío',
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  return (
    <div className='cart-container'>
      <h3 className='my-4'>Detalles del pedido:</h3>
      {cart.length === 0
        ? (
          <h5 className='text-danger'>El carrito está vacío!</h5>
          )
        : (
            cart.map((p) => (
              <div className='card mb-4 mx-auto shadow card-cart' key={p.id}>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <img src={p.imagen_url} className='img-fluid rounded-start' alt={p.nombre} />
                  </div>
                  <div className='col-md-8 my-auto'>
                    <div className='card-body p-0'>
                      <h5 className='card-title ms-3'>{capitalize(p.nombre)}</h5>
                      <p className='card-text me-2 ms-auto'> ${formatNumber(p.precio)}</p>
                      <div className='d-flex align-items-center'>
                        <button
                          type='button'
                          className='btn btn-outline-secondary mx-2'
                          onClick={() => decreaseQuantity(p.id)}
                        >
                          -
                        </button>
                        <p className='quantity'>{p.count}</p>
                        <button
                          type='button'
                          className='btn btn-outline-secondary mx-2'
                          onClick={() => increaseQuantity(p.id)}
                        >
                          +
                        </button>
                        <button
                          type='button'
                          className='btn btn-dark mx-2'
                          onClick={() => removeAll(p.id)}
                        >
                          Eliminar todo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
      <h4 className='mb-3'><strong>Total: ${formatNumber(total)}</strong></h4>
      {token ? '' : <h5>Para continuar con el pago debes iniciar sesion</h5>}
      <div className='d-flex justify-content-center'>
        {(cart.length !== 0)
          ? (
            <>
              <button
                className='btn btn-dark px-4 align-self-center me-5'
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
              <button
                className='btn btn-dark px-5 align-self-center'
                onClick={pay}
                disabled={!token}
              >
                Pagar
              </button>
            </>)
          : null}
      </div>
    </div>
  )
}

export default Cart
