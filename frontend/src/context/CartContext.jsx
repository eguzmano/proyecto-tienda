import { createContext, useState, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [pizzaCart, setPizzaCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = pizzaCart.reduce((acc, p) => acc + p.price * p.count, 0)
    setTotal(newTotal)
  }, [pizzaCart])

  const increaseQuantity = (id) => {
    setPizzaCart(pizzaCart.map(p =>
      p.id === id ? { ...p, count: p.count + 1 } : p
    ))
  }

  const decreaseQuantity = (id) => {
    setPizzaCart(pizzaCart
      .map(p => p.id === id ? { ...p, count: p.count - 1 } : p)
      .filter(p => p.count > 0)
    )
  }

  const addToCart = (pizza) => {
    setPizzaCart(prevCart => {
      const exists = prevCart.find(p => p.id === pizza.id)

      if (exists) {
        toast.info(`Se agregó otra ${pizza.name} 🍕 al carrito`, {
          position: 'top-right',
          autoClose: 2000,
          containerId: 'customToastContainer',
          offset: {
            x: 20,
            y: 150
          },
          style: { background: '#000', color: '#fff' }
        })
        return prevCart.map(p =>
          p.id === pizza.id ? { ...p, count: p.count + 1 } : p
        )
      } else {
        toast.success(`${pizza.name} añadida al carrito 🛒`, {
          position: 'top-right',
          autoClose: 2000,
          containerId: 'customToastContainer',
          offset: {
            x: 20,
            y: 150
          },
          style: { background: '#000', color: '#fff' }
        })
        return [...prevCart, { ...pizza, count: 1 }]
      }
    })
  }

  const removeAll = (id) => {
    setPizzaCart(prevCart => prevCart.filter(p => p.id !== id))
  }

  const clearCart = () => {
    setPizzaCart([])
    setTotal(0)
  }

  const globalState = useMemo(() => ({
    pizzaCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    addToCart,
    removeAll,
    clearCart
  }), [pizzaCart, total])

  return (
    <CartContext.Provider value={globalState}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
