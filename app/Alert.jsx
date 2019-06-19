import React from "react";
import PropTypes from "prop-types";

const Alert = ({
  alertClass,
  highlightedMessage,
  detailMessage,
  showCloseIcon,
  handleClose
}) => (
  <div className={`media alert alert-${alertClass}`}>
    <div className="media-left" />
    <div className="media-body">
      {showCloseIcon && (
        <span className="close" aria-label="close" onClick={handleClose}>
          &times;
        </span>
      )}
      <strong>{highlightedMessage}</strong> {detailMessage}
    </div>
  </div>
);

Alert.propTypes = {
  alertClass: PropTypes.oneOf([
    "success",
    "info",
    "danger",
    "warning",
    "message"
  ]),
  highlightedMessage: PropTypes.string.isRequired,
  detailMessage: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  handleClose: PropTypes.func
};

Alert.defaultProps = {
  alertClass: "message",
  detailMessage: "",
  showCloseIcon: false,
  handleClose: null
};

export default Alert;
