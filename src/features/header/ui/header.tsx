import { useFormattedDateTime } from "@/shared/hooks";
import "./header.scss";
import logo from "@/shared/assets/logo.svg";
import alarm from "@/shared/assets/alarm.svg";
const Header = () => {
  const { date, time } = useFormattedDateTime(new Date());
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} className="header__logo-img" alt="Inventory" />
        <h3 className="header__logo-title">Inventory</h3>
      </div>
      <div className="header__date">
        <span className="header__date-day">Today</span>
        <div className="header__date-month">
          <span className="header__date-format">{date}</span>
          <div className="header__date-time">
            <img src={alarm} className="header__time-img" alt="Inventory" />
            {time}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
