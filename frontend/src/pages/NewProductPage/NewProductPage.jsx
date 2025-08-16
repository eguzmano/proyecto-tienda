import { NewProduct } from '../../components'
import axios from 'axios'
import Swal from 'sweetalert2'

const NewProductPage = () => {
  const handleCreateProduct = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/productos', product)
      Swal.fire('¡Producto creado!', '', 'success')
    } catch (error) {
      Swal.fire('Error al crear producto', error?.response?.data?.error || '', 'error')
    }
  }

  return <NewProduct onSubmit={handleCreateProduct} />
}

export default NewProductPage
