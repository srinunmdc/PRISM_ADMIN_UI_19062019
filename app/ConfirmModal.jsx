import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import Backdrop from "./backdrop";
import { fail } from "assert";

const ConfirmModal = ({ show, close, content, confirmHandler, successText, failText}) => {
  const modalClassesArr = ["modal", "fade"];

  let backdrop = null;

  if (show) {
    modalClassesArr.push("in", "show");

    backdrop = <Backdrop />;
  }

  const modalClasses = modalClassesArr.join(" ");

  return (
    <React.Fragment>
      <div
        className={modalClasses}
        id="modalExample3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalExample3"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">{String.fromCharCode(215)}</span>
              </button>

              <h2 className="modal-title">Are you sure?</h2>
            </div>

            <div className="modal-body">
              <div className="di-callout xs-void">{content}</div>
            </div>

            <div className="modal-footer">
              <Button
                btnType="button"
                btnName={successText}
                btnClass="btn btn-primary"
                clickHandler={confirmHandler}
              />

              <Button
                btnType="button"
                btnName={failText}
                btnClass="btn btn-secondary"
                clickHandler={close}
              />
            </div>
          </div>
        </div>
      </div>

      {backdrop}
    </React.Fragment>
  );
};

export default ConfirmModal;

ConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  confirmHandler: PropTypes.func.isRequired
};
