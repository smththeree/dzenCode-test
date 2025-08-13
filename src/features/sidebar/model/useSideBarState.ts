import { useState } from "react";

export const useSideBarState = (fn: () => void) => {
  const [activeId, setActiveId] = useState(() => {
    const saved = localStorage.getItem("activeId");
    return saved ? Number(saved) : 0;
  });

  const handleClick = (id: number) => {
    setActiveId(id);
    localStorage.setItem("activeId", id.toString()); // сохраняем в localStorage
    fn();
  };

  return { activeId, handleClick };
};
