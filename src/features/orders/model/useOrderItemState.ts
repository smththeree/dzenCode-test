import type { Order } from "@/shared/types";
import { useState } from "react";
import { toast } from "sonner";
import { useRemoveOrderMutation } from "../api";
import { getTotalPrice } from "@/shared/utils";
import { useAppDispatch } from "@/app/store";
import { setOrderData } from "./order.slice";

export const useOrderItemState = (order: Order) => {
  const [show, setShow] = useState(false);
  const [removeOrder] = useRemoveOrderMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = getTotalPrice(order);
  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    try {
      await removeOrder(+order.id).unwrap();
      dispatch(setOrderData(null));
      toast.success("Order deleted");
    } catch (e) {
      console.error("Failed to delete order", e);
    }
  };

  return { totalPrice, show, handleClose, handleShow, handleRemove };
};
