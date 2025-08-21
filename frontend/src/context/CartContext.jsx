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

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id && token && products.length > 0) {
        try {
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

  const syncQuantity = async (productoId, delta) => {
    if (!user?.id) return
    try {
      await fetch(`http://localhost:5000/api/clientes/${user.id}/carro/${productoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta })
      })

      const res = await fetch(`http://localhost:5000/api/clientes/${user.id}/carro`)
      const data = await res.json()

      // FIX: acumular cantidades cuando hay múltiples filas del mismo producto
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
    } catch (_) {}
  }

  const increaseQuantity = (id) => {
    return syncQuantity(id, 1)
  }

  const decreaseQuantity = (id) => {
    return syncQuantity(id, -1)
  }

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

    // 1) Actualización optimista en memoria
    const exists = cart.some(p => Number(p.id) === Number(product.id))
    setCart(prevCart => {
      if (exists) {
        Swal.fire({
          ...swalOptions,
          icon: 'info',
          title: `Se agregó ${product.nombre} al carrito`
        })
        return prevCart.map(p =>
          Number(p.id) === Number(product.id) ? { ...p, count: p.count + 1 } : p
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

    try {
      // 2) Persistir en backend (+1 siempre)
      await fetch(`http://localhost:5000/api/clientes/${user.id}/carro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto_id: product.id, cantidad: 1 })
      })

      // 3) Re-sincronizar con backend para reflejar el estado real
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
            precio: Number(prod.precio),
            imagen_url: prod.imagen_url
          }
        } else {
          cartMap[item.producto_id].count += item.cantidad
        }
      })
      setCart(Object.values(cartMap))
    } catch (error) {
      // Rollback simple si falla el backend
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
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: 'Error al agregar al carrito'
      })
    }
  }

  const removeAll = async (id) => {
    if (!user?.id) return
    await fetch(`http://localhost:5000/api/clientes/${user.id}/carro/${id}`, {
      method: 'DELETE'
    })
    setCart(prevCart => prevCart.filter(p => p.id !== id))
  }

  const clearCart = async () => {
    if (user?.id && cart.length > 0) {
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
