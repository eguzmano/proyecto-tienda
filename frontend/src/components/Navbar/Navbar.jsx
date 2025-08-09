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
  const { token, logout } = useContext(UserContext)

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
                  <Nav.Link as={Link} to='/nuevo'>Nuevo Producto</Nav.Link>
                  <Button className='btn-logout mx-2 text-nowrap' variant='outline-danger' onClick={logout}>Cerrar Sesion</Button>
                </>

                )
              : (
                <>
                  <Nav.Link as={Link} to='/registro'>Registro</Nav.Link>
                  <Nav.Link as={Link} to='/ingresar'>Ingresar</Nav.Link>
                </>

                )}
            <NavDropdown title='Categorias' id='navbarScrollingDropdown'>
              <NavDropdown.Item as={Link} to='/categoria1'>Categoria 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/categoria2'>Categoria 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/categoria3'>Categoria 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/categorias'>Todas los productos</NavDropdown.Item>
            </NavDropdown>
            <Link to='/cart'>
              <button className='btn btn-outline-light'>
                🛒 Total: ${formatNumber(total)}
              </button>
            </Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Que andas buscando'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'><i className='bi bi-search' /></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default StoreNavbar
