import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import logo from '../../assets/imgs/logo.png'
import './Navbar.css'

const StoreNavbar = ({ isTransparent }) => {
  return (
    <Navbar expand='lg' className={`navbar ${isTransparent ? 'navbar-transparent' : ''}`}>
      <Container fluid className='mx-5'>
        <Navbar.Brand href='#'><Image className='navbar-logo' src={logo} fluid /></Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='#action1'>Home</Nav.Link>
            <Nav.Link href='#action2'>Registro</Nav.Link>
            <Nav.Link href='#action2'>Ingresar</Nav.Link>
            <Nav.Link href='#action2'>Perfil</Nav.Link>
            <Nav.Link href='#action2'>Favoritos</Nav.Link>
            <NavDropdown title='Categorias' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Categoria 1</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Categoria 2</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Categoria 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Todas las categorias</NavDropdown.Item>
            </NavDropdown>
            <Button className='btn-logout mx-2 text-nowrap' variant='outline-danger'>Cerrar Sesion</Button>
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
