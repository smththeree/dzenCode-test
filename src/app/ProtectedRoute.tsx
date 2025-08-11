import { ROUTES } from "@/shared/constants";
import { useIsAuth } from "@/shared/hooks";

import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
