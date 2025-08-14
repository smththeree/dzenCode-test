import type { Product } from "@/shared/types";
import remove from "@/shared/assets/remove.svg";
import { useFormattedDateTime } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Button } from "react-bootstrap";
import { useProductItemState } from "../model/useProductItemState";
import Modal from "@/shared/ui/Modal";
import "./products.scss";
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
        {product.price.map((price, index) => (
          <span
            key={index}
            className={cn("product__price", {
              default: Boolean(price.isDefault),
            })}
          >
            <span className="products__price-value">
              {price.value.toFixed(2)}
            </span>
            <span className="products__price-currency">{price.symbol}</span>
          </span>
        ))}
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
        <ModalProductItem product={product} />
      </Modal>
    </li>
  );
};

export const ModalProductItem = ({ product }: { product: Product }) => {
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
        {product.price.map((price, index) => (
          <span
            key={index}
            className={cn("modal__price", {
              default: Boolean(price.isDefault),
            })}
          >
            <span className="modal__price-value">{price.value.toFixed(2)}</span>
            <span className="modal__price-currency">{price.symbol}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
