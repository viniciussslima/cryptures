import React from "react";

import "./Modal.css";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1>{title}</h1>
        <div className="modal-close-button" onClick={onClose}>
          X
        </div>
        <hr />
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
