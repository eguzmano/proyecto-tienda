import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import './NewProduct.css'

const categoryMap = {
  Cajonera: 1,
  Juguetero: 2,
  Mueble: 3,
  Librero: 4
}

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validación simple
    if (!product.name || !product.description || !product.price || !product.stock || !product.category || !product.imageUrl) {
      Swal.fire('Todos los campos son obligatorios', '', 'warning')
      return
    }

    try {
      const payload = {
        nombre: product.name,
        descripcion: product.description,
        precio: product.price,
        stock: product.stock,
        imagen_url: product.imageUrl,
        categoria_id: categoryMap[product.category] || 5 // default a 'otro'
      }
      await axios.post('http://localhost:5000/api/productos', payload)
      Swal.fire('¡Producto creado!', '', 'success')
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
      })
    } catch (error) {
      Swal.fire('Error al crear producto', error?.response?.data?.error || '', 'error')
    }
  }

  return (
    <Form className='product-form-container p-4 border rounded bg-light' onSubmit={handleSubmit}>
      <h4 className='mb-4'>Nuevo Producto</h4>

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
          <option value='Repisa'>Repisa</option>
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
        Crear Producto
      </Button>
    </Form>
  )
}

export default NewProduct
