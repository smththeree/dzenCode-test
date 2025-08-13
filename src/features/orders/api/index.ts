import type { Order, Product } from "@/shared/types";

import { baseApi } from "@/shared/api";

export const ordersApi = baseApi.injectEndpoints({
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
      invalidatesTags: ["Orders", "Products"],
    }),
    createOrder: build.mutation<void, Pick<Order, "title" | "description">>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    getProductsByOrderId: build.query<Product[], number>({
      query: (id) => `/orders/${id}/products`,
      providesTags: ["Products", "Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useRemoveOrderMutation,
  useCreateOrderMutation,
  useGetProductsByOrderIdQuery,
} = ordersApi;
