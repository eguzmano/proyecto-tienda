import CartProvider from './CartContext'
import ProductProvider from './ProductsContext'
import UserProvider from './UserContext'

const AppProvider = ({ children }) => {
  return (
    <CartProvider>
      <UserProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </UserProvider>
    </CartProvider>
  )
}

export default AppProvider
