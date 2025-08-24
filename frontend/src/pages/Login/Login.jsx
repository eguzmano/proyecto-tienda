import { useContext, useState } from 'react'
import './Login.css'
import { UserContext } from '../../context/UserContext'
import { toastWarning, toastError } from '../../utils/toast'

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const { login } = useContext(UserContext)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = user

    if (!email.trim() || !password.trim()) { toastWarning('⚠️ Todos los campos son obligatorios!'); return }
    if (password.length < 6) { toastError('🔒 La contraseña debe tener al menos 6 caracteres'); return }

    try {
      await login(email, password)
    } catch (error) { console.error('Error al iniciar sesión:', error); toastError('❌ Error en el inicio de sesión') }

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
