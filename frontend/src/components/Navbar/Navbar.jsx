import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import logo from '../../assets/imgs/logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import formatNumber from '../../utils/formatNumber'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'

const StoreNavbar = ({ isTransparent }) => {
  const { total } = useContext(CartContext)
  const { token, logout, user } = useContext(UserContext)

  return (
    <Navbar expand='lg' className={`navbar ${isTransparent ? 'navbar-transparent' : ''}`}>
      <Container fluid className='mx-5'>
        <Navbar.Brand as={Link} to='/'><Image className='navbar-logo' src={logo} fluid /></Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
            {token
              ? (
                <>
                  <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
                  <Nav.Link as={Link} to='/favoritos'>Favoritos</Nav.Link>
                  {token && user?.rol_id === 2 && (
                    <Nav.Link as={Link} to='/nuevo'>Nuevo Producto</Nav.Link>
                  )}
                </>
                )
              : (
                <>
                  <Nav.Link as={Link} to='/registro'>Registro</Nav.Link>
                  <Nav.Link as={Link} to='/ingresar'>Ingresar</Nav.Link>
                </>
                )}
            <NavDropdown title='Categorias' id='navbarScrollingDropdown'>
              <NavDropdown.Item as={Link} to='/productos?categoria=1'>Cajoneras</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/productos?categoria=2'>Jugueteros</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/productos?categoria=3'>Muebles</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/productos?categoria=4'>Libreros</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/productos'>Todas los productos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className='d-flex align-items-center ms-auto gap-2'>
            {token && (
              <Button className='btn-logout mx-2 text-nowrap' variant='outline-danger' onClick={logout}>
                Cerrar Sesion
              </Button>
            )}
            <Link to='/cart'>
              <button className='btn btn-outline-secondary'>
                🛒 Total: ${formatNumber(total)}
              </button>
            </Link>
            <Form className='d-flex ms-3'>
              <Form.Control
                type='search'
                placeholder='Que andas buscando'
                className='me-2 my-2'
                aria-label='Search'
              />
              <Button variant='outline-success' className='btn-search'><i className='bi bi-search' /></Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default StoreNavbar
