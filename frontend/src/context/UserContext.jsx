import { createContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const swalOptions = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  customClass: {
    popup: 'custom-toast',
    title: 'custom-title'
  }
}

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const navigate = useNavigate()

  // maneja la respuesta de autenticación
  const authResponse = (data, redirectPath = '/perfil') => {
    if (data?.token) {
      setToken(data.token)
      setUser({ email: data.email })
      Swal.fire({
        ...swalOptions,
        icon: 'success',
        title: `✅ Bienvenido ${data.email}`
      })
      navigate(redirectPath)
    } else {
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: '❌ Credenciales incorrectas'
      })
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      if (data?.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setUser({ email: data.email })
        Swal.fire({
          ...swalOptions,
          icon: 'success',
          title: `✅ Bienvenido ${data.email}`
        })
        navigate('/perfil')
      }
    } catch (error) {
      Swal.fire({
        ...swalOptions,
        icon: 'warning',
        title: `⚠️ ${error?.response?.data?.message || 'Error al iniciar sesión'}`
      })
    }
  }

  const register = async (userData) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', userData)
      authResponse(data, '/')
    } catch (error) {
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: `❌ ${error?.response?.data?.message || 'Error al registrar usuario'}`
      })
    }
  }

  const getProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Datos recibidos:', data)
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

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
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
