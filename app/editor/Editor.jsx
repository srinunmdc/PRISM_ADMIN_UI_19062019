import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import CKEditor from "./NewCKEditor";
import Subject from "./Subject";

import Alert from "../Alert";

@inject("alertPermissionStore")
class Editor extends React.Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    const {
      data,
      emailSubjectData,
      onChangeSource,
      onChange,
      onChangeEmailSubject,
      activeTab,
      activeTabEmailSubject,
      edited,
      tabLabels
    } = this.props;
    const height = activeTab === "EMAIL_BODY" ? "262px" : "272px";
    const commonRemove =
      "PasteText,PasteFromWord,Indent,Outdent,Scayt,Link,Unlink,Anchor,Image,Table,HorizontalRule,SpecialChar,Maximize,Strike,RemoveFormat,NumberedList,BulletedList,Blockquote,Styles,About,Subscript,Superscript";
    let extra = "";
    if (activeTab === "PUSH_BODY" || activeTab === "SMS_BODY") {
      extra = ",Bold,Italic,Underline,Format";
    }
    const finalRemove = commonRemove + extra;
    return (
      <div className="col">
        <div className="row-xs-1 preview-header">
          <b>{`Edit ${tabLabels[activeTab]}`}</b>
        </div>
        <div className="row-xs-11">
          <div style={{ minHeight: "203px" }}>
            {activeTabEmailSubject === "EMAIL_SUBJECT" && (
              <Subject
                onChangeSource={onChangeSource}
                onChange={onChangeEmailSubject}
                height="88px"
                data={emailSubjectData}
                finalRemove={finalRemove}
              />
            )}
            {activeTab === "EMAIL_BODY" && (
              <div className="heading-margin-top-bottom">Email Body</div>
            )}
            <div id="hello">
              <CKEditor
                activeClass="p10"
                content={data.changedContent}
                events={{
                  mode: onChangeSource,
                  change: onChange
                }}
                config={{
                  language: data.locale,
                  bodyId: `${activeTab}`,
                  height,
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
      </div>
    );
  }
}

Editor.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  tabLabels: PropTypes.string.isRequired
};

export default Editor;
