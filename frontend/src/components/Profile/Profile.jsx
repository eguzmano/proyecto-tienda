import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Button, Form } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import './Profile.css'

const Profile = () => {
  const { user, getProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState(null)
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile()
      } catch (err) {
        setError('Hubo un error al cargar el perfil.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  if (loading) return <p>⏳ Cargando perfil...</p>
  if (error || !user) return <p>⚠️ {error || 'No se pudo cargar el perfil.'}</p>

  return (
    <div className='profile-main-container'>
      <div className='profile-sidebar'>
        <div className='profile-image-wrapper'>
          <img
            src={preview || user.imageUrl || 'https://placehold.co/120x120?text=Foto'}
            alt='Foto de perfil'
            className='profile-image'
          />
          <div className='edit-icon' onClick={() => setShowModal(true)}>
            <PencilSquare size={22} />
          </div>
        </div>
        <div className='profile-menu'>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2'>Datos Personales</Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2'>Compras</Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2'>Tarjetas</Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2'>Direcciones</Button>
        </div>
        <Button variant='outline-danger' className='delete-account-btn mt-4'>Borrar Cuenta</Button>
      </div>
      <div className='profile-content'>
        <h3 className='profile-title mb-4'>Datos Personales</h3>
        <Form>
          <Form.Group className='mb-3' controlId='formName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' value={user.name || ''} disabled />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLastname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type='text' value={user.lastname || ''} disabled />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type='email' value={user.email || ''} disabled />
          </Form.Group>
        </Form>

      </div>
    </div>
  )
}

export default Profile
