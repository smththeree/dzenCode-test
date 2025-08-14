import { useRealTimeDate } from "@/shared/hooks";
import alarm from "@/shared/assets/alarm.svg";
import { useTranslation } from "react-i18next";
const HeaderDate = () => {
  const { t } = useTranslation();
  const { date, time } = useRealTimeDate(new Date());
  return (
    <div className="header__date d-none d-sm-block">
      <span className="header__date-day">{t("Today")}</span>
      <div className="header__date-month">
        <span className="header__date-format">{date}</span>
        <div className="header__date-time">
          <img src={alarm} className="header__time-img" alt="Inventory" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default HeaderDate;
