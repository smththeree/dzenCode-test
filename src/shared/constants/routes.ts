export const ROUTES = {
  HOME: "/",
  ORDERS: "/dashboard/orders",
  PRODUCTS: "/dashboard/products",
  LOGIN: "/login",
};

export type RouteKeys = keyof typeof ROUTES;
export const routeEntries = Object.entries(ROUTES).filter(
  ([key]) => key !== "LOGIN" && key !== "DASHBOARD"
) as [RouteKeys, string][];
