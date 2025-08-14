import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ProductsFilter = ({ handleStatusChange }: Props) => {
  const { t } = useTranslation("");
  return (
    <div className="products__filter">
      <span className="products__filter-label">{t("Filter by status")}</span>
      <Form.Select
        aria-label="Default select example"
        onChange={handleStatusChange}
      >
        <option value="">{t("Choose the Status")}</option>
        <option value="1">{t("New")}</option>
        <option value="0">{t("Used")}</option>
      </Form.Select>
    </div>
  );
};

export default ProductsFilter;
