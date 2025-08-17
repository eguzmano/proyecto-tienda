import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Button, Form } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import Swal from 'sweetalert2'
import './Profile.css'

const Profile = () => {
  const { user, getProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const [activeSection, setActiveSection] = useState('datos') // 'datos' o 'direccion'

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

  const handleEditImage = () => {
    Swal.fire({
      title: 'Cargar imagen de perfil',
      html: `
        <input id="swal-input-url" class="swal2-input" placeholder="URL de la imagen" type="url" />
        <img id="swal-preview-img" src="${preview || user.imageUrl || 'https://placehold.co/120x120?text=Foto'}" alt="Vista previa" style="width:120px;height:120px;border-radius:50%;margin-top:1rem;object-fit:cover;" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-modal-popup',
        title: 'custom-modal-title',
        confirmButton: 'custom-modal-confirm',
        cancelButton: 'custom-modal-cancel',
        input: 'custom-modal-input'
      },
      didOpen: () => {
        const input = document.getElementById('swal-input-url')
        const img = document.getElementById('swal-preview-img')
        input.addEventListener('input', (e) => {
          img.src = e.target.value || 'https://placehold.co/120x120?text=Foto'
        })
      }
    })
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
          <div className='edit-icon' onClick={handleEditImage}>
            <PencilSquare size={22} />
          </div>
        </div>
        <div className='profile-menu'>
          <Button
            variant='outline-secondary'
            className='profile-menu-btn mb-2'
            onClick={() => setActiveSection('datos')}
            active={activeSection === 'datos'}
          >
            Datos Personales
          </Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2' disabled>Compras</Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2' disabled>Tarjetas</Button>
          <Button
            variant='outline-secondary'
            className='profile-menu-btn mb-2'
            onClick={() => setActiveSection('direccion')}
            active={activeSection === 'direccion'}
          >
            Direcciones
          </Button>
        </div>
        <Button variant='outline-danger' className='delete-account-btn mt-4'>Borrar Cuenta</Button>
      </div>
      <div className='profile-content'>
        {activeSection === 'datos' && (
          <>
            <h3 className='profile-title mb-4'>Datos Personales</h3>
            <Form>
              <Form.Group className='mb-3' controlId='formName'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type='text' value={user.nombre || ''} disabled />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Correo</Form.Label>
                <Form.Control type='email' value={user.email || ''} disabled />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formTelefono'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type='text' value={user.telefono || ''} disabled />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formRol'>
                <Form.Label>Rol</Form.Label>
                <Form.Control type='text' value={user.rol_id === 1 ? 'Cliente' : 'Admin'} disabled />
              </Form.Group>
            </Form>
          </>
        )}
        {activeSection === 'direccion' && (
          <>
            <h3 className='profile-title mb-4'>Dirección</h3>
            <Form>
              <Form.Group className='mb-3' controlId='formDireccion'>
                <Form.Label>Dirección</Form.Label>
                <Form.Control type='text' value={user.direccion || ''} disabled />
              </Form.Group>
            </Form>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
