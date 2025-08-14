import { createBrowserRouter, Navigate, Outlet } from "react-router";

import { ROUTES } from "@/shared/constants";

import RequireUnauth from "./requireUnAuth";
import { Toaster } from "sonner";
import { Layout } from "@/features/layout";

import { lazy, Suspense } from "react";

const AuthPage = lazy(() =>
  import("@/features/auth").then((m) => ({ default: m.AuthPage }))
);
const OrdersPage = lazy(() =>
  import("@/features/orders").then((m) => ({ default: m.OrdersPage }))
);
const ProductsPage = lazy(() =>
  import("@/features/products").then((m) => ({ default: m.ProductsPage }))
);
export const router = createBrowserRouter([
  {
    element: (
      <>
        <Toaster position="bottom-right" />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.ORDERS} replace />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: ROUTES.ORDERS,
            element: <OrdersPage />,
          },
          {
            path: ROUTES.PRODUCTS,
            element: <ProductsPage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <RequireUnauth>
            <AuthPage />
          </RequireUnauth>
        ),
      },
    ],
  },
]);
