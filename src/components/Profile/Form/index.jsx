import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

export function ProfileForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <Form onSubmit={handleSubmit(props.onSubmit)} noValidate>
      <Form.Group className="mb-3" controlId="nome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          defaultValue={props.user?.displayName || ""}
          className={errors.displayName && "is-invalid"}
          placeholder="Seu nome"
          {...register("displayName", { required: "O nome é obrigatório" })}
        />
        <Form.Text className="invalid-feedback">
          {errors.displayName?.message}
        </Form.Text>
      </Form.Group>
 
      <div className="d-grid gap-1">
        <Button type="submit" variant="success">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
