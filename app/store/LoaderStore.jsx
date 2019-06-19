"use strict";

import { observable, action, configure } from "mobx";

configure({ enforceActions: "observed" });

class LoaderStore {
  @observable isLoading = false;

  @observable isAppLoading = false;

  @action
  loadingStart = () => {
    this.isLoading = true;
  };

  @action
  loadingComplete = () => {
    this.isLoading = false;
  };

  @action
  appLoadingStart = () => {
    this.isAppLoading = true;
  };

  @action
  appLoadingComplete = () => {
    this.isAppLoading = false;
  };
}
const LoaderResourceStore = new LoaderStore();
export default LoaderResourceStore;
