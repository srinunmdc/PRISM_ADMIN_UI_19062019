"use strict";
import { observable, action, configure } from "mobx";

configure({ enforceActions: "observed" });

class AlertPermissionStore {
  @observable permissions = {};

  @action
  setPermissions = permissions => {
    if (permissions) {
      this.permissions = permissions;
    }
  };

  resetStore = () => {
    this.permissions = {};
  };
}
const AlertPermissionResourceStore = new AlertPermissionStore();
export default AlertPermissionResourceStore;
