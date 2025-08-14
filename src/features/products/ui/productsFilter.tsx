import React from "react";
import { Form } from "react-bootstrap";

type Props = {
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ProductsFilter = ({ handleStatusChange }: Props) => {
  return (
    <div className="products__filter">
      <span className="products__filter-label">Filter by status</span>
      <Form.Select
        aria-label="Default select example"
        onChange={handleStatusChange}
      >
        <option value="">Choose the status</option>
        <option value="1">New</option>
        <option value="0">Used</option>
      </Form.Select>
    </div>
  );
};

export default ProductsFilter;
