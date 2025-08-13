import type { Order } from "@/shared/types";
import { useState } from "react";
import { toast } from "sonner";
import { useRemoveOrderMutation } from "../api";

export const useOrderItemState = (order: Order) => {
  const [show, setShow] = useState(false);
  const [removeOrder] = useRemoveOrderMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = order.products
    .reduce(
      (a, b) =>
        a +
        b.price.reduce(
          (a, b) => (b.symbol === "USD" ? a + b.value * 42 : a + b.value),
          0
        ),
      0
    )
    .toFixed(2);

  const handleRemove = async () => {
    try {
      await removeOrder(+order.id).unwrap();
      toast.success("Order deleted");
    } catch (e) {
      console.error("Failed to delete order", e);
    }
  };

  return { totalPrice, show, handleClose, handleShow, handleRemove };
};
