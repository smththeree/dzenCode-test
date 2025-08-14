import { useMemo } from "react";
import type { Product, ProductPrice } from "../types";

export const GetTotalPrice = (products: Product[]) => {
  const totals = useMemo(() => {
    const result: Record<string, { value: number; hasDefault: boolean }> = {};

    products.forEach((product) => {
      product.price.forEach((p: ProductPrice) => {
        if (!result[p.symbol]) {
          result[p.symbol] = { value: 0, hasDefault: false };
        }

        result[p.symbol].value += p.value;

        if (p.isDefault) {
          result[p.symbol].hasDefault = true;
        }
      });
    });

    return Object.entries(result);
  }, [products]);

  return totals;
};
