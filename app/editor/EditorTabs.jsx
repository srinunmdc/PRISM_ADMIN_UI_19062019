import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Editor from "./Editor";
import EditorControl from "./EditorControl";
import EditorPreview from "./EditorPreview";
import AlertTemplateResourceStore from "../store/AlertTemplateStore";
import Alert from "../Alert";

@inject("alertPermissionStore", "alertTemplateStore")
@observer
class EditorTabs extends React.Component {
  onClickTabItem(tab) {
    AlertTemplateResourceStore.setSelectedContentType(tab);
  }

  render() {
    const {
      edited,
      alertTemplateStore,
      onChange,
      onChangeEmailSubject,
      onChangeSource,
      alertPermissionStore,
      onPublish,
      onReject,
      onDraft,
      onCancel,
      onPreview,
      handlePreview,
      updatePreview,
      onClickEdit,
      showAlert,
      closeAlert,
      wrongDynamicVariables
    } = this.props;

    const tabLabels = {
      EMAIL_BODY: "Email",
      SMS_BODY: "Sms",
      PUSH_BODY: "Push"
    };

    const activeTab =
      alertTemplateStore.templateContentTypes.selected &&
      alertTemplateStore.templateContentTypes.selected[0];
    const activeTabEmailSubject =
      alertTemplateStore.templateContentTypes.selected &&
      alertTemplateStore.templateContentTypes.selected.length > 1 &&
      alertTemplateStore.templateContentTypes.selected[1];

    let data = null;
    let emailSubjectData = null;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) data = element;
      if (element.templateContentType === activeTabEmailSubject)
        emailSubjectData = element;
    });

    const role = alertPermissionStore.permissions.role.toLocaleLowerCase();
    const showAlertClass =
      showAlert[activeTab] || showAlert[activeTabEmailSubject]
        ? {}
        : { display: "none" };

    let unsupportedKeywords = "";
    if (wrongDynamicVariables[activeTabEmailSubject]) {
      unsupportedKeywords += wrongDynamicVariables[activeTabEmailSubject].join(
        ",  "
      );
    }

    if (wrongDynamicVariables[activeTab]) {
      unsupportedKeywords += wrongDynamicVariables[activeTab].join(",  ");
    }

    const highlightedMessage =
      wrongDynamicVariables[activeTab] &&
      wrongDynamicVariables[activeTab].length > 1
        ? "Unsupported Keywords "
        : "Unsupported Keyword";
    if (!data) {
      return null;
    }
    return (
      <div className="editor-button-wrapper">
        <div style={showAlertClass}>
          <div className="row-xs-1">
            <Alert
              alertClass="danger"
              highlightedMessage={highlightedMessage}
              detailMessage={unsupportedKeywords}
              showCloseIcon
              handleClose={closeAlert}
            />
          </div>
        </div>
        <div className="flex editor-wrapper">
          {role !== "view" && (
            <div className="editor-left-wrapper" style={{ minHeight: "361px" }}>
              {alertTemplateStore.alertTemplates.map(element => {
                if (element.templateContentType !== activeTab) return undefined;
                return (
                  <Editor
                    data={element}
                    emailSubjectData={emailSubjectData}
                    onChangeSource={onChangeSource}
                    onChange={onChange}
                    onChangeEmailSubject={onChangeEmailSubject}
                    activeTab={activeTab}
                    activeTabEmailSubject={activeTabEmailSubject}
                    edited={edited}
                    onPublish={onPublish}
                    onReject={onReject}
                    onDraft={onDraft}
                    onCancel={onCancel}
                    onPreview={onPreview}
                    onClickEdit={onClickEdit}
                    showAlert={showAlert}
                    closeAlert={closeAlert}
                    wrongDynamicVariables={wrongDynamicVariables}
                    tabLabels={tabLabels}
                  />
                );
              })}
            </div>
          )}
          <div className="editor-right-wrapper">
            <EditorPreview
              data={data}
              emailSubjectData={emailSubjectData}
              activeTab={activeTab}
              handlePreview={handlePreview}
              updatePreview={updatePreview}
              role={role}
              tabLabels={tabLabels}
            />
          </div>
        </div>
        <div className="row button-wrapper">
          <div className="col-xs-4">{`Last Published ${
            data.templateContentType
          }`}</div>
          {(role === "publish" || role === "edit") && (
            <div className="col-xs-8">
              <EditorControl
                data={data}
                // emailSubjectData={emailSubjectData}
                activeTabEmailSubject={activeTabEmailSubject}
                edited={edited}
                activeTab={activeTab}
                onPublish={onPublish}
                onReject={onReject}
                onDraft={onDraft}
                onCancel={onCancel}
                onPreview={onPreview}
                onClickEdit={onClickEdit}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

EditorTabs.propTypes = {
  alertTemplateStore: PropTypes.object.isRequired,
  edited: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onDraft: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.object.isRequired,
  closeAlert: PropTypes.func.isRequired,
  wrongDynamicVariables: PropTypes.object.isRequired
};

export default EditorTabs;
