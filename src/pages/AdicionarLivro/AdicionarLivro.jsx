import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";

export function AdicionarLivro() {

  const categorias = ["Educação", "Terror", "Ficção", "Auto-Ajuda"]
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [checkedState, setCheckedState] = useState(new Array(categorias.length).fill(false))
  const navigate = useNavigate();

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  function onSubmit(data) {
    const imagem = data.imagem[0];
    if (imagem) {
      const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
      uploadCapaLivro(imagem).then(url => {
        toast.dismiss(toastId);
        data.urlCapa = url;
        delete data.imagem;
        addLivro(data).then(() => {
          toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
          navigate("/livros");
        })
      })
    }
    else {
      delete data.imagem;
      addLivro(data).then(() => {
        toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
        navigate("/livros");
      })
    }
  }
  return (
    <div className="adicionar-livro mb-4">
      <Container>
        <h1>Adicionar livro</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.titulo?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.autor?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Categoria</Form.Label>
            {categorias.map((categoria) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={categoria}
                  value={categoria}
                  className={errors.categoria && "is-invalid"} {...register("categoria", { required: "Categoria é obrigatória!" })}
                />
              )
            })}
            <Form.Text className="text-danger">
              {errors.categoria?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.isbn?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagem da capa</Form.Label>
            <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
          </Form.Group>
          <Button type="submit" variant="success">Adicionar</Button>
        </Form>
      </Container>
    </div>
  )
}