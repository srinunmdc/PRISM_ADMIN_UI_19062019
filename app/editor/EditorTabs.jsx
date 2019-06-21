import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Editor from "./Editor";
import EditorControl from "./EditorControl";
import AlertTemplateResourceStore from "../store/AlertTemplateStore";

@inject("alertTemplateStore")
@inject("alertPermissionStore")
@observer
class EditorTabs extends React.Component {
  onClickTabItem(tab) {
    AlertTemplateResourceStore.setSelectedContentType(tab);
  }

  render() {
    const {
      editMode,
      edited,
      alertTemplateStore,
      onChange,
      onChangeSource,
      alertPermissionStore,
      onPublish,
      onReject,
      onDraft,
      onCancel,
      onPreview,
      onClickEdit,
      showAlert,
      closeAlert,
      wrongDynamicVariables
    } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;
    const role = alertPermissionStore.permissions.role.toLocaleLowerCase();
    return (
      <React.Fragment>
        <div className="editor-wrapper">
          <div className="flex">
            <div className="editor-left-wrapper">
              {alertTemplateStore.alertTemplates.map(element => {
                if (element.templateContentType !== activeTab) return undefined;
                return (
                  <Editor
                    data={element}
                    editMode={editMode}
                    onChangeSource={onChangeSource}
                    onChange={onChange}
                    activeTab={activeTab}
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
                  />
                );
              })}
            </div>
            <div className="editor-right-wrapper">
              {alertTemplateStore.alertTemplates.map(element => {
                if (element.templateContentType !== activeTab) return undefined;
                return (
                  <Editor
                    data={element}
                    editMode={editMode}
                    onChangeSource={onChangeSource}
                    onChange={onChange}
                    activeTab={activeTab}
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
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="row button-wrapper">
          {(role === "publish" || role === "edit") && (
            <EditorControl
              data={" "}
              edited={edited}
              editMode={editMode}
              activeTab={activeTab}
              onPublish={onPublish}
              onReject={onReject}
              onDraft={onDraft}
              onCancel={onCancel}
              onPreview={onPreview}
              onClickEdit={onClickEdit}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

EditorTabs.propTypes = {
  alertTemplateStore: PropTypes.object.isRequired,
  editMode: PropTypes.object.isRequired,
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
  wrongDynamicVariables: PropTypes.shape({
    EMAIL_BODY: PropTypes.array.isRequired,
    EMAIL_SUBJECT: PropTypes.array.isRequired,
    PUSH_BODY: PropTypes.array.isRequired,
    SMS_BODY: PropTypes.array.isRequired
  }).isRequired
};

export default EditorTabs;
