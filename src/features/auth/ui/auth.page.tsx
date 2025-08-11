import { Button, Form } from "react-bootstrap";
import { useAuthPageState } from "../model/useAuthPageState";
import "./auth.page.scss";

export const AuthPage = () => {
  const { register, handleSubmit, errors, onSubmit } = useAuthPageState();

  return (
    <div className="auth__page">
      <Form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />
          <Form.Text className="auth__form-error">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Form.Text className="auth__form-error">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};
