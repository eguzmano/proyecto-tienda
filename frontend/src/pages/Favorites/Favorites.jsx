import { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import { ProductContext } from '../../context/ProductsContext'
import { CardProduct } from '../../components'
import './Favorites.css'

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)
  const { products, removeProduct } = useContext(ProductContext)

  const favoriteProducts = favorites
    .map(fav => products.find(p => Number(p.id) === Number(fav.producto_id)))
    .filter(Boolean)

  return (
    <div className='favorites-page d-flex flex-wrap justify-content-center'>
      {favoriteProducts.length === 0
        ? <p>No tienes productos favoritos.</p>
        : favoriteProducts.map(producto => (
          <CardProduct key={producto.id} {...producto} onDelete={removeProduct} />
        ))}
    </div>
  )
}

export default Favorites
