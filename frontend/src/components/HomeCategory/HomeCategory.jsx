import Carousel from 'react-bootstrap/Carousel'
import cajoneras from '../../assets/imgs/cajonera-1-1.jpeg'
import jugueteros from '../../assets/imgs/Juguetero-6-1.jpg'
import repisas from '../../assets/imgs/Repisa-Rectangular-3.jpg'
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
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel' src={jugueteros} alt='Jugueteros' />
          <Carousel.Caption>
            <h3>Jugueteros</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='img-carousel' src={repisas} alt='Repisas' />
          {/* TODO: cambiarla categoria */}
          <Carousel.Caption>
            <h3>Repisas</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default HomeCategory
