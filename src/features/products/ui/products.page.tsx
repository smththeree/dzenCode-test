import { Spinner } from "react-bootstrap";
import { useProductsPageState } from "../model/useProductsPageState";
import "./products.scss";
import { ProductItem } from "./productItem";
import ProductsFilter from "./productsFilter";

export const ProductsPage = () => {
  const { isFetching, filteredProducts, handleStatusChange } =
    useProductsPageState();

  return (
    <section className="products">
      <h1 className="products__title">Products</h1>

      <ProductsFilter handleStatusChange={handleStatusChange} />

      <ul className="products__list">
        {filteredProducts?.length === 0 && !isFetching && "No Products"}
        {isFetching ? (
          <div className="orders__list-spinner">
            <Spinner />
          </div>
        ) : (
          filteredProducts?.map((product) => (
            <ProductItem key={product.id} product={product} inOrder={false} />
          ))
        )}
      </ul>
    </section>
  );
};
