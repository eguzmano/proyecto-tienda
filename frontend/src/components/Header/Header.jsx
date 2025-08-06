import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Header.css'

const Header = () => {
  return (
    <Card className='header bg-dark text-white'>
      <div className='header-img'>
        <Card.ImgOverlay className='d-flex flex-column justify-content-center'>
          <Card.Title>Cuncuna</Card.Title>
          <div className='text-card fs-4'>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div>
            <Button className='btn'>Shop Now</Button>
          </div>
        </Card.ImgOverlay>
      </div>
    </Card>
  )
}

export default Header
