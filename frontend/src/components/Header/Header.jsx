import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Card className='header bg-dark text-white'>
      <div className='header-img'>
        <Card.ImgOverlay className='d-flex flex-column justify-content-center'>
          <Card.Title>Cuncuna</Card.Title>
          <div className='text-card fs-3'>
            Muebles para los mas pequeños.
          </div>
          <div>
            <Button className='btn' as={Link} to='/productos'>Ver Mas</Button>
          </div>
        </Card.ImgOverlay>
      </div>
    </Card>
  )
}

export default Header
