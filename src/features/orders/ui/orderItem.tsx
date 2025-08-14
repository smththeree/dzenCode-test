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
  const { totals, show, handleClose, handleShow, handleRemove } =
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
          {totals.map(([symbol, { value, hasDefault }]) => (
            <span
              key={symbol}
              className={cn("orders__price", { default: hasDefault })}
            >
              <span className="orders__price-value">{value.toFixed(2)}</span>
              <span className="orders__price-currency">{symbol}</span>
            </span>
          ))}
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
          <ModalOrderItem order={order} totals={totals} />
        </Modal>
      </li>
    </>
  );
};

export default OrderItem;

export const ModalOrderItem = ({
  order,
  totals,
}: {
  order: Order;
  totals: [
    string,
    {
      value: number;
      hasDefault: boolean;
    }
  ][];
}) => {
  return (
    <div className="modal__order">
      <div className="modal__order-info">
        <span className="modal__info-title">{order.title}</span>
        <span className="modal__info-description">{order.description}</span>
      </div>

      <div className="modal__order-price">
        {totals.map(([symbol, { value, hasDefault }]) => (
          <span
            key={symbol}
            className={cn("modal__price", { default: hasDefault })}
          >
            <span className="modal__price-value">{value}</span>
            <span className="modal__price-currency">{symbol}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
