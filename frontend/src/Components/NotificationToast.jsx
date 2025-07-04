import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationToast = ({ show, onClose, message, variant = "success" }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotificationToast;
