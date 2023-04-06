import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginGoogle, loginFacebook, } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import facebookIcon from "../../assets/icons/icons8-facebook.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";


export function Cadastro() {
  const [passwordShown, setPasswordShown] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function Esconder() {
    if (passwordShown === "password") {
      setPasswordShown("text");
    } else {
      setPasswordShown("password");
    }
  }
  
  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }
  function onLoginFacebook() {
    loginFacebook()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={logoIcon} width="256" alt="Logo do app" />
      </p>
      <h4>Faça parte da nossa plataforma</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Entre</Link>
      </p>
      <hr />
      <div className="text-center">
        <Button className="mb-3 w-50" variant="danger" onClick={onLoginGoogle}>
          <img src={googleIcon} width="32" alt="Logo do google" />
          Entrar com o Google
        </Button>
      <br />
      <Button className="mb-3 w-50" onClick={onLoginFacebook}>
        <img src={facebookIcon} width="32" alt="Facebook icon" /> Entrar com o
        Facebook
      </Button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", { required: "O email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type={passwordShown}
            className={errors.senha && "is-invalid"}
            placeholder="Sua senha"
            {...register("senha", { required: "A senha é obrigatória" })}
          />
          <Form.Check
            type="checkbox" onClick={Esconder}
            id="custom-check"
            label="Mostrar Senha"
          />
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="success">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
}
