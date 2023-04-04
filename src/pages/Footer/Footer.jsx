import "../Footer/footer.css";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
} from "react-icons/ai";

export function Footer() {
  return (
    <footer>
      <div className="container-footer">
        <div className="container-section">
          <div className="container-links">
            <div className="container-section-links">
              <h4>Institucional</h4>
              <a href="/employer">
                <p>Sobre nós</p>
              </a>
             
              <a href="/individual">
                <p>Termos e condições de uso</p>
              </a>
              <a href="/healtplan">
                <p>Política de privacidade</p>
              </a>
            </div>
            <div className="container-section-links">
              <h4>Central de atendimento</h4>
              <a href="/employer">
                <p>Fale conosco</p>
              </a>
              <a href="/healtplan">
                <p>Trabalhe conosco</p>
              </a>
              <a href="/healtplan">
                <p>Acessoria de imprensa</p>
              </a>
              
            </div>
            <div className="container-section-links">
              <h4>Atalhos</h4>
              <a href="/employer">
                <p>Empréstimos</p>
              </a>
              <a href="/healtplan">
                <p>Perfil</p>
              </a>
              <a href="/individual">
                <p>Ajud</p>
              </a>
            </div>
            <div className="container-section-redes">
              <h4>Nossa newsletter</h4>
              <input type="text" placeholder="Digite o seu e-mail" />
              <button>Inscrever</button>
              <div className="container-icons">
                <AiFillFacebook />
                <AiFillTwitterCircle />
                <AiOutlineInstagram />
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
