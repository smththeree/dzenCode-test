import { Button, Form } from "react-bootstrap";
import { useOrderFormState } from "../model/useOrderFormState";
import { useTranslation } from "react-i18next";

const OrderForm = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation("");
  const { register, handleSubmit, errors, onSubmit } =
    useOrderFormState(handleClose);
  return (
    <Form className="order__form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Title")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("Enter title")}
          {...register("title")}
        />
        <Form.Text className="order__form-error">
          {errors.title?.message}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("Description")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("Enter description")}
          {...register("description")}
        />
        <Form.Text className="order__form-error">
          {errors.description?.message}
        </Form.Text>
      </Form.Group>

      <Button variant="success" type="submit">
        {t("Create order")}
      </Button>
    </Form>
  );
};

export default OrderForm;
