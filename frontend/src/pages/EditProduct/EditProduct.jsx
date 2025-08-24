import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { NewProduct } from '../../components'
import api from '../../api/api'
import { toastSuccess, toastError } from '../../utils/toast'

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
      const { data } = await api.put(`/api/productos/${id}`, payload)
      const updated = data.producto || { ...payload, id }
      updateProduct(updated)
      toastSuccess('¡Producto actualizado!')
      navigate('/productos')
    } catch (error) {
      toastError(error?.response?.data?.error || 'Error al actualizar producto')
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
