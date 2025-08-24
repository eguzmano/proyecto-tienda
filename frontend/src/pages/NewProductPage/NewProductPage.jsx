import { NewProduct } from '../../components'
import api from '../../api/api'
import { toastSuccess, toastError } from '../../utils/toast'
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { useNavigate } from 'react-router-dom'

const NewProductPage = () => {
  const { addProduct } = useContext(ProductContext)
  const navigate = useNavigate()

  const handleCreateProduct = async (product) => {
    try {
      const { data } = await api.post('/api/productos', product)
      const created = data.Producto || data.producto || null
      if (created) addProduct(created)
      toastSuccess('¡Producto creado!')
      navigate('/productos')
    } catch (error) {
      toastError(error?.response?.data?.error || 'Error al crear producto')
    }
  }

  return <NewProduct onSubmit={handleCreateProduct} />
}

export default NewProductPage
