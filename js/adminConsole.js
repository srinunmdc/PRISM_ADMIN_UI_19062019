function formatdateInString(date) {
	var date = new Date(date);
	const months = {
		0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
		6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
	};
	var newDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	return newDate;
};

function advancedSearchFormatdate(d) {

	var d = new Date(d);
	return (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
};

var adStartDate = new Date();
var adEndDate = new Date();
function datepickerforAdvancedSearch(defaultDate, id, datechange) {

  if(id){
    var datepickerdiv = document.getElementById(id);
    $('#'+id).find(':input').prop("placeholder", "Issued on");
  }

  var ttStart = new Date();
  var ttEnd = new Date();
  var defal = (id == "fromDate" ? defaultDate.startDate : defaultDate.endDate)
  if(!defal){
    defal = new Date();
  }

  ReactDOM.render(
    React.createElement(DI.Components.AlmanacPicker, {
      defaultValue: new Date(defal),
      popover: true,
      useOverlay: true,
      hideSaveButton: true,
      hideCloseButton: true,
      closeOnSelect: true,
      //maxStartDate: ttStart.setHours(ttStart.getHours() - (24 * 365)),
      //maxEndDate: ttEnd.setHours(ttEnd.getHours() + (24 * 365)),
      onDateSelect: function (date) {
        if(datechange) datechange(convert(date.toString()))
      }
    }), datepickerdiv);

  function convert(str) {
    const mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = str.split(" ");

    const issuecheckdate = [date[3], mnths[date[1]], date[2]].join("-");
    return issuecheckdate;
    //alert('Selected Date : '+ issuecheckdate)
  }
};

function addAttrToDropDownDiv(targetEle) {
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isIE = /*@cc_on!@*/ false || !!document.documentMode;
  if (isFirefox || isIE) {
    $(targetEle).attr('role', 'application');
  }
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e;
}
