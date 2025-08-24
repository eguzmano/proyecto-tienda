import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => (
  <div className='notfound-container'>
    <h1>404</h1>
    <p>Página no encontrada</p>
    <Link to='/' className='btn btn-dark mt-3'>Volver al inicio</Link>
  </div>
)

export default NotFound
