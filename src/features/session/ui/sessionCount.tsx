import { useSessionCountState } from "../model/useSessionCountState";

export const SessionCount = () => {
  const { count } = useSessionCountState();
  return (
    <div style={{ padding: "8px", background: "#eee", borderRadius: "4px" }}>
      Active Sessions: {count}
    </div>
  );
};
