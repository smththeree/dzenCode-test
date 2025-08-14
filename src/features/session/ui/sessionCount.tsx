import { useSessionCountState } from "../model/useSessionCountState";
import "./sessionCount.scss";
export const SessionCount = () => {
  const { count } = useSessionCountState();
  return <div className="session_count">Active Sessions: {count}</div>;
};
