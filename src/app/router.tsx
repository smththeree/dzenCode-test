import { createBrowserRouter, Navigate, Outlet } from "react-router";

import { ROUTES } from "@/shared/constants";
import { AuthPage } from "@/features/auth";

import ProtectedRoute from "./ProtectedRoute";
import RequireUnauth from "./requireUnAuth";
import Header from "@/features/header/ui/header";
import { Toaster } from "sonner";

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
        element: (
          <div className="layout">
            <Header />
            <ProtectedRoute />
          </div>
        ),
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
