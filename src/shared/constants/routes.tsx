export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  ORDERS: "/orders",
  PRODUCTS: "/products",
};

export type RouteKeys = keyof typeof ROUTES;
export const routeEntries = Object.entries(ROUTES).filter(
  ([key]) => key !== "SIGNUP" && key !== "SIGNIN" && key !== "HOME"
) as [RouteKeys, string][];
