import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { Footer } from "../Footer/Footer"

// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
export function Root() {
  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado === null) {
    // se está deslogado
    // redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <main className="p">
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
