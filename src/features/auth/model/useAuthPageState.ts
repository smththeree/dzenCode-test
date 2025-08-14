import { useForm } from "react-hook-form";
import { AuthSchema, type AuthSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/store";
import { setToken } from "./auth.slice";
import { useTranslation } from "react-i18next";
export const useAuthPageState = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AuthSchema),
  });
  const { t } = useTranslation("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: AuthSchemaType) => {
    try {
      const res = await login({
        username: data.username,
        password: data.password,
      }).unwrap();
      dispatch(setToken(res.accessToken));
      toast.success(t("Login successful"));
      navigate("/dashboard/orders");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
