import { useContext, useState } from 'react'
import './Login.css'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const { login } = useContext(UserContext)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = user
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

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        ...swalOptions,
        icon: 'warning',
        title: '⚠️ Todos los campos son obligatorios!'
      })
      return
    }
    if (password.length < 6) {
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: '🔒 La contraseña debe tener al menos 6 caracteres'
      })
      return
    }

    try {
      await login(email, password)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: '❌ Error en el inicio de sesión'
      })
    }

    setUser({ email: '', password: '' })
  }

  return (
    <div className='login-container mt-4'>
      <p className='fs-3 fw-bold'>Iniciar sesión</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Ingresa tu Email'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Contraseña</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Contraseña'
          />
        </div>

        <button
          type='submit'
          className='btn btn-dark'
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
