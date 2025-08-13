import type { Order, Product } from "../types";

const convertPrice = (priceValue: number, symbol: string) => {
  const USD_RATE = 42;
  return symbol === "USD" ? priceValue * USD_RATE : priceValue;
};

const isOrder = (item: Product | Order): item is Order => {
  return "products" in item;
};

export const getTotalPrice = (items: Product | Order) => {
  const prices = isOrder(items)
    ? items.products.flatMap((product) => product.price)
    : items.price;

  const total = prices.reduce((sum, price) => {
    return sum + convertPrice(price.value, price.symbol);
  }, 0);

  return total.toFixed(2);
};
