import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { NewProduct } from '../../components'
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../config/env'

const EditProduct = () => {
  const { id } = useParams()
  const { fetchProduct, product, updateProduct } = useContext(ProductContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct(id).then(() => setLoading(false))
  }, [id, fetchProduct])

  const handleUpdateProduct = async (payload) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/productos/${id}`, payload)
      const updated = data.producto || { ...payload, id }
      updateProduct(updated)
      Swal.fire('¡Producto actualizado!', '', 'success')
      navigate('/productos')
    } catch (error) {
      Swal.fire('Error al actualizar producto', error?.response?.data?.error || '', 'error')
    }
  }

  if (loading || !product) return <p>Cargando...</p>

  return (
    <NewProduct
      initialProduct={product}
      onSubmit={handleUpdateProduct}
      editMode
    />
  )
}

export default EditProduct
