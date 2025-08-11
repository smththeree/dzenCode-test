export const ROUTES = {
  HOME: "/",
  ORDERS: "/orders",
  PRODUCTS: "/products",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
};

export type RouteKeys = keyof typeof ROUTES;
export const routeEntries = Object.entries(ROUTES).filter(
  ([key]) => key !== "SIGNIN" && key !== "SIGNUP" && key !== "HOME"
) as [RouteKeys, string][];
