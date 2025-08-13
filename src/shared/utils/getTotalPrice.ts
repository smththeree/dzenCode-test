import type { Order, Product } from "../types";

const priceSymbol = "UAH";

const isOrder = (item: Product | Order): item is Order => {
  return "products" in item;
};

export const getTotalPrice = (items: Product | Order) => {
  const prices = isOrder(items)
    ? items.products.flatMap((product) => product.price)
    : items.price;

  const total = prices.reduce((sum, price) => {
    return price.symbol === priceSymbol ? sum + price.value : sum;
  }, 0);

  return total.toFixed(2);
};
