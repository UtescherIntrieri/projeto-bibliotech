import { Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAutores } from "../../firebase/livros"
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export function Autores() {

    const resultado = useContext(ThemeContext)
    const temaClaro = resultado.temaClaro
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        getAutores().then(resultados => {
            setAutores(resultados)
        })
    }, [])

    return (
        <>
            <Container>
            <div className="autores"></div>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Autores</h1>
                    <Button as={Link} to="/autores/adicionar" variant="success">
                        Adicionar Autor
                    </Button>
                </div>

            {autores.map(autores => {

                return (
                  <Card className={temaClaro ? "text-white bg-dark mb-3" : ""}>
                        <Card.Header>Autor</Card.Header>
                        <Card.Body>
                            <Card.Title>{autores.nome}</Card.Title>
                            <Card.Text>
                                {autores.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
              })}
              </Container>
        </>
    );
}