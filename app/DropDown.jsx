import React, { Component } from "react";
export default class DropDown extends Component{
  constructor(props){
      super(props);
      this.state = {
        stDropdown: false,
        mounted: true,
      };

  }
  close(){
		this.setState({stDropdown: false})
	}

	statusDropdownToggle(){
		this.setState({stDropdown: !this.state.stDropdown})

	}

	statusSelecte(status){
    //this.props.selected(status);onSelect
        this.props.onSelect(status);
    this.close();
	}
  render(){
      const {data} = this.props
     /* if(data) {
          this.setState({default: this.props.default});
      }*/
    return(
      <div className="di dropdown" style={{width: `${this.props.width}%`}} onClick={this.statusDropdownToggle.bind(this)}>
        <div className="dropdown-control on-gray">
          <div className="Dropdown-placeholder">
            {
              this.props.default
            }
          </div>
          <span className="caret"></span>
        </div>
        {
          this.state.stDropdown
            ? <div className="Dropdown-menu">
              {
                data.map((item,index) =>{
                  var _selected = "";
                  if(item == this.props.default)
                  _selected = "is-selected"
                  return(
                    <div
                      aria-label={item}
                      className={"Dropdown-option "+_selected}
                      onClick={this.statusSelecte.bind(this, item)}

                    >
                      {item}
                    </div>
                  )
                })
              }
            </div>
            : null
        }
      </div>
    );
  }




}
