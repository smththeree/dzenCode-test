import { Button, Spinner } from "react-bootstrap";
import { useOrdersPageState } from "../model/useOrdersPageState";
import OrderItem from "./orderItem";
import "./ordersPage.scss";
import Modal from "@/shared/ui/Modal";
import OrderItemDetails from "./orderItemDetails";
import OrderForm from "./orderForm";
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
      <div className="orders__list-container">
        <ul className="orders__list">
          {isFetching ? (
            <div className="orders__list-spinner">
              <Spinner />
            </div>
          ) : (
            orders?.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                handleClick={handleShowDetails}
              />
            ))
          )}
        </ul>
        {showDetails && <OrderItemDetails />}
      </div>
      <Modal heading="Add order" show={show} handleClose={handleClose}>
        <OrderForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};
