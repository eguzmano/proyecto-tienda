import { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { CardProduct } from '../../components'
import './Gallery.css'

// Ejemplo de categorías (puedes traerlas de contexto o backend si lo prefieres)
const categorias = [
  { id: 1, nombre: 'Cajoneras' },
  { id: 2, nombre: 'Jugueteros' },
  { id: 3, nombre: 'Muebles' },
  { id: 4, nombre: 'Libreros' }
]

const Gallery = () => {
  const { products } = useContext(ProductContext)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

  // Para cada categoría, busca la imagen de un producto de esa categoría
  const categoriasConImagen = categorias.map(cat => {
    const producto = products.find(p => p.categoria_id === cat.id)
    return {
      ...cat,
      imagen: producto ? producto.imagen_url : 'https://placehold.co/200x100?text=Sin+imagen'
    }
  })

  // Filtra productos por categoría si hay una seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? products.filter(producto => producto.categoria_id === categoriaSeleccionada)
    : products

  return (
    <div>
      {/* Categorías */}
      <div className='gallery-categorias'>
        {categoriasConImagen.map(cat => (
          <div
            key={cat.id}
            className={`gallery-categoria-img${categoriaSeleccionada === cat.id ? ' selected' : ''}`}
            onClick={() => setCategoriaSeleccionada(Number(cat.id))}
            style={{
              backgroundImage: `url(${cat.imagen})`,
              cursor: 'pointer'
            }}
          >
            <span className='gallery-categoria-nombre'>{cat.nombre}</span>
          </div>
        ))}
        {/* Botón para limpiar filtro */}
        {categoriaSeleccionada && (
          <button className='gallery-categoria-clear' onClick={() => setCategoriaSeleccionada(null)}>
            Ver todas
          </button>
        )}
      </div>

      {/* Productos */}
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
