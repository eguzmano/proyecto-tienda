import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const StoreBreadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  // Diccionario de nombres amigables
  const nameMap = {
    productos: 'Productos',
    categorias: 'Categorías',
    carrito: 'Carrito',
    perfil: 'Perfil',
    favoritos: 'Favoritos',
    nuevo: 'Nuevo Producto'
    // Puedes agregar más según tus rutas
  }

  return (
    <Breadcrumb className='my-3 mx-5'>
      <Breadcrumb.Item as={Link} to='/'>Inicio</Breadcrumb.Item>

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
            <Breadcrumb.Item as={Link} to={routeTo} key={name}>
              {displayName}
            </Breadcrumb.Item>
            )
      })}
    </Breadcrumb>
  )
}

export default StoreBreadcrumb
