import { Link, useLocation, useNavigate } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { ArrowLeft } from 'react-bootstrap-icons'
import './Breadcrumb.css'
import { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/ProductsContext'

const StoreBreadcrumb = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathnames = location.pathname.split('/').filter(x => x)

  const { products, product, fetchProduct } = useContext(ProductContext)

  const isProductRoute = pathnames[0] === 'productos'
  const lastSegment = pathnames[pathnames.length - 1]
  const lastId = Number(lastSegment)
  const prodFromList = (isProductRoute && !Number.isNaN(lastId))
    ? products.find(p => Number(p.id) === lastId)
    : null
  const currentProductName =
    prodFromList?.nombre ||
    ((product && Number(product.id) === lastId) ? product.nombre : null)

  useEffect(() => {
    if (isProductRoute && !Number.isNaN(lastId) && !prodFromList) {
      fetchProduct?.(lastId)
    }
  }, [isProductRoute, lastId, prodFromList, fetchProduct])

  const nameMap = {
    productos: 'Productos',
    categorias: 'Categorías',
    cart: 'Carrito',
    perfil: 'Perfil',
    favoritos: 'Favoritos',
    nuevo: 'Nuevo Producto',
    editar: 'Editar Producto',
    registro: 'Registro',
    ingresar: 'Ingresar'
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
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          // Si el último segmento es un ID de producto, muestra su nombre
          const displayName = (isLast && isProductRoute && !Number.isNaN(Number(name)))
            ? (currentProductName || '...')
            : (nameMap[name] || decodeURIComponent(name))
          return isLast
            ? (
              <Breadcrumb.Item active key={name}>
                {displayName}
              </Breadcrumb.Item>
              )
            : (
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={name}>
                {displayName}
              </Breadcrumb.Item>
              )
        })}
      </Breadcrumb>
    </div>
  )
}

export default StoreBreadcrumb
