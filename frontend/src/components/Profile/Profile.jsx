import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Button, Form } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import Swal from 'sweetalert2'
import './Profile.css'
import { API_URL } from '../../config/env'
import formatNumber from '../../utils/formatNumber'
import { ProductContext } from '../../context/ProductsContext'

const Profile = () => {
  const { user, getProfile } = useContext(UserContext)
  const { products } = useContext(ProductContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const [activeSection, setActiveSection] = useState('datos') // 'datos' | 'direccion' | 'compras'
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState(null)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState([])
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState(null)

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

  // Cargar ventas y filtrar por usuario
  useEffect(() => {
    const fetchOrders = async () => {
      if (activeSection !== 'compras' || !user?.id) return
      try {
        setOrdersLoading(true)
        setOrdersError(null)
        const res = await fetch(`${API_URL}/api/ventas`)
        if (!res.ok) throw new Error('No se pudieron cargar las compras')
        const data = await res.json()
        const ventas = Array.isArray(data.ventas) ? data.ventas : []
        setOrders(ventas.filter(v => Number(v.cliente_id) === Number(user.id)))
      } catch (e) {
        setOrders([])
        setOrdersError(e.message)
      } finally {
        setOrdersLoading(false)
      }
    }
    fetchOrders()
  }, [activeSection, user])

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

  const loadOrderDetails = async (ventaId) => {
    if (!ventaId) return
    try {
      setDetailsLoading(true)
      setDetailsError(null)
      setSelectedOrder(ventaId)

      const res = await fetch(`${API_URL}/api/detalleVenta/${ventaId}`)
      if (!res.ok) throw new Error('No se pudo obtener el detalle de la compra')
      const data = await res.json()

      // Normalizar respuesta
      let raw = []
      if (Array.isArray(data.productos)) {
        raw = data.productos
      } else if (Array.isArray(data.producto)) {
        // ← Aquí estaba el problema: data.producto ya es un array
        raw = data.producto
      } else if (Array.isArray(data)) {
        raw = data
      } else if (data.producto) {
        raw = [data.producto]
      }

      // Enriquecer
      const parsed = raw.map(d => {
        const prod = products.find(p => Number(p.id) === Number(d.producto_id)) || {}
        const cantidad = Number(d.cantidad) || 0
        const precio = Number(d.precio_unitario ?? prod.precio ?? 0)
        return {
          ...d,
          nombre: prod.nombre || `Producto #${d.producto_id}`,
          imagen_url: prod.imagen_url,
          cantidad,
          precio_unitario: precio,
          subtotal: cantidad * precio
        }
      })
      setOrderDetails(parsed)
    } catch (e) {
      setOrderDetails([])
      setDetailsError(e.message)
    } finally {
      setDetailsLoading(false)
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
          <Button
            variant='outline-secondary'
            className='profile-menu-btn mb-2'
            onClick={() => setActiveSection('compras')}
            active={activeSection === 'compras'}
          >
            Compras
          </Button>
          <Button variant='outline-secondary' className='profile-menu-btn mb-2' onClick={() => setActiveSection('direccion')} active={activeSection === 'direccion'}>
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
        {activeSection === 'compras' && (
          <>
            <h3 className='profile-title mb-4'>Mis Compras</h3>
            {ordersLoading && <p>Cargando compras...</p>}
            {ordersError && <p className='text-danger'>{ordersError}</p>}
            {!ordersLoading && !ordersError && orders.length === 0 && (
              <p className='text-muted'>Aún no tienes compras.</p>
            )}
            {!ordersLoading && orders.length > 0 && (
              <div className='table-responsive'>
                <table className='table align-middle'>
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        {/* <td>{o.id}</td> */}
                        <td>{new Date(o.fecha).toLocaleString()}</td>
                        <td>{o.estado}</td>
                        <td>${formatNumber(Number(o.total || 0))}</td>
                        <td>
                          <button
                            className='btn btn-sm btn-outline-secondary'
                            onClick={() => loadOrderDetails(o.id)}
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedOrder && (
              <div className='mt-3'>
                <h5>Detalle de compra #{selectedOrder}</h5>
                {detailsLoading && <p>Cargando detalle...</p>}
                {detailsError && <p className='text-danger'>{detailsError}</p>}
                {!detailsLoading && !detailsError && orderDetails.length === 0 && (
                  <p className='text-muted'>Sin ítems para esta compra.</p>
                )}
                {!detailsLoading && orderDetails.length > 0 && (
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th className='text-end'>Cant.</th>
                          <th className='text-end'>P. unitario</th>
                          <th className='text-end'>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.map((d, i) => (
                          <tr key={`${d.producto_id}-${i}`}>
                            <td>
                              {d.imagen_url && (
                                <img src={d.imagen_url} alt={d.nombre} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, marginRight: 8 }} />
                              )}
                              {d.nombre}
                            </td>
                            <td className='text-end'>{d.cantidad}</td>
                            <td className='text-end'>${formatNumber(d.precio_unitario)}</td>
                            <td className='text-end'>${formatNumber(d.subtotal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
