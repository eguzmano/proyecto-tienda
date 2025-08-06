import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'

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
    <div className='card text-center w-50 mx-auto mt-5'>
      <div className='card-header'>
        <h4 className='m-1'>Perfil</h4>
      </div>
      <div className='card-body d-flex flex-column align-items-start'>
        <h5 className='card-title my-3'>Usuario: {user.email}</h5>
      </div>
      <div className='card-footer text-body-secondary d-flex justify-content-between'>
        <p className='my-auto'>Actualiza tus datos.</p>
        <button className='btn btn-dark px-5' onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Profile
