import { NewProduct } from '../../components'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { useNavigate } from 'react-router-dom'

const NewProductPage = () => {
  const { addProduct } = useContext(ProductContext)
  const navigate = useNavigate()

  const handleCreateProduct = async (product) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/productos', product)
      const created = data.Producto || data.producto || null
      if (created) addProduct(created)
      Swal.fire('¡Producto creado!', '', 'success')
      navigate('/productos')
    } catch (error) {
      Swal.fire('Error al crear producto', error?.response?.data?.error || '', 'error')
    }
  }

  return <NewProduct onSubmit={handleCreateProduct} />
}

export default NewProductPage
