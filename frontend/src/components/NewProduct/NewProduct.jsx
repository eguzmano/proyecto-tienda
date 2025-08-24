import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toastWarning } from '../../utils/toast'
import { useNavigate } from 'react-router-dom'
import './NewProduct.css'

const categoryMap = {
  Cajonera: 1,
  Juguetero: 2,
  Mueble: 3,
  Librero: 4
}

const NewProduct = ({ initialProduct, onSubmit, editMode }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (initialProduct) {
      setProduct({
        name: initialProduct.nombre || '',
        description: initialProduct.descripcion || '',
        price: initialProduct.precio || '',
        stock: initialProduct.stock || '',
        category: Object.keys(categoryMap).find(
          key => categoryMap[key] === initialProduct.categoria_id
        ) || '',
        imageUrl: initialProduct.imagen_url || ''
      })
    }
  }, [initialProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!product.name || !product.description || !product.price || !product.stock || !product.category || !product.imageUrl) {
      toastWarning('Todos los campos son obligatorios')
      return
    }
    const payload = {
      nombre: product.name,
      descripcion: product.description,
      precio: product.price,
      stock: product.stock,
      imagen_url: product.imageUrl,
      categoria_id: categoryMap[product.category] || 5
    }
    if (editMode && initialProduct?.id) {
      payload.id = initialProduct.id
    }
    await onSubmit(payload)
  }
  return (
    <Form className='product-form-container p-4 border rounded bg-light' onSubmit={handleSubmit}>
      <h4 className='mb-4'>{editMode ? 'Editar Producto' : 'Nuevo Producto'}</h4>

      <Form.Group className='mb-3'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type='text'
          name='name'
          value={product.name}
          onChange={handleChange}
          placeholder='Nombre del producto'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          name='description'
          value={product.description}
          onChange={handleChange}
          placeholder='Descripción del producto'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type='number'
          min='0'
          name='price'
          value={product.price}
          onChange={handleChange}
          placeholder='Precio'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type='number'
          min='0'
          name='stock'
          value={product.stock}
          onChange={handleChange}
          placeholder='Cantidad disponible'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Categoría</Form.Label>
        <Form.Select
          name='category'
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value=''>Seleccione una categoría</option>
          <option value='Cajonera'>Cajonera</option>
          <option value='Juguetero'>Juguetero</option>
          <option value='Mueble'>Mueble</option>
          <option value='Librero'>Librero</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label>URL de imagen</Form.Label>
        <Form.Control
          type='url'
          name='imageUrl'
          value={product.imageUrl}
          onChange={handleChange}
          placeholder='https://...'
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit' className='w-100'>
        {editMode ? 'Actualizar Producto' : 'Crear Producto'}
      </Button>

      <Button
        variant='secondary'
        type='button'
        className='w-100 mt-2'
        onClick={() => navigate(-1)}
      >
        Cancelar
      </Button>
    </Form>
  )
}

export default NewProduct
