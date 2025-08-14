import "./header.scss";
import logo from "@/shared/assets/logo.svg";
import aside from "@/shared/assets/aside.svg";
import { Button } from "react-bootstrap";
import { SessionCount } from "@/features/session";
import HeaderDate from "./headerDate";
export const Header = ({ handleShow }: { handleShow: () => void }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} className="header__logo-img" alt="Inventory" />
        <h3 className="header__logo-title">Inventory</h3>
      </div>
      <SessionCount />
      <HeaderDate />
      <Button
        variant="primary"
        className="d-lg-none header__asideBtn"
        onClick={handleShow}
      >
        <img src={aside} alt="aside btn" className="header__asideBtn-img" />
      </Button>
    </header>
  );
};
