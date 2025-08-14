import { Link, useLocation, useNavigate } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { ArrowLeft } from 'react-bootstrap-icons'
import './Breadcrumb.css'

const StoreBreadcrumb = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathnames = location.pathname.split('/').filter(x => x)

  const nameMap = {
    productos: 'Productos',
    categorias: 'Categorías',
    cart: 'Carrito',
    perfil: 'Perfil',
    favoritos: 'Favoritos',
    nuevo: 'Nuevo Producto'
  }

  return (
    <div className='store-breadcrumb-container d-flex align-items-center my-3 mx-5'>
      {pathnames.length > 0 && (
        <button
          className='btn btn-link p-0 me-3'
          onClick={() => navigate(-1)}
          aria-label='Volver'
          style={{ fontSize: '1.4rem', textDecoration: 'none' }}
        >
          <ArrowLeft />
        </button>
      )}
      <Breadcrumb className='mt-3'>
        <Breadcrumb.Item linkAs={Link} to='/'>Inicio</Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          const displayName = nameMap[name] || decodeURIComponent(name)
          return isLast
            ? (
              <Breadcrumb.Item active key={name}>
                {displayName}
              </Breadcrumb.Item>
              )
            : (
              <Breadcrumb.Item linkAs={Link} to={routeTo} key={name}>
                {displayName}
              </Breadcrumb.Item>
              )
        })}
      </Breadcrumb>
    </div>
  )
}

export default StoreBreadcrumb
