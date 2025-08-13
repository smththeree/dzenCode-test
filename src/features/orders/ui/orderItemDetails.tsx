import { useAppSelector } from "@/app/store";
import { Button } from "react-bootstrap";

const OrderItemDetails = () => {
  const activeOrderDetails = useAppSelector((state) => state.order.orderData);

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
          <Button variant="success">Add product</Button>
        </div>
      </div>

      <ul className="orders__details-list">
        {activeOrderDetails.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItemDetails;
