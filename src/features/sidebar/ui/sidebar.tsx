import { routeEntries } from "@/shared/constants/routes";
import "./sidebar.scss";
import avatar from "@/shared/assets/avatar.svg";
import { Link } from "react-router";
import { Form, Offcanvas } from "react-bootstrap";
import { cn } from "@/shared/utils";
import { useSideBarState } from "../model/useSideBarState";
import { useTranslation } from "react-i18next";
type Props = {
  show: boolean;
  handleClose: () => void;
};
export const SideBar = ({ show, handleClose }: Props) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const { activeId, handleClick } = useSideBarState(handleClose);
  return (
    <Offcanvas show={show} onHide={handleClose} responsive="lg">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{t("Navigation")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="sidebar">
        <aside className="sidebar__container">
          <div className="sidebar__container-image">
            <img src={avatar} alt="avatar" />
          </div>
          <nav className="sidebar__container-nav">
            <ul>
              {routeEntries.map(([key, path], index) => (
                <li
                  key={key}
                  onClick={() => handleClick(index)}
                  className={cn("", { active: activeId == index })}
                >
                  <Link to={path}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Form.Select
            aria-label="Change language"
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
            className="language__select"
          >
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </Form.Select>
        </aside>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
