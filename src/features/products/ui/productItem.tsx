import type { Product } from "@/shared/types";
import remove from "@/shared/assets/remove.svg";
import { useFormattedDateTime } from "@/shared/hooks";
import { cn, getTotalPrice } from "@/shared/utils";
import { Button } from "react-bootstrap";
import { useProductItemState } from "../model/useProductItemState";
import Modal from "@/shared/ui/Modal";
type Props = {
  product: Product;
  inOrder: boolean;
};

export const ProductItem = ({ product, inOrder }: Props) => {
  const { date, time } = useFormattedDateTime(new Date(product.date));
  const { date: guaranteeDateStart } = useFormattedDateTime(
    new Date(product.guarantee.start)
  );
  const { date: guaranteeDateEnd } = useFormattedDateTime(
    new Date(product.guarantee.end)
  );
  const { show, handleClose, handleRemove, handleShow } =
    useProductItemState(product);
  const totalPrice = getTotalPrice(product);

  return (
    <li className={cn("products__list-item", { "in-order": inOrder })}>
      <div className="products__item-info">
        <img
          src={product.photo}
          alt={product.title}
          className="products__info-img"
        />
        <div className="products__info-content">
          <span className="products__content-title">{product.title}</span>
          <span className="products__content-serial">
            {product.serialNumber}
          </span>
        </div>
      </div>

      <div className="products__item-guarantee">
        <span className="products__guarantee-from">
          from: {guaranteeDateStart}
        </span>
        <span className="products__guarantee-to">to: {guaranteeDateEnd}</span>
      </div>
      <span className="products__item-status">
        {product.isNew ? "new" : "used"}
      </span>
      <div className="products__item-order">
        <span className="products__order-id">{product.order}</span>
        <span className="products__order-title">Order ID</span>
      </div>
      <div className="products__item-price">
        <span className="products__price-value">{totalPrice}</span>
        <span className="products__price-currency">UAH</span>
      </div>
      <div className="products__item-date">
        <span className="products__date-time">{time}</span>
        <span className="products__date-day">{date}</span>
      </div>

      <img
        src={remove}
        alt="remove icon"
        className="products__remove-icon"
        onClick={handleShow}
      />

      <Modal
        heading="Are you sure you want to delete this product?"
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
        <ModalProductItem product={product} totalPrice={totalPrice} />
      </Modal>
    </li>
  );
};

export const ModalProductItem = ({
  product,
  totalPrice,
}: {
  product: Product;
  totalPrice: string;
}) => {
  return (
    <div className="modal__product">
      <div className="modal__product-info">
        <img
          src={product.photo}
          alt={product.title}
          className="modal__info-img"
        />

        <div className="modal__info-content">
          <span className="modal__info-title">{product.title}</span>
          <span className="modal__info-description">
            {product.serialNumber}
          </span>
        </div>
      </div>

      <div className="modal__product-price">
        <span className="modal__price-value">{totalPrice}</span>
        <span className="modal__price-currency">UAH</span>
      </div>
    </div>
  );
};
