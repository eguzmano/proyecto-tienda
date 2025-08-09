import logo from '../../assets/imgs/logo.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section d-flex'>
          <img src={logo} alt='Cuncuna' className='footer-logo' />
          <h3>Cuncuna</h3>
        </div>

        <div className='footer-section'>
          <h5>Contáctanos</h5>
          <div className='social-icons'>
            <a href='#' target='_blank' rel='noreferrer'>
              <i className='bi bi-facebook' />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <i className='bi bi-instagram' />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <i className='bi bi-whatsapp' />
            </a>
          </div>
        </div>

        <div className='footer-section'>
          <a href='#'>Términos y condiciones</a>
          <a href='#'>Política de Privacidad</a>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>Todos los derechos reservados, 2025</p>
      </div>
    </footer>
  )
}

export default Footer
