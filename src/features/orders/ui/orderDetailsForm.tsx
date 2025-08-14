import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDetailsFormState } from "../model/useDetailsFormState";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const OrderDetailsForm = ({ handleClose }: { handleClose: () => void }) => {
  const { register, control, handleSubmit, errors, onSubmit } =
    useDetailsFormState(handleClose);
  const { t } = useTranslation("");
  return (
    <Form className="order__form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>{t("Title")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("Enter Title")}
          {...register("title")}
        />
        <Form.Text className="order__form-error">
          {errors.title?.message}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSpecification">
        <Form.Label>{t("Specification")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("Enter Specification")}
          {...register("specification")}
        />
        <Form.Text className="order__form-error">
          {errors.specification?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSerialNumber">
        <Form.Label>{t("Serial Number")}</Form.Label>
        <Form.Control
          type="number"
          placeholder={t("Enter Serial Number")}
          {...register("serialNumber")}
        />
        <Form.Text className="order__form-error">
          {errors.serialNumber?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>{t("Status")}</Form.Label>

        <Form.Select aria-label="Default select example" {...register("isNew")}>
          <option>{t("Choose the Status")}</option>
          <option value="1">{t("New")}</option>
          <option value="0">{t("Used")}</option>
        </Form.Select>
        <Form.Text className="order__form-error">
          {errors.isNew?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>{t("Type")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("Enter Type")}
          {...register("type")}
        />
        <Form.Text className="order__form-error">
          {errors.type?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form__date" controlId="formGuaranteeStart">
        <Form.Label>{t("Guarantee from")}</Form.Label>
        <Controller
          control={control}
          name="guarantee.start"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="dd.MM.yyyy"
              className="form-control"
            />
          )}
        />
        <Form.Text className="order__form-error">
          {errors.guarantee?.start?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form__date" controlId="formGuaranteeEnd">
        <Form.Label>{t("Guarantee to")}</Form.Label>
        <Controller
          control={control}
          name="guarantee.end"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat="dd.MM.yyyy"
              className="form-control"
            />
          )}
        />
        <Form.Text className="order__form-error">
          {errors.guarantee?.end?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>{t("Price")}</Form.Label>
        <Form.Control
          type="number"
          placeholder={t("Enter Price")}
          {...register("price.value")}
        />
        <Form.Text className="order__form-error">
          {errors.price?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCurrency">
        <Form.Label>{t("Currency")}</Form.Label>

        <Form.Select
          aria-label="Default select example"
          {...register("price.symbol")}
        >
          <option>{t("Choose the currency")}</option>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
        </Form.Select>
        <Form.Text className="order__form-error">
          {errors.price?.symbol?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formIsDefault">
        <Form.Check
          type="checkbox"
          id="formIsDefault"
          label={t("Is it default currency?")}
          {...register("price.isDefault")}
        />
        <Form.Text className="order__form-error">
          {errors.price?.symbol?.message}
        </Form.Text>
      </Form.Group>

      <Button variant="success" type="submit">
        {t("Create order")}
      </Button>
    </Form>
  );
};

export default OrderDetailsForm;
