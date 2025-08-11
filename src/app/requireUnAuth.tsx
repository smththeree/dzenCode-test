import { ROUTES } from "@/shared/constants";
import { useIsAuth } from "@/shared/hooks";
import { Navigate } from "react-router";

const RequireUnauth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to={ROUTES.ORDERS} replace />;
  }

  return children;
};

export default RequireUnauth;
