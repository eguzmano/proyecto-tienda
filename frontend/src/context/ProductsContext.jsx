import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import api from '../api/api'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/api/productos')
      setProducts((data.productos || []).map(p => ({ ...p, precio: Number(p.precio) })))
    } catch (error) {
    }
  }, [])

  const fetchProduct = useCallback(async (id) => {
    try {
      const { data } = await api.get(`/api/productos/${id}`)
      setProduct(data.producto ? { ...data.producto, precio: Number(data.producto.precio) } : null)
    } catch (error) {
      setProduct(null)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const clearProduct = () => setProduct(null)
  const removeProduct = (id) => {
    setProducts(products => products.filter(p => Number(p.id) !== Number(id)))
  }

  const updateProduct = (updated) => {
    setProducts(prev =>
      prev.map(p => Number(p.id) === Number(updated.id)
        ? { ...p, ...updated, precio: Number(updated.precio) }
        : p
      )
    )
    setProduct(prev =>
      prev && Number(prev.id) === Number(updated.id)
        ? { ...prev, ...updated, precio: Number(updated.precio) }
        : prev
    )
  }

  const addProduct = (nuevo) => {
    if (!nuevo) return
    setProducts(prev => [...prev, { ...nuevo, precio: Number(nuevo.precio) }])
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/productos/${id}`)
      setProducts(prev => prev.filter(p => Number(p.id) !== Number(id)))
      setProduct(prev => (prev && Number(prev.id) === Number(id) ? null : prev))
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  const globalState = useMemo(() => ({
    products,
    product,
    fetchProduct,
    clearProduct,
    removeProduct,
    updateProduct,
    addProduct,
    deleteProduct
  }), [products, product])

  return (
    <ProductContext.Provider value={globalState}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
