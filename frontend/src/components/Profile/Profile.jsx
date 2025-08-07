import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import './Profile.css'

const Profile = () => {
  const { user, getProfile, logout } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile()
      } catch (err) {
        console.log(err)
        setError('Hubo un error al cargar el perfil.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return <p>⏳ Cargando perfil...</p>
  }

  if (error || !user) {
    return <p>⚠️ {error || 'No se pudo cargar el perfil.'}</p>
  }

  return (
    <div className='perfil-container'>
      <div className='sidebar'>
        <div className='perfil-img' />
        <ul className='perfil-menu'>
          <li>Datos Personales</li>
          <li>Compras</li>
          <li className='active'>Productos</li>
          <li>Tarjetas</li>
          <li>Direcciones</li>
        </ul>
        <div className='perfil-buttons'>
          <button className='btn-perfil'>Borrar Cuenta</button>
          <button className='btn-perfil'>Cerrar Sesion</button>
        </div>
      </div>

      <div className='form-section'>
        <form className='product-form'>
          <div className='form-group'>
            <label>Nombre</label>
            <input type='text' />
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label>Precio</label>
              <input type='number' />
            </div>
            <div className='form-group'>
              <label>Stock</label>
              <input type='number' />
            </div>
          </div>
          <div className='form-group'>
            <label>Categoria</label>
            <input type='text' />
          </div>
          <div className='form-group'>
            <label>Imagen</label>
            <input type='text' placeholder='URL de imagen' />
          </div>
          <div className='form-group'>
            <label>Detalle del producto</label>
            <textarea rows='4' />
          </div>
          <div className='submit-container'>
            <button className='btn-perfil'>Crear Publicacion</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
