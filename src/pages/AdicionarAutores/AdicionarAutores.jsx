import { Button, Container, Form } from "react-bootstrap";
import { Autores } from "../../pages/Autores/Autores";
import { addAutor } from "../../firebase/livros";
import { useNavigate, navigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

export function AdicionarAutores() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        addAutor(data).then(() => {
            toast.success("Autor adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
            navigate("/autores");
        })
    }



    return (

        <div className="adicionar-autores">
            <Container>
                <h1>Adicionar Autores</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "Nome é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                    <Form.Text className="text-danger">
                        {errors.nome?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "Email é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                    <Form.Text className="text-danger">
                        {errors.email?.message}
                    </Form.Text>
                </Form.Group>
                <Button type="submit" variant="success">
                    Adicionar
                </Button>
                </Form>
            </Container>
        </div>
    );
}