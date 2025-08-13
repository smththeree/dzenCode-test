import { ProductItem } from "@/features/products";
import type { Product } from "@/shared/types";
import { Spinner } from "react-bootstrap";

type Props = {
  products: Product[] | undefined;
  isFetching: boolean;
};

const OrderItemDetailsList = ({ products, isFetching }: Props) => {
  return (
    <ul className="orders__details-list">
      {isFetching ? (
        <div className="orders__list-spinner">
          <Spinner />
        </div>
      ) : (
        products?.map((product) => (
          <ProductItem key={product.id} product={product} inOrder />
        ))
      )}
    </ul>
  );
};

export default OrderItemDetailsList;
