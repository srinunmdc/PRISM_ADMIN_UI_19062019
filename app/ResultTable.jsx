import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import Thead from "./table-head";
import sort from "./util/sort";
import addSpans from "./util/addSpans";
import innerTextOfSpans from "./util/innerTextOfSpans";
import EditorTabs from "./editor/EditorTabs";
import AlertTemplateResourceStore from "./store/AlertTemplateStore";
import AlertTemplateService from "./service/AlertTemplateService";
import ConfirmModal from "./ConfirmModal";

@inject("alertTypeStore", "alertTemplateStore")
@observer
class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      sortOrder: "asc",
      sortKey: "",
      collapsedDeliveryTpe: "",
      edited: {},
      confirmModalShow: false,
      confirmRejectModalShow: false,
      showAlert: {}, // have to make showAlert keys dynamic by taking value from templateContentTypes in alertTemplateSore
      hoverIndex: null,
      wrongDynamicVariables: {}, // have to make wrongDynamicVariables keys dynamic by taking value from templateContentTypes in alertTemplateSore
      updatePreview: 0
    };
    this.sortFields = this.sortFields.bind(this);
    this.setCollapseId = this.setCollapseId.bind(this);
  }

  onClickDeliveryType = type => {
    AlertTemplateResourceStore.setSelectedContentType(type);
  };

  setCollapseId(id) {
    this.setState({
      collapseID: id
    });
  }

  declineEditing = () => {
    this.setState(
      {
        confirmModalShow: false,
        edited: {},
        showAlert: {},
        wrongDynamicVariables: {}
      },
      () => {
        this.resetTemplateStore();
        this.setCollapseId("");
      }
    );
  };

  continueEditing = () => {
    this.setState({ confirmModalShow: false });
  };

  declineRejectEditing = () => {
    this.setState({
      confirmRejectModalShow: false
    });
  };

  continueRejectEditing = () => {
    this.setState({ confirmRejectModalShow: false });
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    AlertTemplateService.deleteTemplate(data);
  };

  resetTemplateStore = () => {
    AlertTemplateResourceStore.resetStore();
  };

  expandAccordian = (e, alertTypeResource, deliveryType) => {
    e.stopPropagation();
    if (
      deliveryType &&
      !alertTypeResource.deliveryTypes.includes(deliveryType)
    ) {
      return;
    }
    const onClickChannel = !!deliveryType;
    const { collapseID, edited } = this.state;
    // const deliveryTypes = alertTypeResource.deliveryTypes
    const deliveryContentMapping = {
      EMAIL: ["EMAIL_BODY", "EMAIL_SUBJECT"],
      SMS: ["SMS_BODY"],
      PUSH: ["PUSH_BODY"]
    };
    if (!onClickChannel) {
      if (Object.values(edited).includes(true)) {
        this.setState({ confirmModalShow: true });
      } else {
        this.resetTemplateStore();
        if (collapseID === alertTypeResource.alertTypeId) {
          this.setCollapseId("");
        } else {
          let contentType;
          if (deliveryType) {
            contentType = deliveryContentMapping[deliveryType][0];
          } else {
            contentType =
              deliveryContentMapping[alertTypeResource.deliveryTypes[0]][0];
          }
          AlertTemplateService.loadAlertTemplatesResources(
            alertTypeResource,
            contentType
          );
          this.setCollapseId(alertTypeResource.alertTypeId);
          this.setState({ edited: {} });
        }
      }
    } else {
      // if he clicks on icon of different alerttype
      if (
        collapseID !== alertTypeResource.alertTypeId &&
        Object.values(edited).includes(true)
      ) {
        this.setState({ confirmModalShow: true });
        return;
      }
      // first time opened load the data
      if (collapseID === "") {
        AlertTemplateService.loadAlertTemplatesResources(
          alertTypeResource,
          deliveryContentMapping[deliveryType][0]
        );
        this.setCollapseId(alertTypeResource.alertTypeId);
      }
      // if clicked on the same channel type
      else if (deliveryType === this.state.collapsedDeliveryTpe) {
        this.resetTemplateStore();
        if (Object.values(edited).includes(true)) {
          this.setState({ confirmModalShow: true });
        }
        this.setCollapseId("");
      }
      // already opened switch the active data
      else {
        AlertTemplateResourceStore.setSelectedContentType(
          deliveryContentMapping[deliveryType][0]
        );
        this.setCollapseId(alertTypeResource.alertTypeId);
      }
      this.setState({ edited: { ...edited } });
    }
    if (collapseID !== "") {
      this.setState({
        collapsedDeliveryTpe:
          deliveryType ||
          deliveryContentMapping[alertTypeResource.deliveryTypes[0]][0]
      });
    }
    // AlertTemplateResourceStore.resetStore();
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
    const { edited, updatePreview } = this.state;
    this.setState({
      edited: { ...edited, [activeTab]: true, updatePreview: updatePreview + 1 }
    });
    if (data.templateContentType === "EMAIL_BODY") {
      data.changedContent = evt.editor.getData();
    } else {
      data.changedContent = evt.editor
        .getData()
        .replace(/\<p\>/g, "")
        .replace(/\<\/p\>/g, "")
        .replace(/(&nbsp;)/g, " "); // evt.editor.document.getBody().getText();
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

  onChangeSource = evt => {
    // evt.data.$.target.value [evt.sender.editor.mode === "source"]
    // evt.data.$.target.innerHTML [evt.sender.editor.mode === "wysiwyg"]
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    const { edited } = this.state;
    this.setState({
      edited: { ...edited, [activeTab]: true }
    });
    if (data.templateContentType === "EMAIL_BODY") {
      // data.changedContent = evt.editor.getData();
      if (evt.sender.editor.mode === "source") {
        data.changedContent = evt.data.$.target.value;
      } else {
        data.changedContent = evt.data.$.target.innerHTML;
      }
    } else {
      if (evt.sender.editor.mode === "source") {
        data.changedContent = evt.data.$.target.value
          .replace(/\<p\>/g, "")
          .replace(/\<\/p\>/g, "")
          .replace(/(&nbsp;)/g, " ");
      } else {
        data.changedContent = evt.data.$.target.innerHTML
          .replace(/\<p\>/g, "")
          .replace(/\<\/p\>/g, "")
          .replace(/(&nbsp;)/g, " ");
      }
      // data.changedContent = evt.editor
      //   .getData()
      //   .replace("<p>", "")
      //   .replace("</p>", ""); // evt.editor.document.getBody().getText();
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
    const { edited, wrongDynamicVariables, showAlert } = this.state;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    let error;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    data.changedContent = data.changedContent.replace(/(&zwnj;)/g, "");
    data.changedContent = addSpans(data.changedContent);
    // const regex = /\${\w*\}/g;

    const content = data.changedContent;
    const dynamicError = [];
    const regex = /\${[^$]*?\}/g;
    const dynamicVariables = innerTextOfSpans(data.changedContent).match(regex);
    if (dynamicVariables) {
      dynamicVariables.forEach(dynamicVariable => {
        const matchedString = dynamicVariable.substring(
          2,
          dynamicVariable.length - 1
        );
        if (!data.variableMap || !data.variableMap[matchedString]) {
          error = true;
          dynamicError.push(dynamicVariable);
          this.setState({
            wrongDynamicVariables: {
              ...wrongDynamicVariables,
              [activeTab]: dynamicError
            }
          });
        }
      });
    }
    if (!error) {
      data.templateContent = content;
      // data.state = "DRAFT";
      AlertTemplateService.saveTemplate(data);
      this.setState({
        edited: { ...edited, [activeTab]: false },
        showAlert: { ...showAlert, [activeTab]: false }
      });
    } else {
      this.setState({ showAlert: { ...showAlert, [activeTab]: true } });
    }
  };

  handlePreview = () => {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    data.previewContent = data.changedContent;
    const { updatePreview } = this.state;
    this.setState({ updatePreview: updatePreview + 1 });
  };

  onPublish = () => {
    const { alertTemplateStore } = this.props;
    const { edited } = this.state;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    // data.state = "PUBLISHED";
    this.setState({
      edited: { ...edited, [activeTab]: false }
    });
    AlertTemplateService.publishTemplate(data);
    // data.state = undefined;
  };

  onCancel = () => {
    const { alertTemplateStore } = this.props;
    const { edited, showAlert } = this.state;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    let data;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) {
        data = element;
      }
    });
    data.state = undefined;
    this.setState({
      edited: { ...edited, [activeTab]: false },
      showAlert: { ...showAlert, [activeTab]: false },
      wrongDynamicVariables: {}
    });
    data.changedContent = data.templateContent;
  };

  onReject = () => {
    this.setState({
      confirmRejectModalShow: true
    });
  };

  handleMouseEnterOnRow = index => {
    this.setState({ hoverIndex: index });
  };

  handleMouseLeaveonRow = () => {
    this.setState({ hoverIndex: null });
  };

  onClickDisabled = e => {
    e.stopPropagation();
  };

  renderResultRow = (obj, accordianEvenOdd, index) => {
    const {
      collapseID,
      edited,
      showAlert,
      hoverIndex,
      wrongDynamicVariables,
      rejectAlert,
      updatePreview
    } = this.state;
    const hidden = { opacity: 0.5 };
    const { alertTemplateStore } = this.props;
    const activeChannel = alertTemplateStore.templateContentTypes.selected;
    return (
      <React.Fragment>
        <div className="row-margin white-background">
          <div
            className="flex"
            style={{ cursor: "pointer" }}
            onClick={e => this.expandAccordian(e, obj)}
          >
            <div style={{ width: "30px" }}>
              <span
                className={
                  collapseID === obj.alertTypeId
                    ? "glyphicon glyphicon-menu-up"
                    : `glyphicon glyphicon-menu-down`
                }
                style={{ padding: "0px 10px" }}
              />
            </div>
            <div className="row table-row">
              <div className="col-xs-2">{obj.alertTypeName}</div>
              <div className="col-xs-2">
                <span
                  className={
                    collapseID === obj.alertTypeId &&
                    activeChannel === "EMAIL_BODY"
                      ? `glyphicon glyphicon-envelope icon-margin active-channel`
                      : "glyphicon glyphicon-envelope icon-margin"
                  }
                  style={obj.deliveryTypes.includes("EMAIL") ? {} : hidden}
                  onClick={e => this.expandAccordian(e, obj, "EMAIL")}
                />
                <span
                  className={
                    collapseID === obj.alertTypeId &&
                    activeChannel === "SMS_BODY"
                      ? `glyphicon glyphicon-comment icon-margin active-channel`
                      : "glyphicon glyphicon-comment icon-margin"
                  }
                  style={obj.deliveryTypes.includes("SMS") ? {} : hidden}
                  onClick={e => this.expandAccordian(e, obj, "SMS")}
                />
                <span
                  className={
                    collapseID === obj.alertTypeId &&
                    activeChannel === "PUSH_BODY"
                      ? `glyphicon glyphicon-bell icon-margin active-channel`
                      : "glyphicon glyphicon-bell icon-margin"
                  }
                  style={obj.deliveryTypes.includes("PUSH") ? {} : hidden}
                  onClick={e => this.expandAccordian(e, obj, "PUSH")}
                />
              </div>
              <div className="text-truncate col-xs-4">{obj.description}</div>
              <div className="col-xs-2">{obj.platform}</div>
              <div className="text-truncate col-xs-2">{obj.vendor}</div>
            </div>
          </div>
          {collapseID === obj.alertTypeId && (
            <div className="row">
              <div className="col-xs-12">
                <div
                  id={`accordion_${obj.alertTypeId}`}
                  className="accordian-border"
                >
                  <EditorTabs
                    edited={edited}
                    onChangeSource={this.onChangeSource}
                    onChange={this.onChange}
                    onPublish={this.onPublish}
                    onReject={this.onReject}
                    rejectAlert={rejectAlert}
                    onDraft={this.onDraft}
                    onCancel={this.onCancel}
                    onPreview={this.onPreview}
                    handlePreview={this.handlePreview}
                    updatePreview={updatePreview}
                    onClickEdit={this.onClickEdit}
                    showAlert={showAlert}
                    closeAlert={this.closeAlert}
                    wrongDynamicVariables={wrongDynamicVariables}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  closeAlert = () => {
    const { alertTemplateStore } = this.props;
    const { showAlert } = this.state;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    this.setState({
      showAlert: { ...showAlert, [activeTab]: false },
      rejectAlert: false
    });
  };

  sortFields(sortKey, sortOrder) {
    this.setState({
      sortKey,
      sortOrder
    });
  }

  render() {
    const columns = [
      { label: "Alert", value: "alertTypeName", column: "col-xs-2" },
      { label: "Channel", value: "", column: "col-xs-2" },
      { label: "Description", value: "description", column: "col-xs-4" },
      { label: "Platform", value: "platform", column: "col-xs-2" },
      { label: "Alert Source", value: "vendor", column: "col-xs-2" }
    ];
    const { alertTypeStore, alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    const {
      sortKey,
      sortOrder,
      edited,
      confirmModalShow,
      confirmRejectModalShow
    } = this.state;
    const confirmModalContent = Object.keys(edited)
      .filter(key => edited[key])
      .join(", ");

    return (
      <React.Fragment>
        <div>
          <Thead columns={columns} sort={this.sortFields} />

          <div>
            {alertTypeStore.filteredAlertTypes
              ? sort(alertTypeStore.filteredAlertTypes, sortKey, sortOrder).map(
                  (obj, index) => {
                    const accordianEvenOdd =
                      index % 2 === 0
                        ? "not-accordian-even"
                        : "not-accordian-odd";
                    return this.renderResultRow(obj, accordianEvenOdd, index);
                  }
                )
              : null}
          </div>
        </div>
        <ConfirmModal
          show={confirmModalShow}
          close={this.declineEditing}
          content={`You might lose your changes in ${confirmModalContent}. Continue editing?`}
          confirmHandler={this.continueEditing}
          successText="Yes"
          failText="Discard"
        />
        <ConfirmModal
          show={confirmRejectModalShow}
          close={this.declineRejectEditing}
          content={`You want to reject changes in ${activeTab}`}
          confirmHandler={this.continueRejectEditing}
          successText="Yes"
          failText="No"
        />
      </React.Fragment>
    );
  }
}

ResultTable.propTypes = {
  alertTypeStore: PropTypes.object.isRequired,
  alertTemplateStore: PropTypes.object.isRequired,
  alertTypeObj: PropTypes.object.isRequired
};

export default ResultTable;
