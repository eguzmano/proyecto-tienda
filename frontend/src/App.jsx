import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Footer, StoreBreadcrumb, StoreNavbar } from './components/index'
import AppProvider from './context/AppProvider'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <AppProvider>
          <StoreNavbar />
          <StoreBreadcrumb />
          <AppRoutes />
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
