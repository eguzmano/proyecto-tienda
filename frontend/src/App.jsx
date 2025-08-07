import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { NewProduct, StoreBreadcrumb, StoreNavbar } from './components/index'
import { Home, Login, Register } from './pages/index'
import AppProvider from './context/AppProvider'
import Profile from './components/Profile/Profile'

const App = () => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <AppProvider>

          <StoreNavbar />
          <StoreBreadcrumb />
          <Home />
          <Register />
          <Login />
          <Profile />
          <NewProduct />
        </AppProvider>

      </BrowserRouter>
    </div>
  )
}

export default App
