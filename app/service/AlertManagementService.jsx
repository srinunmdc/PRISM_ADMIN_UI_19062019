"use strict";

import axios from "axios";
import { toJS } from "mobx";

export default class AlertManagementService {
  static getTemplates(alertTypeResource) {
    const commonUrlLocal = dashboard.getTemplates;
    return axios.post(
      commonUrlLocal,
      {},
      { params: { alertTypeName: alertTypeResource.alertTypeName } }
    );
  }

  static getAlertTypeResources() {
    const commonUrlLocal = dashboard.getAlertTypeRecords;
    return axios.post(commonUrlLocal,{});
  }

  static saveTemplates(alertTemplate) {
    const commonUrlLocal = dashboard.saveTemplates;
    return axios.post(commonUrlLocal, toJS(alertTemplate));
  }

  static publishTemplate(template) {
    const commonUrlLocal = dashboard.publishTemplate;
    return axios.post(
      commonUrlLocal,
      {},
      {
        params: {
          id: template.alertTemplateResourceId,
          alertTypeName: template.alertTypeName
        }
      }
    );
  }


  static deleteTemplate(template) {
    const commonUrlLocal = dashboard.deleteTemplate;
    return axios.post(
      commonUrlLocal,
      {},
      {
        params: {
          id: template.alertTemplateResourceId,
          alertTypeName: template.alertTypeName
        }
      }
    );
  }

  static loadPermissions() {
    const commonUrlLocal = dashboard.getPermissions;
    return axios.post(commonUrlLocal,{});
  }
}
