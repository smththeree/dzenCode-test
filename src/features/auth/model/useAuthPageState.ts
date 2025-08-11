import { useForm } from "react-hook-form";
import { AuthSchema, type AuthSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/store";
import { setToken } from "./auth.slice";
export const useAuthPageState = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AuthSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: AuthSchemaType) => {
    try {
      login(data.username, data.password)
        .then((response) => {
          console.log("Login successful:", response.data);
          dispatch(setToken(response.data.token));
          toast.success("Login successful");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          toast.error("Login failed. Please check your credentials.");
        });
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
