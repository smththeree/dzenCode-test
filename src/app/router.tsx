import { createBrowserRouter } from "react-router";
import App from "./App";
import { ROUTES } from "@/shared/constants";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        element: (
          <>
            {/* header */}
            {/* <ProtectedRoute /> */}
          </>
        ),
        children: [
          {
            path: ROUTES.ORDERS,
            element: <> Orders Page</>,
          },
          {
            path: ROUTES.PRODUCTS,
            element: <>Products Page</>,
          },
        ],
      },

      {
        path: ROUTES.SIGNIN,
        element: <></>,
      },
      {
        path: ROUTES.SIGNUP,
        element: <></>,
      },
    ],
  },
]);
