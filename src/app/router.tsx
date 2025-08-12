import { createBrowserRouter, Navigate, Outlet } from "react-router";

import { ROUTES } from "@/shared/constants";
import { AuthPage } from "@/features/auth";
import RequireUnauth from "./requireUnAuth";
import { Toaster } from "sonner";
import { Layout } from "@/features/layout";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Toaster position="bottom-right" />
        <Outlet />
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
            element: <>Orders</>,
          },
          {
            path: ROUTES.PRODUCTS,
            element: <>Products</>,
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
