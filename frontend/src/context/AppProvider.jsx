import CartProvider from './CartContext'
import UserProvider from './UserContext'

const AppProvider = ({ children }) => {
  return (
    <CartProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </CartProvider>
  )
}

export default AppProvider
