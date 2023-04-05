import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

export function EmailAndPassword(props) {
    
   const {
     register,
     handleSubmit,
     formState: { errors },
     reset,
   } = useForm();

    const onSubmit = (state) => {
      console.log('senha', state)
      if (props.user.email !== state.email) {
        props.onUpdateEmail(state)
      } else if (state.newPassword) {
        props.onUpdatePassword(state)
        reset()
      }
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={props.user?.email || ""}
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", {
              required: "E-mail obrigatório",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "E-mail inválido",
              },
            })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Senha atual</Form.Label>
          <Form.Control
            type="password"
            className={errors.currentPassword && "is-invalid"}
            placeholder="Senha atual"
            {...register("currentPassword", { required: "Campo obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.currentPassword?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nova senha</Form.Label>
          <Form.Control
            type="password"
            className={errors.newPassword && "is-invalid"}
            placeholder="Nova senha"
            {...register("newPassword")}
          />
          <Form.Text className="invalid-feedback">
            {errors.newPassword?.message}
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