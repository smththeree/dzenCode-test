import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/constants";
import RequireUnauth from "./requireUnAuth";
import { Toaster } from "sonner";
import { Suspense } from "react";

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
        lazy: () =>
          import("@/features/layout/ui/layout").then((m) => ({
            Component: m.Layout,
          })),
        children: [
          {
            path: ROUTES.ORDERS,
            lazy: () =>
              import("@/features/orders/ui/orders.page").then((m) => ({
                Component: m.OrdersPage,
              })),
          },
          {
            path: ROUTES.PRODUCTS,
            lazy: () =>
              import("@/features/products/ui/products.page").then((m) => ({
                Component: m.ProductsPage,
              })),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () =>
          import("@/features/auth/ui/auth.page").then((m) => ({
            Component: (props) => (
              <RequireUnauth>
                <m.AuthPage {...props} />
              </RequireUnauth>
            ),
          })),
      },
    ],
  },
]);
