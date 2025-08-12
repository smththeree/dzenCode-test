import ProtectedRoute from "@/app/ProtectedRoute";
import { Header } from "@/features/header";
import { SideBar } from "@/features/sidebar";
import { useLayoutState } from "../model/useLayoutState";

export const Layout = () => {
  const { show, handleClose, handleShow } = useLayoutState();
  return (
    <div className="layout">
      <Header handleShow={handleShow} />
      <div className="layout__content">
        <SideBar show={show} handleClose={handleClose} />
        <ProtectedRoute />
      </div>
    </div>
  );
};
