import { observable, action, configure, toJS } from "mobx";

configure({ enforceActions: "observed" });
class AlertTemplateStore {
  @observable alertTemplates = [];

  @observable previewAlertTemplates = [];

  @observable templateContentTypes = {};

  @action
  setTemplates = (alertTemplateResources, isLoaded, contentType) => {
    if (alertTemplateResources && Array.isArray(alertTemplateResources)) {
      const alertTemplates = this.processData(alertTemplateResources.slice());

      // let finalData = this.processData(JSON.parse(_data.alertTypes).alertTypes);
      this.alertTemplates = alertTemplates;

      const contentTypes = this.loadContentTypes(alertTemplates);
      if (isLoaded) {
        this.templateContentTypes.options = contentTypes;
      } else {
        this.templateContentTypes = {
          selected: contentType || contentTypes[0],
          options: contentTypes
        };
      }
    }
  };

  @action
  resetStore = () => {
    this.alertTemplates = [];
    this.previewAlertTemplates = [];
    this.templateContentTypes = {};
  };

  loadContentTypes = alertTemplates => {
    const types = alertTemplates.map(obj => obj.templateContentType);
    return types;
  };

  @action
  setSelectedContentType = selectedContentType => {
    this.templateContentTypes.selected = selectedContentType;
  };

  processData = data => {
    return data.map(item => {
      item.templateContent = item.templateContent.replace(
        /(\<\/span\>)/g,
        "</span>&zwnj;"
      );
      item.templateContent = item.templateContent.replace(
        /(\<span)/g,
        "&zwnj;<span"
      );
      return {
        ...item,
        changedContent: item.templateContent,
        previewContent: item.templateContent
      };
    });
  };
}
const AlertTemplateResourceStore = new AlertTemplateStore();
export default AlertTemplateResourceStore;
