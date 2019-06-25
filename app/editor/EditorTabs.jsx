import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Editor from "./Editor";
import EditorControl from "./EditorControl";
import EditorPreview from "./EditorPreview";
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
    let data = null;
    alertTemplateStore.alertTemplates.forEach(element => {
      if (element.templateContentType === activeTab) data = element;
    });
    const role = alertPermissionStore.permissions.role.toLocaleLowerCase();
    if (!data) {
      return null;
    }
    return (
      <div className="editor-button-wrapper">
        <div className="flex editor-wrapper">
          <div className="editor-left-wrapper" style={{ minHeight: "361px" }}>
            {alertTemplateStore.alertTemplates.map(element => {
              if (element.templateContentType !== activeTab) return undefined;
              return (
                <Editor
                  data={data}
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
              return <EditorPreview data={data} activeTab={activeTab} />;
            })}
          </div>
        </div>
        <div className="row button-wrapper">
          {(role === "publish" || role === "edit") && (
            <EditorControl
              data={data}
              edited={edited}
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
  wrongDynamicVariables: PropTypes.shape({
    EMAIL_BODY: PropTypes.array.isRequired,
    EMAIL_SUBJECT: PropTypes.array.isRequired,
    PUSH_BODY: PropTypes.array.isRequired,
    SMS_BODY: PropTypes.array.isRequired
  }).isRequired
};

export default EditorTabs;
