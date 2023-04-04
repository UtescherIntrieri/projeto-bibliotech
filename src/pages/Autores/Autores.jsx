import { Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAutores } from "../../firebase/livros"

export function Autores() {

    const [autores, setAutores] = useState([]);

    useEffect(() => {
        getAutores().then(resultados => {
            setAutores(resultados)
        })
    }, [])

    return (
        <>
            <div className="autores"></div>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Autores</h1>
                    <Button as={Link} to="/autores/adicionar" variant="success">
                        Adicionar Autor
                    </Button>
                </div>
            </Container>

            {autores.map(autores => {

                return (
                    <Card>
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
        </>
    );
}