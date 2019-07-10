import React from "react";
import PropTypes from "prop-types";
import Backdrop from "./backdrop";

const FullScreenModal = ({ show, close, content, subjectContent }) => {
  const modalClassesArr = ["modal", "fade"];

  let backdrop = null;

  if (show) {
    modalClassesArr.push("in", "show");

    backdrop = <Backdrop />;
  }

  const modalClasses = modalClassesArr.join(" ");

  const previewDivStyle = {
    border: "1px solid #d1d1d1",
    overflow: "auto",
    padding: "20px",
    height: "80vh",
    wordBreak: "break-word"
  };
  return (
    <React.Fragment>
      <div
        className={modalClasses}
        id="modalExample3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalExample3"
      >
        <div className="modal-dialog modal-lg fulscreen-modal" role="document">
          <div className="modal-content">
            {/*  <div className="modal-header">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">{String.fromCharCode(215)}</span>
              </button>
            </div> */}
            <div style={{ height: "40px" }} className="full-screen-wrapper">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">{String.fromCharCode(215)}</span>
              </button>
            </div>
            <div className="preview-wrapper">
              <div style={previewDivStyle}>
                {subjectContent && (
                  <div>
                    <div className="preview-email-subject">Email Subject</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: subjectContent
                      }}
                    />
                  </div>
                )}
                <div>
                  {subjectContent && (
                    <div className="preview-email-subject">Email Body</div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {backdrop}
    </React.Fragment>
  );
};

export default FullScreenModal;

FullScreenModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
};
