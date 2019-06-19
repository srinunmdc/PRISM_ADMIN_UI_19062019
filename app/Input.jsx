import React, { Component } from "react";
export default class Input extends Component{
  constructor(props){
      super(props);

  }
  render(){
    return(
      <div>
          {this.props.name ?
              <div className="di sm search-type">
                  <div className="remove-gray">
                      <label className="dropdown-label">{this.props.name}</label>
                  </div>
              </div>
                  : null
          }
          <input className="form-control input-xlg input-default" type="text" id="adSearchValue" onPaste={this.onChangeSearch.bind(this)} onChange={(e)=>this.onChangeSearch(e)} placeholder={this.props.textplaceHolder} />
      </div>

    );
  }
  onChangeSearch = (e)=>{
      let val = e.target.value;
      if(val.length > 2 || val.length === 0)
        this.props.onChange(e.target.value);



  }
}
