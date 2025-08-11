import { api } from "@/shared/api/api-instance";

export const login = (username: string, password: string) => {
  return api.post("/login", { username, password });
};
