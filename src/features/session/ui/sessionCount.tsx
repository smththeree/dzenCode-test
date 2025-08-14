import { useTranslation } from "react-i18next";
import { useSessionCountState } from "../model/useSessionCountState";
import "./sessionCount.scss";
export const SessionCount = () => {
  const { t } = useTranslation();
  const { count } = useSessionCountState();
  return (
    <div className="session_count">
      {t("Active sessions")}: {count}
    </div>
  );
};
