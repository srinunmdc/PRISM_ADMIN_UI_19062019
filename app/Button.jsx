import React from "react";
import PropTypes from "prop-types";

const Button = ({
  withIcon,
  btnType,
  btnClass,
  btnName,
  clickHandler,
  icon
}) => {
  if (withIcon) {
    return (
      <button type={btnType} className={btnClass} onClick={clickHandler}>
        <span className={`glyphicon glyphicon-${icon}`} aria-hidden="true" />
        {` ${btnName}`}
      </button>
    );
  }
  return (
    <button type={btnType} className={btnClass} onClick={clickHandler}>
      {btnName}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  withIcon: false,
  clickHandler: null,
  btnClass: "",
  btnType: "",
  icon: ""
};

Button.propTypes = {
  withIcon: PropTypes.bool,
  btnType: PropTypes.string,
  btnClass: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  icon: PropTypes.string
};
