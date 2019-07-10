import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

class ToggleSwitch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toggleState : true
    }
  }
  
  onToggleClick = () => {
    this.setState({
      toggleState: !this.state.toggleState
    });
    this.props.onClick();
  }

  render() {

    const { toggleState } = this.state; 
    const toggle = toggleState ? "active" : ""
    return (
      
        <div data-reactroot="" class="di-toggle-switch-container sm">
          <div class="sr-only" role="alert" aria-live="assertive" aria-atomic="true">
            OFF
          </div>
          <div class={`di-toggle-switch ${toggle}`} role="application" aria-labelledby="" tabindex="0" onClick={() => this.onToggleClick()}>
            <span class="label-on " id="labelOn">ON</span>&nbsp;<span class="label-slider"> 
            </span>&nbsp;<span class="label-off " id="labelOff">OFF</span>
          </div>
        </div>
      
    );
  }
}

ToggleSwitch.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ToggleSwitch;
