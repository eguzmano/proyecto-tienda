import formatNumber from '../../utils/formatNumber'
import capitalize from '../../utils/capitalize'
import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { toastWarning, toastSuccess, toastError } from '../../utils/toast'

const Cart = () => {
  const { cart, total, increaseQuantity, decreaseQuantity, removeAll, clearCart, checkout, checkingOut } = useContext(CartContext)
  const { token } = useContext(UserContext)

  const pay = async () => {
    if (total <= 0) { toastWarning('⚠️ El carrito está vacío'); return }
    try {
      const venta = await checkout()
      if (!venta) return
      toastSuccess(`¡Pago exitoso! Venta #${venta?.id || '-'} Total: $${formatNumber(venta?.total || total)}`, 3500)
    } catch (error) {
      const msg = error?.response?.data?.error || error.message || '❌ Error al procesar el pago'
      toastError(msg)
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
                disabled={!token || checkingOut}
              >
                {checkingOut ? 'Procesando...' : 'Pagar'}
              </button>
            </>)
          : null}
      </div>
    </div>
  )
}

export default Cart
