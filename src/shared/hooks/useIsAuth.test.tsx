import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";

import { useIsAuth } from "./useIsAuth";
import { authSlice } from "@/features/auth/model/auth.slice";

describe("useIsAuth", () => {
  it("should return true if token exists", () => {
    const store = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: { token: "123" },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useIsAuth(), { wrapper });

    expect(result.current).toBe(true);
  });

  it("should return false if token does not exist", () => {
    const store = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: { token: null },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useIsAuth(), { wrapper });

    expect(result.current).toBe(false);
  });
});
