import React from "react";
import "./Modal.css";

function Modal(props) {
  const { show, title, children } = props;
  const clickOutside = () => {
    props.closeModal();
  };
  return (
    <div>
      {show ? (
        <div className="modal" onClick={clickOutside}>
          <div
            className="modal-dialog"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
