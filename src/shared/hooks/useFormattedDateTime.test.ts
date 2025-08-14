import { renderHook } from "@testing-library/react";
import { useFormattedDateTime } from "./useFormattedDateTime";

describe("useFormattedDateTime", () => {
  it("should format a valid date correctly", () => {
    const testDate = new Date("2025-08-14T15:45:00");

    const { result } = renderHook(() => useFormattedDateTime(testDate));

    expect(result.current.date).toBe("14 AUG, 2025");
    expect(result.current.time).toBe("15:45");
  });

  it("should return empty strings if input is not a Date", () => {
    // @ts-expect-error — wrong type
    const { result } = renderHook(() => useFormattedDateTime("invalid-date"));

    expect(result.current.date).toBe("");
    expect(result.current.time).toBe("");
  });
});
