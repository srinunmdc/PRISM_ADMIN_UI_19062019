import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import EditorTabs from "./editor/EditorTabs";
import AlertTemplateResourceStore from "./store/AlertTemplateStore";
import AlertTemplateService from "./service/AlertTemplateService";

@inject("alertTemplateStore", "loaderStore")
@observer
class ResultRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      editMode: false
    };
  }

  expandAccordian = alertTypeResource => {
    const { collapseID } = this.props;
    const { setCollapseId } = this.props;
    AlertTemplateResourceStore.resetStore();

    if (collapseID === alertTypeResource.alertTypeId) {
      setCollapseId("");
    } else {
      AlertTemplateService.loadAlertTemplatesResources(alertTypeResource);
      setCollapseId(alertTypeResource.alertTypeId);
    }
  };

  onChange = evt => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });

    this.setState({
      edited: true
    });
    if (data.templateContentType === "EMAIL_BODY") {
      data.changedContent = evt.editor.getData();
    } else {
      data.changedContent = evt.editor
        .getData()
        .replace("<p>", "")
        .replace("</p>", ""); // evt.editor.document.getBody().getText();
      /* // For PUSH, SMS and MAIL_SUBJECT content should be plain and thymeleaf tags are in html, logic to handle the CKEditor formating
    var dynamicParams = newContent.match(/\$\{([^}]+)\}/gmi);
    var i;
    for (i=0;i<dynamicParams.length;i++) {
    // var field = dynamicParams[i].substring(2, dynamicParams[i].length-1)
    newContent = newContent.replace(dynamicParams[i], '<span th:text="'+dynamicParams[i]+'">'+dynamicParams[i]+'<span>');
    } */
    }
    // this.props.data.changed = true;
    // AlertTemplateResourceStore.updateTemplateResource(this.props.data)
  };

  onDraft = () => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    console.log("Saving Templates");
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    const regex = /\${\w+\}/g;
    const dynamicVariables = data.changedContent.match(regex);

    let content = data.changedContent;
    if (dynamicVariables) {
      dynamicVariables.forEach(dynamicVariable => {
        content = content.replace(
          dynamicVariable,
          `<span th:remove="tag" th:text="${dynamicVariable}">${dynamicVariable}</span>`
        );
      });
    }
    data.templateContent = content;
    AlertTemplateService.saveTemplate(data);
    this.setState({
      edited: false
    });
  };

  onClickEdit = () => {
    const { loaderStore } = this.props;
    loaderStore.loadingStart();
    this.setState(
      {
        editMode: true
      },
      () => {
        loaderStore.loadingComplete();
      }
    );
  };

  onPreview = () => {
    this.setState({
      editMode: false
    });
  };

  onPublish = () => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    console.log("Saving Templates");
    AlertTemplateService.publishTemplate(data);
  };

  onCancel = () => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    this.setState({
      edited: false,
      editMode: false
    });
    data.changedContent = data.templateContent;
  };

  onReject = () => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    console.log("Deleting Template");
    this.setState({
      editMode: false
    });
    AlertTemplateService.deleteTemplate(data);
  };

  render() {
    const { alertTypeObj, collapseID } = this.props;
    const { editMode, edited } = this.state;
    const hidden = { opacity: 0.5 };

    return (
      <React.Fragment>
        <tr className={this.props.classs}>
          <td>{alertTypeObj.alertTypeName}</td>
          <td>{alertTypeObj.platform}</td>
          <td>{alertTypeObj.vendor}</td>
          <td>
            <span
              className="glyphicon glyphicon-envelope icon-margin"
              style={alertTypeObj.deliveryTypes.includes("EMAIL") ? {} : hidden}
            />
            <span
              className="glyphicon glyphicon-comment icon-margin"
              style={alertTypeObj.deliveryTypes.includes("SMS") ? {} : hidden}
            />
            <span
              className="glyphicon glyphicon-bell icon-margin"
              style={alertTypeObj.deliveryTypes.includes("PUSH") ? {} : hidden}
            />
          </td>

          <td>{alertTypeObj.description}</td>
          <td>
            <span
              className={
                collapseID === alertTypeObj.alertTypeId
                  ? "glyphicon glyphicon-menu-up"
                  : "glyphicon glyphicon-menu-down"
              }
              onClick={() => this.expandAccordian(alertTypeObj)}
            />
          </td>
        </tr>
        {collapseID === alertTypeObj.alertTypeId && (
          <tr>
            <td colSpan="6" style={{ padding: 0 }}>
              <div
                id={`accordion_${alertTypeObj.alertTypeId}`}
                className="accordian-border"
              >
                <EditorTabs
                  editMode={editMode}
                  edited={edited}
                  onChange={this.onChange}
                  onPublish={this.onPublish}
                  onReject={this.onReject}
                  onDraft={this.onDraft}
                  onCancel={this.onCancel}
                  onPreview={this.onPreview}
                  onClickEdit={this.onClickEdit}
                />
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

ResultRow.propTypes = {
  alertTemplateStore: PropTypes.object.isRequired,
  loaderStore: PropTypes.object.isRequired,
  alertTypeObj: PropTypes.object.isRequired
};

export default ResultRow;
