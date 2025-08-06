import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PizzaProvider from '../context/ProductsContext'
import { NotFound, Profile, ProtectedRoutes, PublicRoutes } from '../components'
import { Home, Login, Register, Cart, Pizza } from '../pages'

const AppRoutes = () => {
  return (
    <div className='content container'>
      <Routes>
        <Route path='/' element={<PizzaProvider><Home /></PizzaProvider>} />
        <Route element={<PublicRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/pizza/:id' element={<PizzaProvider><Pizza /></PizzaProvider>} />
        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
