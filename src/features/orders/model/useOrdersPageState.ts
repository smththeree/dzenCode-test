import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../api";
import { setOrderData } from "./order.slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import type { Order } from "@/shared/types";

export const useOrdersPageState = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setIsShowDetails] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useAppDispatch();
  const activeOrderDetails = useAppSelector((state) => state.order.orderData);

  const { data: orders, error, isFetching } = useGetAllOrdersQuery();

  useEffect(() => {
    return () => {
      dispatch(setOrderData(null));
    };
  }, [dispatch]);

  const handleShowDetails = (order: Order) => {
    dispatch(setOrderData(order));
    if (order.id === activeOrderDetails?.id) {
      dispatch(setOrderData(null));
      setIsShowDetails(false);
    } else {
      setIsShowDetails(true);
    }
  };

  return {
    orders,
    error,
    show,
    handleClose,
    handleShow,
    isFetching,
    handleShowDetails,
    showDetails,
  };
};
