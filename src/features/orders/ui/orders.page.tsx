import { Button } from "react-bootstrap";
import { useOrdersPageState } from "../model/useOrdersPageState";
import "./ordersPage.scss";
import Modal from "@/shared/ui/Modal";
import OrderForm from "./orderForm";
import OrderList from "./orderList";
import { useTranslation } from "react-i18next";
export const OrdersPage = () => {
  const {
    orders,
    isFetching,
    show,
    handleClose,
    handleShow,
    showDetails,
    handleShowDetails,
  } = useOrdersPageState();
  const { t } = useTranslation("");
  return (
    <section className="orders">
      <div className="orders__header">
        <h1 className="orders__header-title">{t("Orders")}</h1>
        <Button variant="success" onClick={handleShow}>
          {t("Add order")}
        </Button>
      </div>
      <OrderList
        orders={orders}
        isFetching={isFetching}
        showDetails={showDetails}
        handleShowDetails={handleShowDetails}
      />
      <Modal heading={t("Add order")} show={show} handleClose={handleClose}>
        <OrderForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};
