import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductContext } from '../../context/ProductsContext'
import { CardProduct } from '../../components'
import './Gallery.css'

const categorias = [
  { id: 1, nombre: 'Cajoneras' },
  { id: 2, nombre: 'Jugueteros' },
  { id: 3, nombre: 'Muebles' },
  { id: 4, nombre: 'Libreros' }
]

const Gallery = () => {
  const { products, removeProduct } = useContext(ProductContext)
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const categoriaParam = params.get('categoria')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categoriaParam ? Number(categoriaParam) : null
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoriaParam = params.get('categoria')
    const qParam = (params.get('q') || '').trim()
    setCategoriaSeleccionada(categoriaParam ? Number(categoriaParam) : null)
    setQuery(qParam)
  }, [location.search])

  const handleSelectCategoria = (id) => {
    setCategoriaSeleccionada(Number(id))
    setQuery('')
    const sp = new URLSearchParams(location.search)
    sp.set('categoria', String(id))
    sp.delete('q')
    navigate(`/productos?${sp.toString()}`)
  }

  const handleVerTodas = () => {
    setCategoriaSeleccionada(null)
    setQuery('')
    navigate('/productos')
  }

  const categoriasConImagen = categorias.map(cat => {
    const producto = products.find(p => p.categoria_id === cat.id)
    return {
      ...cat,
      imagen: producto ? producto.imagen_url : 'https://placehold.co/200x100?text=Sin+imagen'
    }
  })

  const porCategoria = categoriaSeleccionada
    ? products.filter(producto => producto.categoria_id === categoriaSeleccionada)
    : products

  const q = query.toLowerCase()
  const productosFiltrados = q
    ? porCategoria.filter(p =>
      (p.nombre?.toLowerCase().includes(q)) ||
        (p.descripcion?.toLowerCase().includes(q))
    )
    : porCategoria

  return (
    <div>
      <div className='gallery-categorias'>
        {categoriasConImagen.map(cat => (
          <div
            key={cat.id}
            className={`gallery-categoria-img${categoriaSeleccionada === cat.id ? ' selected' : ''}`}
            onClick={() => handleSelectCategoria(cat.id)}
            style={{
              backgroundImage: `url(${cat.imagen})`,
              cursor: 'pointer'
            }}
          >
            <span className='gallery-categoria-nombre'>{cat.nombre}</span>
          </div>
        ))}
        {categoriaSeleccionada && (
          <button className='gallery-categoria-clear' onClick={handleVerTodas}>
            Ver todas
          </button>
        )}
      </div>

      <div className='cards'>
        {productosFiltrados?.length > 0
          ? (
              productosFiltrados.map(({ nombre, imagen_url, precio, id }) => (
                <CardProduct
                  key={id}
                  id={id}
                  nombre={nombre}
                  imagen_url={imagen_url}
                  precio={precio}
                  onDelete={removeProduct}
                />
              ))
            )
          : (
            <p>No hay productos para esta categoría.</p>
            )}
      </div>
    </div>
  )
}

export default Gallery
