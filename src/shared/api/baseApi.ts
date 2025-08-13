import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth: { token?: string } };
      const token = state.auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Products", "Orders"],
  endpoints: () => ({}),
});
