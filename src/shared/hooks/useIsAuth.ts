import { useAppSelector, type RootState } from "@/app/store";

export const useIsAuth = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.token);
  return Boolean(isAuth);
};
