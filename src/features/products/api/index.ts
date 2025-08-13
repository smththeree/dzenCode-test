import type { Product } from "@/shared/types";

import { baseApi } from "@/shared/api";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    removeProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Orders"],
    }),
    createProduct: build.mutation<void, Omit<Product, "id" | "date" | "photo">>(
      {
        query: (product) => ({
          url: "/products",
          method: "POST",
          body: product,
        }),
        invalidatesTags: ["Products", "Orders"],
      }
    ),
  }),
});

export const {
  useGetAllProductsQuery,
  useRemoveProductMutation,
  useCreateProductMutation,
} = productsApi;
