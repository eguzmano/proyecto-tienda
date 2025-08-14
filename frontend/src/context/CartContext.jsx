import { createContext, useState, useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cart.reduce((acc, p) => acc + p.precio * p.count, 0)
    setTotal(currentTotal => {
      if (currentTotal !== newTotal) {
        return newTotal
      }
      return currentTotal
    })
  }, [cart])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const increaseQuantity = (id) => {
    setCart(cart.map(p =>
      p.id === id ? { ...p, count: p.count + 1 } : p
    ))
  }

  const decreaseQuantity = (id) => {
    setCart(cart
      .map(p => p.id === id ? { ...p, count: p.count - 1 } : p)
      .filter(p => p.count > 0)
    )
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(p => p.id === product.id)

      const swalOptions = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'custom-toast',
          title: 'custom-title'
        }
      }

      if (exists) {
        Swal.fire({
          ...swalOptions,
          icon: 'info',
          title: `Se agregó ${product.nombre} al carrito`
        })
        return prevCart.map(p =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p
        )
      } else {
        Swal.fire({
          ...swalOptions,
          icon: 'success',
          title: `${product.nombre} añadida al carrito 🛒`
        })
        return [...prevCart, { ...product, count: 1 }]
      }
    })
  }

  const removeAll = (id) => {
    setCart(prevCart => prevCart.filter(p => p.id !== id))
  }

  const clearCart = () => {
    setCart([])
    setTotal(0)
  }

  const globalState = useMemo(() => ({
    cart,
    increaseQuantity,
    decreaseQuantity,
    total,
    addToCart,
    removeAll,
    clearCart
  }), [cart, total])

  return (
    <CartContext.Provider value={globalState}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
