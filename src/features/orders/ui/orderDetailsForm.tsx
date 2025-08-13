import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDetailsFormState } from "../model/useDetailsFormState";
import { Controller } from "react-hook-form";

const OrderDetailsForm = ({ handleClose }: { handleClose: () => void }) => {
  const { register, control, handleSubmit, errors, onSubmit } =
    useDetailsFormState(handleClose);
  console.log(errors);
  return (
    <Form className="order__form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          {...register("title")}
        />
        <Form.Text className="auth__form-error">
          {errors.title?.message}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSpecification">
        <Form.Label>Specification</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Specification"
          {...register("specification")}
        />
        <Form.Text className="auth__form-error">
          {errors.specification?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSerialNumber">
        <Form.Label>Serial Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Serial Number"
          {...register("serialNumber")}
        />
        <Form.Text className="auth__form-error">
          {errors.serialNumber?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Status</Form.Label>

        <Form.Select aria-label="Default select example" {...register("isNew")}>
          <option>Choose the status</option>
          <option value="1">New</option>
          <option value="0">Used</option>
        </Form.Select>
        <Form.Text className="auth__form-error">
          {errors.isNew?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the type"
          {...register("type")}
        />
        <Form.Text className="auth__form-error">
          {errors.type?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form__date" controlId="formGuaranteeStart">
        <Form.Label>Guarantee from</Form.Label>
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
        <Form.Text className="auth__form-error">
          {errors.guarantee?.start?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 form__date" controlId="formGuaranteeEnd">
        <Form.Label>Guarantee to</Form.Label>
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
        <Form.Text className="auth__form-error">
          {errors.guarantee?.end?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Price"
          {...register("price.value")}
        />
        <Form.Text className="auth__form-error">
          {errors.price?.message}
        </Form.Text>
      </Form.Group>
      <Button variant="success" type="submit">
        Create order
      </Button>
    </Form>
  );
};

export default OrderDetailsForm;
