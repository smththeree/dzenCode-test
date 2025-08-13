import { useForm } from "react-hook-form";
import { OrderSchema, type OrderSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrderMutation } from "../api";
import { toast } from "sonner";

export const useOrderFormState = (handleClose: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSchemaType>({
    mode: "onChange",
    resolver: zodResolver(OrderSchema),
  });
  const [createOrder] = useCreateOrderMutation();
  const onSubmit = async (data: OrderSchemaType) => {
    try {
      await createOrder(data).unwrap();
      toast.success("Order created");
      handleClose();
    } catch (e) {
      console.error("Failed to create order", e);
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
