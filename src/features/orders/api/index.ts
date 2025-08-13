import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "@/shared/types";
import type { RootState } from "@/app/store";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getAllOrders: build.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    removeOrder: build.mutation<void, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrder: build.mutation<void, Pick<Order, "title" | "description">>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useRemoveOrderMutation,
  useCreateOrderMutation,
} = ordersApi;
