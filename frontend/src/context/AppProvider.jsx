import CartProvider from './CartContext'
import ProductProvider from './ProductsContext'
import UserProvider from './UserContext'
import FavoritesProvider from './FavoritesContext'

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <FavoritesProvider>
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </FavoritesProvider>
    </UserProvider>
  )
}

export default AppProvider
