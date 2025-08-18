import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import logo from '../../assets/imgs/logo.png'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import formatNumber from '../../utils/formatNumber'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'

const StoreNavbar = ({ isTransparent }) => {
  const { total } = useContext(CartContext)
  const { token, logout, user } = useContext(UserContext)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos')
  }

  return (
    <Navbar expand='lg' className={`navbar ${isTransparent ? 'navbar-transparent' : ''}`}>
      {/* TODO: implementar */}
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
            <Nav.Link as={Link} to='/productos'>Productos</Nav.Link>
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
            <Form className='d-flex ms-3' onSubmit={onSearchSubmit}>
              <Form.Control
                type='search'
                placeholder='Que andas buscando'
                className='me-2 my-2'
                aria-label='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type='submit' variant='outline-success' className='btn-search'>
                <i className='bi bi-search' />
              </Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default StoreNavbar
