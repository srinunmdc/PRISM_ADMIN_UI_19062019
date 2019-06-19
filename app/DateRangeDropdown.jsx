import React, { Component } from "react";


export default class DateRangeDropDown extends Component {

  constructor(props){
    super(props);
      const data = [
        {id: "1", name: "Last 24 Hours"},
        {id: "7", name: "Last 7 days"},
        {id: "15", name: "Last 15 Days"},
        {id: "30", name: "Last 30 Days"}
      ]
    this.state = {
          data: data,
          mounted: true,
          selected: props.default
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  selectedDate(item){
    this.setState({selected : item.id})
    this.props.selected(item)
  }

  handleKeyEventSelectedDate(item, event) {
    let DDAccSelector = $(event.target).closest('.DDAccSelector');
		if (event.key == 'Enter') {
			this.selectedDate(item);
      $(DDAccSelector).focus();
      event.preventDefault();
		}
	}

  render(){
    return(
      <div className="Dropdown-menu">
        {
          this.state.data.map((item,index) =>{
            var _selected = "";
            if(item.id == this.state.selected)
            _selected = "is-selected"
            return(
              <div
                aria-label={item.name}
                className={"Dropdown-option "+_selected}
                onClick={this.selectedDate.bind(this, item)}
                onKeyDown={this.handleKeyEventSelectedDate.bind(this, item)}
              >
                {item.name}
              </div>
            )
          })
        }
        <div className="ad-search-date-custom">
          <h4>Custom dates</h4>
          <div className="ad-date">
            <div className="ad-from">
              <span className="ad-from-span"> From </span>
              <CustomDatePicker defaultDate={this.props.data} id="fromDate" datePicked={this.selectedDate.bind(this)} />
            </div>
            <div className="ad-to">
              <span className="ad-to-span"> To </span>
              <CustomDatePicker defaultDate={this.props.data} id="toDate" datePicked={this.selectedDate.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }


  handleDocumentClick (event) {
    if (this.state.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.props.close();
      }
    }
  }

  componentDidMount () {
      document.addEventListener('click', this.handleDocumentClick, false)
      document.addEventListener('touchend', this.handleDocumentClick, false)
      addAttrToDropDownDiv($('.DDAccSelector'));
  }
  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)

    _Adobj = {id : "customDate", startDate: null, endDate: null}
  }
}

var _Adobj = {id : "customDate", startDate: null, endDate: null}
class CustomDatePicker extends Component {

  // componenWillReceiveProps(nextProps){
  //   datepickerforAdvancedSearch(this.props.defaultDate ? this.props.defaultDate : new Date())
  // }

  render(){
    return(
      <div id={this.props.id} className="hidden-xs ad-date-div"></div>
    )
  }


  datechange(d){
    if(this.props.id === "fromDate"){
      _Adobj.startDate = d;
      //var def = this.props.defaultDate;
      //def.startDate = advancedSearchFormatdate(d)
      //datepickerforAdvancedSearch( def, "toDate", this.datechange.bind(this))
    }else{
      _Adobj.endDate = d;
    }
    this.props.datePicked(_Adobj)
  }

  componentDidMount(){
    datepickerforAdvancedSearch(this.props.defaultDate ? this.props.defaultDate : new Date() , this.props.id, this.datechange.bind(this))
  }

}
