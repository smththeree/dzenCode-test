import type { Order } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

interface OrderSlice {
  activeOrderId: string | null;
  orderData: Order | null;
}

const initialState: OrderSlice = {
  activeOrderId: null,
  orderData: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setActiveOrderId: (state, action) => {
      state.activeOrderId = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

export const { setActiveOrderId, setOrderData } = orderSlice.actions;
