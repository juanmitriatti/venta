import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">La Yogurteria</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/venta">Venta</Nav.Link>
            
            <NavDropdown title="Productos" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/altaproducto">Alta Productos</NavDropdown.Item>
              <NavDropdown.Item href="/listadoproducto">
               Actualizar Productos
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Estadisticas" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/venta-hoy">Hoy</NavDropdown.Item>
              <NavDropdown.Item href="/venta-ultimos-siete">
               Últimos 7 días
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Outlet />
    </>
  );
}

export default Menu;