"use strict";
import { observable, action, configure, toJS } from "mobx";
import sort from "../util/sort";
configure({ enforceActions: "observed" });

class AlertTypeStore {
  @observable alertTypes = [];
  @observable filteredAlertTypes = [];
  @observable alertCategories = {};
  @observable eventTypes = [];

  @action
  setAlertTypes = alertTypeResources => {
    if (
      alertTypeResources &&
      alertTypeResources.alertTypes &&
      Array.isArray(alertTypeResources.alertTypes)
    ) {
      const alertTypes = this.processData(
        alertTypeResources.alertTypes.slice()
      );

      this.alertTypes = alertTypes;
      this.filteredAlertTypes = alertTypes;

      let categoryOptions = this.fetchCategories(alertTypes);
      this.alertCategories = {
        selected: categoryOptions[0],
        options: categoryOptions
      };
      this.eventTypes = this.fetchEventTypes(alertTypes);
    }
  };

  @action
  setFilteredAlertTypes = (deliverFilter, categorey, searchText) => {
    console.log(searchText);

    let beforeFiltered = this.alertTypes;

    if (categorey && categorey !== "" && categorey !== "All Categories") {
      beforeFiltered = this.alertTypes.filter(item => {
        if (item.alertCategory === categorey) {
          return item;
        }
      });
    }
    beforeFiltered = beforeFiltered.filter(item => {
      if (deliverFilter["EMAIL"] && item.deliveryTypes.includes("EMAIL")) {
        return item;
      } else if (deliverFilter["SMS"] && item.deliveryTypes.includes("SMS")) {
        return item;
      } else if (deliverFilter["PUSH"] && item.deliveryTypes.includes("PUSH")) {
        return item;
      }
    });

    beforeFiltered = beforeFiltered.filter(item => {
      if (item.searchText.toLowerCase().includes(searchText.toLowerCase())) {
        return toJS(item);
      }
    });
    this.filteredAlertTypes = beforeFiltered;
    console.log(this.filteredAlertTypes);
  };

  processData = data => {
    return data.map(item => {
      return {
        ...item,
        searchText:
          item.description +
          " " +
          item.alertTypeName +
          " " +
          item.platform +
          " " +
          item.vendor
      };
    });
  };

  fetchCategories = data => {
    let categories = ["All Categories"];
    data.map(item => {
      if (item.alertCategory && item.alertCategory != "") {
        categories.push(item.alertCategory);
      }
    });

    return [...new Set(categories)];
  };

  @action
  setCategories = category => {
    this.alertCategories.selected = category;
  };

  fetchEventTypes = data => {
    let eventTypes = ["All Events"];

    return [...new Set(eventTypes)];
  };

  resetStore = () => {
    this.alertTypes = [];
    this.filteredAlertTypes = [];
  };
}
const AlertTypeResourceStore = new AlertTypeStore();
export default AlertTypeResourceStore;
