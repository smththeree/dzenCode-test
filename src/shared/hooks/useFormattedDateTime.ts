import { useMemo } from "react";

export const useFormattedDateTime = (date: Date) => {
  return useMemo(() => {
    if (!(date instanceof Date)) {
      return { date: "", time: "" };
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();

    const formattedDate = `${day} ${month}, ${year}`;

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { date: formattedDate, time: formattedTime };
  }, [date]);
};
