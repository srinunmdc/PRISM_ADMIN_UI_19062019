import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { PageLoader, Loader } from "di-components";
import LoadingOverlay from "react-loading-overlay";

import AdvancedSearch from "./AdvancedSearch";
import ResultTable from "./ResultTable";
import AlertTypeService from "./service/AlertTypeService";
import AlertPermissionsService from "./service/AlertPermissionsService";

@inject("loaderStore")
@observer
class MainLayout extends Component {
  componentDidMount() {
    AlertTypeService.loadAlertTypeResources();
    AlertPermissionsService.loadPermissions();
  }

  onSuccess(response) {
    console.log("Success Result :");
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const channels = response[i].channels;
      for (const key in channels) {
        if (channels.hasOwnProperty(key)) {
          response[i][key.toLowerCase()] = channels[key];
        }
      }
      delete response[i].channels;
      // to change coulumn Colour to identify sucess or failure
      /* for(var key in response[i].status){
              console.log(response[i].status[key]);
               if(response[i].status[key] == "true"){
                response[i].status[key]="green"
              }else if(response[i].status[key] == "false"){
                response[i].status[key]="red"
              }
           } */
    }
    console.log("Table Result :");
    console.log(response);
    this.setState({ results: response });
  }

  render() {
    const { loaderStore } = this.props;
    if (loaderStore.isAppLoading) {
      return (
        <div className="main-layout-loader">
          <PageLoader />
        </div>
      );
    }
    return (
      <LoadingOverlay
        active={loaderStore.isLoading}
        spinner={<Loader />}
        text="Loading..."
        styles={{
          overlay: base => ({
            ...base,
            background: "rgba(0, 0, 0, 0.3)"
          })
          //   wrapper: {
          //     minHeight: '100vh',
          //   }
        }}
      >
        <div>
          <div className="ad-search-pannel">
            <AdvancedSearch />
          </div>
          <div className="row">
            <div className="col-xs-12">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <ResultTable />
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default MainLayout;
