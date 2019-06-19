import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

class MainTooltip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    window.that = this;
    const close =
      "<span class='di-icon-close tooltip-close' aria-hidden='true' onclick=window.that.tooltip.tooltipRef=null;window.that.tooltip.hideTooltip();></span>";
    return (
      <ReactTooltip
        event="click"
        globalEventOff="click"
        place="bottom"
        effect="solid"
        className="help-tooltip"
        multiline
        html
        clickable
        afterShow={evt => {
          for (const tooltip of document.querySelectorAll(".help-tooltip")) {
            tooltip.addEventListener("click", e => e.stopPropagation());
          }
        }}
        afterHide={evt => {
          for (const tooltip of document.querySelectorAll(".help-tooltip")) {
            tooltip.addEventListener("click", e => e.stopPropagation());
          }
        }}
        offset={{ top: -10, right: 3 }}
        ref={el => (this.tooltip = el)}
        getContent={(dataTip) => `${close}${dataTip}`}
      />
    );
  }
}

export default MainTooltip;
