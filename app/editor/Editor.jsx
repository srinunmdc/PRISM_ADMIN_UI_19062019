import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import CKEditor from "./NewCKEditor";
import replaceDynamicVariable from "../util/replaceDynamicVariable";

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
      showAlert,
      closeAlert,
      wrongDynamicVariables
    } = this.props;
    const tabLabels = {
      EMAIL_BODY: "Edit Email",
      SMS_BODY: "Edit Sms",
      PUSH_BODY: "Edit Push"
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
    return (
      <div className="col">
        <div className="row-xs-1 preview-header">{tabLabels[activeTab]}</div>
        <div
          className="col-md-12 col-sm-12 col-xs-12 alert-wrapper"
          style={showAlertClass}
        >
          <div className="row-xs-1">
            <Alert
              alertClass="danger"
              highlightedMessage={highlightedMessage}
              detailMessage={UnsupportedKeywords}
              showCloseIcon
              handleClose={closeAlert}
            />
          </div>
        </div>
        <div className="row-xs-11">
          <div style={{ minHeight: "278px" }}>
            <CKEditor
              activeClass="p10"
              content={data.changedContent}
              events={{
                mode: onChangeSource,
                change: onChange
              }}
              config={{
                language: data.locale,
                height: "203px",
                removePlugins: "resize,elementspath",
                toolbarCanCollapse: true,
                allowedContent: true,
                disableAutoInline: true,
                forcePasteAsPlainText: true,
                removeButtons: finalRemove
              }}
            />
          </div>
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
