import { createContext, useEffect, useMemo, useState, useCallback } from 'react'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/productos')
      const data = await res.json()
      setProducts((data.productos || []).map(p => ({ ...p, precio: Number(p.precio) })))
    } catch (error) {
      console.log('Error fetching products:', error)
    }
  }, [])

  const fetchProduct = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/productos/${id}`)
      const data = await res.json()
      setProduct(data.producto ? { ...data.producto, precio: Number(data.producto.precio) } : null)
    } catch (error) {
      console.log('Error fetching product:', error)
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

  const globalState = useMemo(() => ({
    products,
    product,
    fetchProduct,
    clearProduct,
    removeProduct,
    updateProduct,
    addProduct
  }), [products, product])

  return (
    <ProductContext.Provider value={globalState}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
