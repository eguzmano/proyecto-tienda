import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Footer, StoreBreadcrumb, StoreNavbar } from './components/index'
import AppProvider from './context/AppProvider'
import AppRoutes from './routes/AppRoutes'
import ProductProvider from './context/ProductsContext'

const App = () => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <AppProvider>
          <ProductProvider>
            <StoreNavbar />
            <StoreBreadcrumb />
            <AppRoutes />
            <Footer />
          </ProductProvider>
        </AppProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
