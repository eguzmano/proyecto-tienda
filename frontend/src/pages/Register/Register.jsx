import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { UserContext } from '../../context/UserContext'
import showToast from '../../utils/showToast'

const Register = () => {
  const [users, setUsers] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    repeatPassword: ''
  })
  const { register } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, lastname, email, password, repeatPassword } = users

    // Validaciones
    if (!name.trim() || !lastname.trim() || !email.trim() || !password.trim() || !repeatPassword.trim()) {
      showToast('⚠️ Todos los campos son obligatorios!', 'error')
      return
    }
    if (password !== repeatPassword) {
      showToast('❌ Las contraseñas no coinciden!', 'error')
      return
    }
    if (password.length < 6) {
      showToast('🔒 La contraseña debe tener al menos 6 caracteres', 'error')
      return
    }

    try {
      // Llamar a la función registerUser desde el contexto
      await register({ name, lastname, email, password })
      showToast('✅ Usuario creado correctamente!', 'success')
      setUsers({ name: '', lastname: '', email: '', password: '', repeatPassword: '' })
      navigate('/')
    } catch (error) {
      const errorMsg = error.response?.data?.message || '❌ Error al registrar usuario'
      showToast(errorMsg, 'error')
    }
  }

  return (
    <div className='register-container mt-4'>
      <p className='fs-3 fw-bold'>Registro</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={users.name}
            onChange={handleChange}
            placeholder='Nombre'
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='lastname'
            name='lastname'
            value={users.lastname}
            onChange={handleChange}
            placeholder='Apellido'
          />
        </div>
        <div className='mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={users.email}
            onChange={handleChange}
            placeholder='Email'
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={users.password}
            onChange={handleChange}
            placeholder='Contraseña'
          />
        </div>
        <div className='mb-5'>
          <input
            type='password'
            className='form-control'
            id='repeatPassword'
            name='repeatPassword'
            value={users.repeatPassword}
            onChange={handleChange}
            placeholder='Repite tu Contraseña'
          />
        </div>
        <button type='submit' className='btn btn-dark'>
          Crear Cuenta
        </button>
      </form>
    </div>
  )
}

export default Register
