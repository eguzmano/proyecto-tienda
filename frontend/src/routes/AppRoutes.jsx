import { Route, Routes } from 'react-router-dom'
import { Profile, ProtectedRoutes, PublicRoutes, NotFound } from '../components'
import { Home, Login, Register, DetailProduct, Gallery, Cart, NewProductPage, Favorites, EditProduct } from '../pages'

const AppRoutes = () => {
  return (
    <div className='content container'>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/registro' element={<Register />} />
          <Route path='/ingresar' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/perfil' element={<Profile />} />
          <Route path='/favoritos' element={<Favorites />} />
          <Route path='/nuevo' element={<NewProductPage />} />
          <Route path='/productos/editar/:id' element={<EditProduct />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/productos/:id' element={<DetailProduct />} />
        <Route path='/productos' element={<Gallery />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
