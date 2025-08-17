import { createContext, useState, useEffect, useMemo, useContext } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { UserContext } from './UserContext'
import { ProductContext } from './ProductsContext'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })
  const [total, setTotal] = useState(0)
  const { user, token } = useContext(UserContext)
  const { products } = useContext(ProductContext)

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

  // Cargar carrito del backend al iniciar sesión
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id && token && products.length > 0) {
        try {
          const res = await fetch(`http://localhost:5000/api/clientes/${user.id}/carro`)
          const data = await res.json()
          // Filtra y suma cantidades si hay duplicados
          const cartMap = {}
          data.forEach(item => {
            const prod = products.find(p => Number(p.id) === Number(item.producto_id))
            if (!prod) return
            if (!cartMap[item.producto_id]) {
              cartMap[item.producto_id] = {
                id: item.producto_id,
                count: item.cantidad,
                nombre: prod.nombre,
                precio: prod.precio,
                imagen_url: prod.imagen_url
              }
            } else {
              cartMap[item.producto_id].count += item.cantidad
            }
          })
          setCart(Object.values(cartMap))
        } catch (error) {
          setCart([])
        }
      } else if (!user?.id || !token) {
        setCart([])
      }
    }
    fetchCart()
  }, [user, token, products])

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

  // Al agregar al carrito, sincroniza con backend
  const addToCart = async (product) => {
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

    if (!user?.id) {
      Swal.fire({
        ...swalOptions,
        icon: 'warning',
        title: 'Debes iniciar sesión para agregar productos al carrito'
      })
      return
    }

    try {
      // Siempre enviar cantidad: 1 para sumar de a uno
      await fetch(`http://localhost:5000/api/clientes/${user.id}/carro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto_id: product.id, cantidad: 1 })
      })

      Swal.fire({
        ...swalOptions,
        icon: 'success',
        title: `${product.nombre} añadida al carrito 🛒`
      })

      // Vuelve a cargar el carrito desde el backend para asegurar sincronización
      const res = await fetch(`http://localhost:5000/api/clientes/${user.id}/carro`)
      const data = await res.json()
      const cartMap = {}
      data.forEach(item => {
        const prod = products.find(p => Number(p.id) === Number(item.producto_id))
        if (!prod) return
        if (!cartMap[item.producto_id]) {
          cartMap[item.producto_id] = {
            id: item.producto_id,
            count: item.cantidad,
            nombre: prod.nombre,
            precio: prod.precio,
            imagen_url: prod.imagen_url
          }
        } else {
          cartMap[item.producto_id].count += item.cantidad
        }
      })
      setCart(Object.values(cartMap))
    } catch (error) {
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: 'Error al agregar al carrito'
      })
    }
  }

  // Al eliminar del carrito, sincroniza con backend
  const removeAll = async (id) => {
    if (!user?.id) return
    await fetch(`http://localhost:5000/api/clientes/${user.id}/carro/${id}`, {
      method: 'DELETE'
    })
    setCart(prevCart => prevCart.filter(p => p.id !== id))
  }

  const clearCart = async () => {
    if (user?.id && cart.length > 0) {
      // Elimina cada producto del carrito en el backend
      await Promise.all(
        cart.map(item =>
          fetch(`http://localhost:5000/api/clientes/${user.id}/carro/${item.id}`, {
            method: 'DELETE'
          })
        )
      )
    }
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
