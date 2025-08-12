import { useState } from "react";

export const useSideBarState = (fn: () => void) => {
  const [activeId, setActiveId] = useState(0);

  const handleCLick = (id: number) => {
    setActiveId(id);
    fn();
  };

  return { activeId, handleCLick };
};
