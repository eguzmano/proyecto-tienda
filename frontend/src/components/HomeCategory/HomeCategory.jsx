import Carousel from 'react-bootstrap/Carousel'
import cajoneras from '../../assets/imgs/cajonera-1-1.jpeg'
import organizadores from '../../assets/imgs/Juguetero-6-1.jpg'
import repisas from '../../assets/imgs/Repisa-rectangular-3.jpg'
import './HomeCategory.css'

const HomeCategory = () => {
  return (
    <>
      <h2>Categorias</h2>
      <Carousel fade className='home-carousel'>
        <Carousel.Item>
          <img className='img-carousel' src={cajoneras} alt='Organizador' />
          <Carousel.Caption>
            <h3>Cajoneras</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel' src={organizadores} alt='Organizador' />
          <Carousel.Caption>
            <h3>Organizadores</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel' src={repisas} alt='Organizador' />
          <Carousel.Caption>
            <h3>Repisas</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeCategory
