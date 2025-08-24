import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { UserContext } from '../../context/UserContext'
import { toastWarning, toastError, toastSuccess } from '../../utils/toast'

const Register = () => {
  const [users, setUsers] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    repeatPassword: ''
  })
  const { registerCliente } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nombre, email, telefono, direccion, password, repeatPassword } = users

    if (!nombre.trim() || !email.trim() || !telefono.trim() || !direccion.trim() || !password.trim() || !repeatPassword.trim()) { toastWarning('⚠️ Todos los campos son obligatorios!'); return }
    if (password !== repeatPassword) { toastError('❌ Las contraseñas no coinciden!'); return }
    if (password.length < 6) { toastError('🔒 La contraseña debe tener al menos 6 caracteres'); return }

    try {
      await registerCliente({ nombre, email, telefono, direccion, password })
      toastSuccess('✅ Usuario creado correctamente!')
      setUsers({ nombre: '', email: '', telefono: '', direccion: '', password: '', repeatPassword: '' })
      navigate('/')
    } catch (error) { const errorMsg = error.response?.data?.message || '❌ Error al registrar usuario'; toastError(errorMsg) }
  }

  return (
    <div className='register-container mt-4'>
      <p className='fs-3 fw-bold'>Registro</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='nombre'
            name='nombre'
            value={users.nombre}
            onChange={handleChange}
            placeholder='Nombre'
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
            type='text'
            className='form-control'
            id='telefono'
            name='telefono'
            value={users.telefono}
            onChange={handleChange}
            placeholder='Telefono'
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='direccion'
            name='direccion'
            value={users.direccion}
            onChange={handleChange}
            placeholder='Direccion'
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
