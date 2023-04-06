import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";


import "../Footer/footer.css";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
} from "react-icons/ai";

export function Footer() {
  const resultado = useContext(ThemeContext)
  const temaClaro = resultado.temaClaro

  return (
    <footer className={temaClaro ? "bg-dark text-light border-top border-success" : "bg-success text-dark border-top border-success"}>
      <div className="container-footer">
        <div className="container-section">
          <div className="container-links">
            <div className="container-section-links align-self-center mb-3">
              <h4>Institucional</h4>
              <Nav.Link as={Link} to="">
                Sobre nós
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Termos e condições de uso
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Política de privacidade
              </Nav.Link>
            </div>
            <div className="container-section-links align-self-center mb-3">
              <h4>Central de atendimento</h4>
              <Nav.Link as={Link} to="">
                Fale conosco
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Trabalhe conosco
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Acessoria de imprensa
              </Nav.Link>
            </div>
            <div className="container-section-links mb-3 align-self-center">
              <h4>Atalhos</h4>
              <Nav.Link as={Link} to="">
                Empréstimos
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Perfil
              </Nav.Link>
              <Nav.Link as={Link} to="">
                Ajuda
              </Nav.Link>
            </div>
            <div className="container-section-redes align-text-center">
              <h4>Nossa newsletter</h4>
              <input type="text" className={temaClaro ? "bg-dark text-light" : "bg-success text-dark"} placeholder="Digite o seu e-mail" />
              <button className={temaClaro ? "bg-success text-dark" : "bg-dark text-success"}>Inscrever</button>
              <div className="container-icons">
                <Nav.Link as={Link} to="">
                  <AiFillFacebook />
                </Nav.Link>
                <Nav.Link as={Link} to="">
                  <AiFillTwitterCircle />
                </Nav.Link>
                <Nav.Link as={Link} to="">
                  <AiOutlineInstagram />
                </Nav.Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="container-copyrigth">
            <p>© Bibliotech Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
