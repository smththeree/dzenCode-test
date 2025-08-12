import { routeEntries } from "@/shared/constants/routes";
import "./sidebar.scss";
import avatar from "@/shared/assets/avatar.svg";
import { Link } from "react-router";
import { Offcanvas } from "react-bootstrap";
import { cn } from "@/shared/utils";
import { useSideBarState } from "../model/useSideBarState";
type Props = {
  show: boolean;
  handleClose: () => void;
};
export const SideBar = ({ show, handleClose }: Props) => {
  const { activeId, handleCLick } = useSideBarState(handleClose);
  return (
    <Offcanvas show={show} onHide={handleClose} responsive="md">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Navigation</Offcanvas.Title>
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
                  onClick={() => handleCLick(index)}
                  className={cn("", { active: activeId == index })}
                >
                  <Link to={path}>{key}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
