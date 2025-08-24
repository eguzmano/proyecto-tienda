import { createContext, useEffect, useMemo, useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { toastSuccess, toastError, toastWarning } from '../utils/toast'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const navigate = useNavigate()

  const authResponse = (data, redirectPath = '/perfil') => {
    if (data?.token) {
      setToken(data.token)
      if (data.user) {
        setUser(data.user)
      } else {
        setUser({
          id: data.id,
          email: data.email,
          nombre: data.nombre,
          rol_id: data.rol_id
        })
      }
      toastSuccess(`✅ Bienvenido ${data.nombre || data.email}`)
      navigate(redirectPath)
    } else {
      toastError('❌ Credenciales incorrectas')
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      if (data?.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setUser({
          id: data.id,
          email: data.email,
          nombre: data.nombre,
          rol_id: data.rol_id
        })
        toastSuccess(`✅ Bienvenido ${data.nombre || data.email}`)
        navigate('/perfil')
      }
    } catch (error) {
      console.error('Login error', error)
      toastWarning(`⚠️ ${error?.response?.data?.message || 'Error al iniciar sesión'}`)
    }
  }

  const registerCliente = async (userData) => {
    try {
      const { data } = await api.post('/api/auth/register', userData)
      authResponse(data, '/')
    } catch (error) {
      console.error('Register cliente error', error)
      toastError(`❌ ${error?.response?.data?.message || 'Error al registrar usuario'}`)
    }
  }
  const registerAdmin = async (userData) => {
    try {
      const { data } = await api.post('/api/auth/register/admin', userData)
      authResponse(data, '/')
    } catch (error) {
      console.error('Register admin error', error)
      toastError(`❌ ${error?.response?.data?.message || 'Error al registrar Administrador'}`)
    }
  }

  const getProfile = async () => {
    try {
      const { data } = await api.get('/api/user/me')
      setUser(data)
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      setUser(null)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    navigate('/ingresar')
  }

  const deleteAccount = async (id) => {
    try {
      if (!id) throw new Error('ID inválido')
      await api.delete(`/api/user/${id}`)
      toastSuccess('Cuenta eliminada')
      logout()
    } catch (error) {
      console.error('Delete account error', error)
      toastError(error?.response?.data?.error || 'No se pudo eliminar la cuenta')
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (token && !user) {
      getProfile()
    }
  }, [token])

  const globalState = useMemo(() => ({
    token,
    user,
    login,
    logout,
    registerCliente,
    registerAdmin,
    getProfile,
    deleteAccount
  }), [token, user])

  return <UserContext.Provider value={globalState}>{children}</UserContext.Provider>
}

export default UserProvider
