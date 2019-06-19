import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Editor from "./Editor";
import Tab from "./Tab";
import AlertTemplateResourceStore from "../store/AlertTemplateStore";

@inject("alertTemplateStore")
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
    return (
      <div className="tabs">
        <ul className="tab-list">
          {alertTemplateStore.templateContentTypes.options &&
            alertTemplateStore.templateContentTypes.options.map(element => {
              const label = element;

              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={this.onClickTabItem.bind(this)}
                />
              );
            })}
        </ul>

        <div className="tab-content">
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
    );
  }
}

EditorTabs.propTypes = {
  alertTemplateStore: PropTypes.object.isRequired,
  editMode: PropTypes.object.isRequired,
  edited: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
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
