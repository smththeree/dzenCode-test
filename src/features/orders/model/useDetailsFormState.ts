import { useForm } from "react-hook-form";
import { ProductSchema, type ProductSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { productsApi } from "@/features/products";
import { useAppSelector } from "@/app/store";

export const useDetailsFormState = (handleClose: () => void) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    mode: "onChange",
    resolver: zodResolver(ProductSchema),
  });
  const [addProduct] = productsApi.useCreateProductMutation();
  const activeOrderId = useAppSelector((state) => state.order.orderData);
  const orderId = Number(activeOrderId?.id) || 0;
  const onSubmit = async (data: ProductSchemaType) => {
    try {
      await addProduct({
        ...data,
        serialNumber: +data.serialNumber,
        isNew: +data.isNew,
        order: orderId,
        title: data.title,
        guarantee: {
          start: String(data.guarantee.start),
          end: String(data.guarantee.end),
        },
        price: [
          {
            isDefault: data.price.isDefault ? 1 : 0,
            symbol: data.price.symbol,
            value: +data.price.value,
          },
        ],
      }).unwrap();
      toast.success("Product created");
      handleClose();
    } catch (e) {
      console.error("Failed to create product", e);
    }
  };

  return { register, handleSubmit, errors, onSubmit, control };
};
