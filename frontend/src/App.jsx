import './App.css'
import { StoreBreadcrumb, StoreNavbar } from './components/index'
import { Home } from './pages/index'

const App = () => {
  return (
    <div className='wrapper'>
      <StoreNavbar />
      <StoreBreadcrumb />
      <Home />

    </div>
  )
}

export default App
