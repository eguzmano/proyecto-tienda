import feat1 from '../../assets/imgs/cajonera-1-1.jpeg'
import feat2 from '../../assets/imgs/juguetero-6-1.jpg'
import './HomeFeatured.css'

const HomeFeatured = () => {
  return (
    <>
      <h2>Destacados</h2>
      <div className='featured card mb-3'>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img src={feat1} className='feat1 img-fluid rounded' alt='...' />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className='card-text'><small className='text-body-secondary'>Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
      <div className='featured card mb-3'>
        <div className='row g-0'>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className='card-text'><small className='text-body-secondary'>Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div className='col-md-4'>
            <img src={feat2} className='feat2 img-fluid rounded' alt='...' />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeFeatured
