import { Route, Routes } from 'react-router-dom'
import { NewProduct, Profile, ProtectedRoutes, PublicRoutes } from '../components'
import { Home, Login, Register, DetailProduct, Gallery, Cart, Favorites } from '../pages'

const AppRoutes = () => {
  return (
    <div className='content container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PublicRoutes />}>
          <Route path='/registro' element={<Register />} />
          <Route path='/ingresar' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/perfil' element={<Profile />} />
          <Route path='/favoritos' element={<Favorites />} />
          <Route path='/nuevo' element={<NewProduct />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/pizza/:id' element={<DetailProduct />} />
        <Route path='/categorias' element={<Gallery />} />

        {/* <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default AppRoutes
