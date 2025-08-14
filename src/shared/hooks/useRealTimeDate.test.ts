import { renderHook, act } from "@testing-library/react";
import { useRealTimeDate } from "./useRealTimeDate";

describe("useRealTimeDate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-01-01T12:00:00"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return formatted date and time", () => {
    const { result } = renderHook(() =>
      useRealTimeDate(new Date("2025-01-01T12:00:00"))
    );

    expect(result.current.date).toBe("01 JAN, 2025");
    expect(result.current.time).toBe("12:00:00");
  });

  it("should update time every second", () => {
    const { result } = renderHook(() =>
      useRealTimeDate(new Date("2025-01-01T12:00:00"))
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe("12:00:01");

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.time).toBe("12:00:03");
  });
});
