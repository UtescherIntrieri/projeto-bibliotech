import { useContext, useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Button } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Avatar } from "../Avatar";
import { AuthContext } from "../../contexts/AuthContext";
import "./Menu.css";

export function Menu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useContext(AuthContext);
  const place = "end"
  
  const navigate = useNavigate();

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  const resultado = useContext(ThemeContext)
  const temaEscuro = resultado.temaEscuro
  const alternar = resultado.alternar
  
  let iconeBtn = "https://cdn-icons-png.flaticon.com/512/581/581601.png";
  if (temaEscuro) {
    iconeBtn = "https://cdn-icons-png.flaticon.com/512/3073/3073665.png";
  }

  return (
    <Navbar
      bg={temaEscuro ? "dark" : "success"}
      expand="lg"
      variant={temaEscuro ? "dark" : "light"}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Offcanvas placement={place} className="w-25">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/livros">
                Livros
              </Nav.Link>
              <Nav.Link as={Link} to="/emprestimos">
                Emprestimos
              </Nav.Link>
              <Nav.Link as={Link} to="/autores">
                Autores
              </Nav.Link>
              <Nav.Link onClick={onLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </Nav.Link>
              <Button variant="outline-light" onClick={alternar} className='theme-btn'>
                <img src={iconeBtn} width="16"></img>
              </Button>
            </Nav>
            <div className="avatar-container">
              <Avatar
                photoURL={user?.photoURL}
                size={{
                  width: 50,
                  height: 50,
                }}
                onClick={() => {
                  navigate("/perfil");
                }}
              />
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

