import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { CardProduct } from '../../components'
import './Gallery.css'

const Gallery = () => {
  const { products } = useContext(ProductContext)

  return (
    <div className='cards'>
      {products?.length > 0
        ? (
            products.map(({ nombre, img, precio, descripcion, id }) => (
              <CardProduct
                key={id}
                id={id}
                nombre={nombre}
                img={img}
                precio={precio}
                descripcion={descripcion}
              />
            ))
          )
        : (
          <p>Cargando products...</p>
          )}
    </div>
  )
}

export default Gallery
