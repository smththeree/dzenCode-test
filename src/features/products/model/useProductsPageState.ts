import { useGetAllProductsQuery } from "../api";

export const useProductsPageState = () => {
  const { data: products, isFetching } = useGetAllProductsQuery();

  return { products, isFetching };
};
