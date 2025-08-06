import { createContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import showToast from '../utils/showToast'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  // maneja la respuesta de autenticación
  const authResponse = (data, redirectPath = '/profile') => {
    if (data?.token) {
      setToken(data.token)
      setUser({ email: data.email })
      showToast(`✅ Bienvenido ${data.email}`, 'success')
      navigate(redirectPath)
    } else {
      showToast('❌ Credenciales incorrectas', 'error')
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      authResponse(data)
    } catch (error) {
      showToast(`⚠️ ${error?.response?.data?.message || 'Error al iniciar sesión'}`, 'warning')
    }
  }

  const register = async (userData) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', userData)
      authResponse(data, '/')
    } catch (error) {
      showToast(`❌ ${error?.response?.data?.message || 'Error al registrar usuario'}`, 'error')
    }
  }

  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
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
    navigate('/login')
  }

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  }, [token])

  const globalState = useMemo(() => ({
    token,
    user,
    login,
    logout,
    register,
    getProfile
  }), [token, user])

  return <UserContext.Provider value={globalState}>{children}</UserContext.Provider>
}

export default UserProvider
