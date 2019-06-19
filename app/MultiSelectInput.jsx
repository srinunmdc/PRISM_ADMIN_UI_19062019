import React, { Component } from "react";
import Select from "react-select";
export default class MultiSelectInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value){
    this.setState({
      value
    });
    var result= [];
    for (var i = 0; i < value.length; i++) {
      result[i] = value[i].value;
    }
    this.props.onSelect(result);

  }

  createOptionsFromList(listValues){
    var options = [];
    for (var i = 0; i < listValues.length; i++) {
      options[i] = {"value":listValues[i], "label":listValues[i]}
    }
    return options
  }

  render(){
    const { value } = this.state;
    var options = this.createOptionsFromList(this.props.data);
    return(
      <div className="ad-search-type">
        <div className="di sm search-type">
          <div className="remove-gray">
            <label className="dropdown-label">{this.props.name}</label>
          </div>
        </div>
        <div className="di sm search-box">
          <Select
            name="form-field-name"
            multi={true}
            value={value}
            onChange={this.handleChange}
            options={options}
            placeholder={this.props.textplaceHolder}
          />
        </div>

      </div>

    );
  }

}
