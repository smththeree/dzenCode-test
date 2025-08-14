import { useState } from "react";
import { useGetAllProductsQuery } from "../api";

export const useProductsPageState = () => {
  const [status, setStatus] = useState<number | null>(null);
  const { data: products, isFetching } = useGetAllProductsQuery();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatus(value === "" ? null : Number(value));
  };

  const filteredProducts = products?.filter((product) => {
    if (status === null) return true;
    return product.isNew === status;
  });

  return { products, isFetching, filteredProducts, handleStatusChange };
};
