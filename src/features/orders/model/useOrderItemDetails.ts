import { useAppSelector } from "@/app/store";
import { useGetProductsByOrderIdQuery } from "../api";
import { useState } from "react";

export const useOrderItemDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const activeOrderDetails = useAppSelector((state) => state.order.orderData);
  const orderId = Number(activeOrderDetails?.id) || 0;
  const { data: products, isFetching } = useGetProductsByOrderIdQuery(orderId, {
    skip: !activeOrderDetails,
  });
  return {
    products,
    isFetching,
    show,
    handleClose,
    handleShow,
    activeOrderDetails,
  };
};
