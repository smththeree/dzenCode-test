import { useFormattedDateTime } from "@/shared/hooks";
import type { Order } from "@/shared/types";
import { useOrderItemState } from "../model/useOrderItemState";
import remove from "@/shared/assets/remove.svg";
import Modal from "@/shared/ui/Modal";
import { Button } from "react-bootstrap";
import { cn } from "@/shared/utils";
import { useAppSelector } from "@/app/store";

const OrderItem = ({
  order,
  handleClick,
}: {
  order: Order;
  handleClick: (order: Order) => void;
}) => {
  const { date, time } = useFormattedDateTime(new Date(order.date));
  const { totalPrice, show, handleClose, handleShow, handleRemove } =
    useOrderItemState(order);
  const activeOrderDetails = useAppSelector((state) => state.order.orderData);

  return (
    <>
      <li
        className={cn("orders__list-item", {
          active: activeOrderDetails?.id === order.id,
        })}
        onClick={() => (!show ? handleClick(order) : undefined)}
      >
        <div className="orders__item-info">
          <span className="orders__info-title">{order.title}</span>
          <span className="orders__info-description">{order.description}</span>
        </div>
        <div className="orders__item-products">
          <span className="orders__products-count">
            {order.products.length}
          </span>
          <span>Products</span>
        </div>
        <div className="orders__item-date">
          <span className="orders__date-time">{time}</span>
          <span className="orders__date-day">{date}</span>
        </div>
        <div className="orders__item-price">
          <span className="orders__price-value">{totalPrice}</span>
          <span className="orders__price-currency">UAH</span>
        </div>

        <img
          src={remove}
          alt="remove icon"
          className="orders__remove-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleShow();
          }}
        />
        <Modal
          heading="Are you sure you want to delete this order?"
          show={show}
          handleClose={handleClose}
          closeButton={
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          }
          saveButton={
            <Button variant="danger" onClick={handleRemove}>
              Delete
            </Button>
          }
        >
          <ModalOrderItem order={order} totalPrice={totalPrice} />
        </Modal>
      </li>
    </>
  );
};

export default OrderItem;

export const ModalOrderItem = ({
  order,
  totalPrice,
}: {
  order: Order;
  totalPrice: string;
}) => {
  return (
    <div className="modal__order">
      <div className="modal__order-info">
        <span className="modal__info-title">{order.title}</span>
        <span className="modal__info-description">{order.description}</span>
      </div>

      <div className="modal__order-price">
        <span className="modal__price-value">{totalPrice}</span>
        <span className="modal__price-currency">UAH</span>
      </div>
    </div>
  );
};
