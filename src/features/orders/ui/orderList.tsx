import type { Order } from "@/shared/types";
import { Spinner } from "react-bootstrap";
import OrderItem from "./orderItem";
import OrderItemDetails from "./orderItemDetails";
import { useTranslation } from "react-i18next";

type Props = {
  orders: Order[] | undefined;
  isFetching: boolean;
  showDetails: boolean;
  handleShowDetails: (order: Order) => void;
};

const OrderList = ({
  orders,
  isFetching,
  showDetails,
  handleShowDetails,
}: Props) => {
  const { t } = useTranslation("");
  return (
    <div className="orders__list-container">
      <ul className="orders__list">
        {orders?.length === 0 && !isFetching && t("No orders")}
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
  );
};

export default OrderList;
