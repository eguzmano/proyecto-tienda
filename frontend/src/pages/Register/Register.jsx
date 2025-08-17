import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Register = () => {
  const [users, setUsers] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    repeatPassword: ''
  })
  const [isAdmin, setIsAdmin] = useState(false) // Nuevo estado
  const { registerCliente, registerAdmin } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nombre, email, telefono, direccion, password, repeatPassword } = users

    if (!nombre.trim() || !email.trim() || !telefono.trim() || !direccion.trim() || !password.trim() || !repeatPassword.trim()) {
      Swal.fire({
        ...swalOptions,
        icon: 'warning',
        title: '⚠️ Todos los campos son obligatorios!'
      })
      return
    }
    if (password !== repeatPassword) {
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: '❌ Las contraseñas no coinciden!'
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
      if (isAdmin) {
        await registerAdmin({ nombre, email, telefono, direccion, password })
      } else {
        await registerCliente({ nombre, email, telefono, direccion, password })
      }
      Swal.fire({
        ...swalOptions,
        icon: 'success',
        title: '✅ Usuario creado correctamente!'
      })
      setUsers({ nombre: '', email: '', telefono: '', direccion: '', password: '', repeatPassword: '' })
      setIsAdmin(false)
      navigate('/')
    } catch (error) {
      const errorMsg = error.response?.data?.message || '❌ Error al registrar usuario'
      Swal.fire({
        ...swalOptions,
        icon: 'error',
        title: errorMsg
      })
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
        <div className='mb-3'>
          <label>
            <input
              type='checkbox'
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Registrar como administrador
          </label>
        </div>
        <button type='submit' className='btn btn-dark'>
          Crear Cuenta
        </button>
      </form>
    </div>
  )
}

export default Register
