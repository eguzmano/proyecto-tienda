import { useEffect, useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'
import { API_URL } from '../../config/env'

const ProductComments = ({ productId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const { user } = useContext(UserContext)

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/comentarios/${productId}`)
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch (e) {
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) fetchComments()
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.id) {
      Swal.fire('Debes iniciar sesión para comentar', '', 'warning')
      return
    }
    if (!text.trim()) {
      Swal.fire('Escribe un comentario', '', 'info')
      return
    }
    try {
      const body = {
        cliente_id: Number(user.id),
        producto_id: Number(productId),
        comentario: text.trim(),
        calificacion: Number(rating)
      }
      const res = await fetch(`${API_URL}/api/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Error al crear comentario')
      setText('')
      setRating(5)
      await fetchComments()
      Swal.fire('Comentario publicado', '', 'success')
    } catch (e) {
      Swal.fire('No se pudo publicar el comentario', '', 'error')
    }
  }

  const renderStars = (n) => '★★★★★☆☆☆☆☆'.slice(5 - Math.min(5, Math.max(0, Number(n))), 10 - Math.min(5, Math.max(0, Number(n))))

  return (
    <div className='mt-4' style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
      <h4 className='mb-3'>Comentarios</h4>

      {loading
        ? (
          <p>Cargando comentarios...</p>
          )
        : comments.length === 0
          ? (
            <p className='text-muted'>Aún no hay comentarios.</p>
            )
          : (
            <ul className='list-group mb-4'>
              {comments.map(c => (
                <li key={c.id} className='list-group-item'>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{renderStars(c.calificacion)}</strong>
                    <small className='text-muted'>{new Date(c.fecha).toLocaleString()}</small>
                  </div>
                  <div>{c.comentario}</div>
                </li>
              ))}
            </ul>
            )}

      {/* Formulario ancho: evitamos que se centre y forzamos que los campos se estiren */}
      <form
        onSubmit={handleSubmit}
        className='card card-body'
        style={{ alignItems: 'stretch' }}
      >
        <div className='mb-2'>
          <label className='form-label'>Calificación</label>
          <select
            className='form-select w-100'
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★☆ (4)</option>
            <option value={3}>★★★☆☆ (3)</option>
            <option value={2}>★★☆☆☆ (2)</option>
            <option value={1}>★☆☆☆☆ (1)</option>
          </select>
        </div>
        <div className='mb-2'>
          <label className='form-label'>Tu comentario</label>
          <textarea
            className='form-control w-100'
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Escribe tu opinión del producto...'
            style={{ minHeight: 140, resize: 'vertical' }}
          />
        </div>
        <button type='submit' className='btn btn-dark align-self-start'>Publicar</button>
      </form>
    </div>
  )
}

export default ProductComments
