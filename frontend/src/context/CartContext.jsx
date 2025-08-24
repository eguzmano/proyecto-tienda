import { createContext, useState, useEffect, useMemo, useContext } from 'react'
import { toastWarning, toastInfo, toastSuccess, toastError } from '../utils/toast'
import { UserContext } from './UserContext'
import { ProductContext } from './ProductsContext'
import api from '../api/api'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [checkingOut, setCheckingOut] = useState(false)
  const { user, token } = useContext(UserContext)
  const { products } = useContext(ProductContext)

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id && token && products.length > 0) {
        try {
          const { data } = await api.get(`/api/clientes/${user.id}/carro`)
          const cartMap = {}

          data.forEach(item => {
            const prod = products.find(p => Number(p.id) === Number(item.producto_id))
            if (!prod) return
            if (!cartMap[item.producto_id]) {
              cartMap[item.producto_id] = {
                id: item.producto_id,
                count: item.cantidad,
                nombre: prod.nombre,
                precio: Number(prod.precio),
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

  const normalizeCart = (rows) => {
    const cartMap = {}
    rows.forEach(item => {
      const prod = products.find(p => Number(p.id) === Number(item.producto_id))
      if (!prod) return
      if (!cartMap[item.producto_id]) {
        cartMap[item.producto_id] = {
          id: item.producto_id,
          count: item.cantidad,
          nombre: prod.nombre,
          precio: Number(prod.precio),
          imagen_url: prod.imagen_url
        }
      } else {
        cartMap[item.producto_id].count += item.cantidad
      }
    })
    setCart(Object.values(cartMap))
  }

  const syncQuantity = async (productoId, delta) => {
    if (!user?.id) return
    try {
      await api.patch(
        `/api/clientes/${user.id}/carro/${productoId}`,
        { delta },
        { validateStatus: s => (s >= 200 && s < 300) || s === 404 }
      )
      const { data } = await api.get(`/api/clientes/${user.id}/carro`)
      normalizeCart(data)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error('Error syncQuantity', e)
    }
  }

  const increaseQuantity = (id) => {
    return syncQuantity(id, 1)
  }

  const decreaseQuantity = (id) => {
    const item = cart.find(p => Number(p.id) === Number(id))
    if (!item) return
    if (item.count <= 1) {
      return removeAll(id)
    }
    return syncQuantity(id, -1)
  }

  const addToCart = async (product) => {
    if (!user?.id) {
      toastWarning('Debes iniciar sesión para agregar productos al carrito')
      return
    }

    const exists = cart.some(p => Number(p.id) === Number(product.id))
    setCart(prevCart => {
      if (exists) {
        toastInfo(`Se agregó ${product.nombre} al carrito`)
        return prevCart.map(p => Number(p.id) === Number(product.id) ? { ...p, count: p.count + 1 } : p)
      } else {
        toastSuccess(`${product.nombre} añadida al carrito 🛒`)
        return [...prevCart, { ...product, count: 1 }]
      }
    })

    try {
      await api.post(`/api/clientes/${user.id}/carro`, {
        producto_id: product.id,
        cantidad: 1
      })
      const { data } = await api.get(`/api/clientes/${user.id}/carro`)
      normalizeCart(data)
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') console.error('Add to cart error', error)
      setCart(prev => {
        const current = prev.find(p => Number(p.id) === Number(product.id))
        if (!current) return prev
        if (current.count > 1) {
          return prev.map(p =>
            Number(p.id) === Number(product.id) ? { ...p, count: p.count - 1 } : p
          )
        }
        return prev.filter(p => Number(p.id) !== Number(product.id))
      })
      toastError('Error al agregar al carrito')
    }
  }

  const removeAll = async (id) => {
    if (!user?.id) return
    await api.delete(`/api/clientes/${user.id}/carro/${id}`, {
      validateStatus: s => (s >= 200 && s < 300) || s === 404
    })
    setCart(prevCart => prevCart.filter(p => p.id !== id))
  }

  const clearCart = async ({ skipApi = false } = {}) => {
    try {
      if (!skipApi && user?.id && cart.length > 0) {
        await Promise.all(
          cart.map(item =>
            api.delete(
              `/api/clientes/${user.id}/carro/${item.id}`,
              { validateStatus: s => (s >= 200 && s < 300) || s === 404 }
            ).catch(() => {})
          )
        )
      }
    } finally {
      setCart([])
    }
  }

  const checkout = async () => {
    if (!user?.id) throw new Error('Debe iniciar sesión')
    if (cart.length === 0) throw new Error('Carrito vacío')
    if (checkingOut) return null
    setCheckingOut(true)
    try {
      const { data } = await api.post(`/api/checkout/${user.id}`, {})
      const venta = data?.venta
      setCart([])
      return venta || null
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') console.error('Checkout error', error)
      throw error
    } finally {
      setCheckingOut(false)
    }
  }

  const globalState = useMemo(() => ({
    cart,
    increaseQuantity,
    decreaseQuantity,
    total: cart.reduce((acc, p) => acc + p.precio * p.count, 0),
    addToCart,
    removeAll,
    clearCart,
    checkout,
    checkingOut
  }), [cart, checkingOut])

  return (
    <CartContext.Provider value={globalState}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
