import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import CKEditor from "./NewCKEditor";
import replaceDynamicVariable from "../util/replaceDynamicVariable";
import EditorControl from "./EditorControl";
import Alert from "../Alert";

@inject("alertPermissionStore")
class Editor extends React.Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    const {
      data,
      editMode,
      onChangeSource,
      onChange,
      activeTab,
      edited,
      onPublish,
      onReject,
      onDraft,
      onCancel,
      onPreview,
      onClickEdit,
      alertPermissionStore,
      showAlert,
      closeAlert,
      wrongDynamicVariables
    } = this.props;
    const previewDivStyle = {
      border: "1px solid #d1d1d1",
      overflow: "auto",
      height: "278px",
      padding: "20px"
    };
    const commonRemove =
      "PasteText,PasteFromWord,Indent,Outdent,Scayt,Link,Unlink,Anchor,Image,Table,HorizontalRule,SpecialChar,Maximize,Strike,RemoveFormat,NumberedList,BulletedList,Blockquote,Styles,About,Subscript,Superscript";
    let extra = "";
    if (activeTab === "PUSH_BODY" || activeTab === "SMS_BODY") {
      extra = ",Bold,Italic,Underline,Format";
    }
    const finalRemove = commonRemove + extra;
    const showAlertClass = showAlert[activeTab] ? {} : { display: "none" };
    const UnsupportedKeywords =
      wrongDynamicVariables[activeTab] &&
      wrongDynamicVariables[activeTab].join(",  ");
    const highlightedMessage =
      wrongDynamicVariables[activeTab] &&
      wrongDynamicVariables[activeTab].length > 1
        ? "Unsupported Keywords "
        : "Unsupported Keyword";
    const role = alertPermissionStore.permissions.role.toLocaleLowerCase();
    return (
      <div className="col-md-12 col-sm-12 col-xs-12 editor-preview-wrapper">
        <div
          className="col-md-12 col-sm-12 col-xs-12 alert-wrapper"
          style={showAlertClass}
        >
          <div className="col-md-12 col-sm-12 col-xs-12">
            <Alert
              alertClass="danger"
              highlightedMessage={highlightedMessage}
              detailMessage={UnsupportedKeywords}
              showCloseIcon
              handleClose={closeAlert}
            />
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 editor-control-wrapper">
          {editMode[activeTab] ? (
            <div
              className="col-md-12 col-sm-12 col-xs-12"
              style={{ minHeight: "304.67px" }}
            >
              <CKEditor
                activeClass="p10"
                content={data.changedContent}
                events={{
                  mode: onChangeSource,
                  change: onChange
                }}
                config={{
                  language: data.locale,
                  // height,
                  removePlugins: "resize",
                  toolbarCanCollapse: true,
                  allowedContent: true,
                  disableAutoInline: true,
                  forcePasteAsPlainText: true,
                  removeButtons: finalRemove
                }}
              />
            </div>
          ) : (
            <React.Fragment>
              <div className="col-xs-12 preview-header">Preview</div>
              <div className="col-xs-12 preview-wrapper">
                <div
                  style={previewDivStyle}
                  dangerouslySetInnerHTML={{
                    __html: replaceDynamicVariable(
                      data.changedContent,
                      data.variableMap
                    )
                  }}
                />
              </div>
            </React.Fragment>
          )}
          {(role === "publish" || role === "edit") && (
            <EditorControl
              data={data}
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
      </div>
    );
  }
}

Editor.propTypes = {
  data: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  onChangeSource: PropTypes.func.isRequired
};

export default Editor;
