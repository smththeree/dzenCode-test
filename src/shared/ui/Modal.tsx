import { Modal as BootstrapModal } from "react-bootstrap";

type Props = {
  heading: string;
  children: React.ReactNode;
  show: boolean;
  handleClose: () => void;
  closeButton?: React.ReactNode;
  saveButton?: React.ReactNode;
};

const Modal = ({
  heading,
  children,
  show,
  handleClose,
  closeButton,
  saveButton,
}: Props) => {
  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{heading}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      {closeButton && saveButton && (
        <BootstrapModal.Footer>
          {closeButton}
          {saveButton}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

export default Modal;
