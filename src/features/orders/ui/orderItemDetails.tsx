import { Button } from "react-bootstrap";
import { useOrderItemDetails } from "../model/useOrderItemDetails";
import OrderItemDetailsList from "./orderItemDetailsList";
import Modal from "@/shared/ui/Modal";
import OrderDetailsForm from "./orderDetailsForm";
import { useTranslation } from "react-i18next";

const OrderItemDetails = () => {
  const {
    products,
    activeOrderDetails,
    isFetching,
    show,
    handleClose,
    handleShow,
  } = useOrderItemDetails();
  const { t } = useTranslation("");

  if (!activeOrderDetails) return null;
  return (
    <div className="orders__list-details">
      <div className="orders__details-heading">
        <div className="orders__heading-info">
          <span className="orders__heading-title">
            {activeOrderDetails.title}
          </span>
          <p className="orders__heading-description">
            {activeOrderDetails.description}
          </p>
        </div>
        <div className="orders__heading-actions">
          <Button variant="success" onClick={handleShow}>
            {t("Add product")}
          </Button>
        </div>
      </div>
      <OrderItemDetailsList products={products} isFetching={isFetching} />
      <Modal
        heading={t("Add new product")}
        show={show}
        handleClose={handleClose}
      >
        <OrderDetailsForm handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default OrderItemDetails;
