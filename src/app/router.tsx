import { createBrowserRouter } from "react-router";
import App from "./App";
import { ROUTES } from "@/shared/constants";
import { AuthPage } from "@/features/auth";
import Providers from "./Providers";
import ProtectedRoute from "./ProtectedRoute";
import RequireUnauth from "./requireUnAuth";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: (
              <div>
                <h1>Welcome to the Dashboard</h1>
              </div>
            ),
            children: [
              {
                path: ROUTES.ORDERS,
                element: <>Orders Page</>,
              },
              {
                path: ROUTES.PRODUCTS,
                element: <>Products Page</>,
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <>
            <RequireUnauth>
              <AuthPage />
            </RequireUnauth>
          </>
        ),
      },
    ],
  },
]);
