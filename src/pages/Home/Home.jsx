import { useEffect, useState } from "react";
import { Button, Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { getLivros } from "../../firebase/livros";
import { Loader } from "../../components/Loader/Loader";
import "../Home/home.css"

export function Home() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState(null);


  useEffect(() => {
    getLivros().then((livros) => {
      setLivros(livros.map((livro) => ({ ...livro, emprestimos: 0 })));
    });
    getEmprestimos().then((emprestimos) => {
      emprestimos.forEach((emprestimo) => {
        setLivros((livros) => {
          const novoLivros = [...livros];
          const index = novoLivros.findIndex(
            (livro) => livro.id === emprestimo.livro.id
          );
          novoLivros[index].emprestimos++;
          return novoLivros;
        });
      });
      setEmprestimos(emprestimos);
    });
  }, []);

  const livrosOrdenados = livros.sort((a, b) => a.emprestimos - b.emprestimos);

  return (
    <div className="home">
      <Container className="containerPrincipal">
        <h1>Livros com menos empréstimos</h1>
        {emprestimos === null ? (
          <Loader />
        ) : (
          <Carousel>
            {livrosOrdenados.map((livro) => (
              <Carousel.Item key={livro.id}>
                <h3>{livro.titulo}</h3>
                <p>Quantidade de empréstimos: {livro.emprestimos}</p>
                <img src={livro.urlCapa} alt={livro.titulo} className={"capaLivros"}/>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
}
