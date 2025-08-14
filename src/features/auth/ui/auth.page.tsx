import { Button, Form } from "react-bootstrap";
import { useAuthPageState } from "../model/useAuthPageState";
import "./auth.page.scss";
import { useTranslation } from "react-i18next";

export const AuthPage = () => {
  const { register, handleSubmit, errors, onSubmit } = useAuthPageState();
  const { t } = useTranslation("");

  return (
    <div className="auth__page">
      <Form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t("Username")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("Enter username")}
            {...register("username")}
          />
          <Form.Text className="auth__form-error">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("Enter password")}
            {...register("password")}
          />
          <Form.Text className="auth__form-error">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {t("Login")}
        </Button>
      </Form>
    </div>
  );
};
