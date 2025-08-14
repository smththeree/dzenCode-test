import { useEffect, useState } from "react";

export const useRealTimeDate = (initialDate: Date) => {
  const [now, setNow] = useState(() => new Date(initialDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!(now instanceof Date)) {
    return { date: "", time: "" };
  }

  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = now.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return { date: formattedDate, time: formattedTime };
};
