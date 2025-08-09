import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const ProtectedRoutes = () => {
  const { token } = useContext(UserContext)
  return token ? <Outlet /> : <Navigate to='/ingresar' />
}

export default ProtectedRoutes
