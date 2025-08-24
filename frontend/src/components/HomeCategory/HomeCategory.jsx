import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from 'react-router-dom'
import './HomeCategory.css'

const HomeCategory = () => {
  const navigate = useNavigate()
  const go = (id) => navigate(`/productos?categoria=${id}`)
  return (
    <>
      <h2>Categorias</h2>
      <Carousel fade className='home-carousel'>
        <Carousel.Item>
          <img className='img-carousel clickable' src='https://i.ibb.co/kkqt23s/cajonera-2-1.jpg' alt='Cajoneras' onClick={() => go(1)} role='button' aria-label='Ver Cajoneras' />
          <Carousel.Caption>
            <h3 onClick={() => go(1)} role='button' style={{ cursor: 'pointer' }}>Cajoneras</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel clickable' src='https://i.ibb.co/6Rbfg4RF/organizador-3-2.jpg' alt='Jugueteros' onClick={() => go(2)} role='button' aria-label='Ver Jugueteros' />
          <Carousel.Caption>
            <h3 onClick={() => go(2)} role='button' style={{ cursor: 'pointer' }}>Jugueteros</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel clickable' src='https://i.ibb.co/jvq7gLMx/escritorio-preescolar.jpg' alt='Muebles' onClick={() => go(3)} role='button' aria-label='Ver Muebles' />
          <Carousel.Caption>
            <h3 onClick={() => go(3)} role='button' style={{ cursor: 'pointer' }}>Muebles</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel clickable' src='https://i.ibb.co/PzJhxHTq/librero-peque-o.jpg' alt='Libreros' onClick={() => go(4)} role='button' aria-label='Ver Libreros' />
          <Carousel.Caption>
            <h3 onClick={() => go(4)} role='button' style={{ cursor: 'pointer' }}>Libreros</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeCategory
