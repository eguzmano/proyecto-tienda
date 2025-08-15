import { createContext, useEffect, useMemo, useState } from 'react'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/productos')
      const data = await res.json()
      setProducts(data.productos)
    } catch (error) {
      console.log('Error fetching products:', error)
    }
  }

  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/productos/${id}`)
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      console.log('Error fetching product:', error)
      setProduct(null)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const clearProduct = () => setProduct(null)

  const globalState = useMemo(() => ({
    products,
    product,
    fetchProduct,
    clearProduct
  }), [products, product])

  return (
    <ProductContext.Provider value={globalState}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
