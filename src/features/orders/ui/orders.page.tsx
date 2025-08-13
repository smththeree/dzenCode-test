import { Button } from "react-bootstrap";
import { useOrdersPageState } from "../model/useOrdersPageState";
import "./ordersPage.scss";
import Modal from "@/shared/ui/Modal";
import OrderForm from "./orderForm";
import OrderList from "./orderList";
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

  return (
    <section className="orders">
      <div className="orders__header">
        <h1 className="orders__header-title">Orders</h1>
        <Button variant="success" onClick={handleShow}>
          Add order
        </Button>
      </div>
      <OrderList
        orders={orders}
        isFetching={isFetching}
        showDetails={showDetails}
        handleShowDetails={handleShowDetails}
      />
      <Modal heading="Add order" show={show} handleClose={handleClose}>
        <OrderForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};
