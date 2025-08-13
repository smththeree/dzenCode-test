import { Spinner } from "react-bootstrap";
import { useProductsPageState } from "../model/useProductsPageState";
import "./products.scss";
import { ProductItem } from "./productItem";

export const ProductsPage = () => {
  const { products, isFetching } = useProductsPageState();
  return (
    <section className="products">
      <h1 className="products__title">Products</h1>

      <ul className="products__list">
        {products?.length === 0 && !isFetching && "No Products"}
        {isFetching ? (
          <div className="orders__list-spinner">
            <Spinner />
          </div>
        ) : (
          products?.map((product) => (
            <ProductItem key={product.id} product={product} inOrder={false} />
          ))
        )}
      </ul>
    </section>
  );
};
