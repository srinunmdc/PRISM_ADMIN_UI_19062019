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
      onChangeSource,
      onChange,
      activeTab,
      edited,
      tabLabels
    } = this.props;
    const height = "262px";
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
            {activeTab === "EMAIL_BODY" && (
              <Subject
                onChangeSource={onChangeSource}
                onChange={onChange}
                height="88px"
                data={data}
                finalRemove={finalRemove}
              />
            )}
            {activeTab === "EMAIL_BODY" && (
              <div className="heading-margin-top-bottom">Email Body</div>
            )}
            <CKEditor
              activeClass="p10"
              content={data.changedContent}
              events={{
                mode: onChangeSource,
                change: onChange
              }}
              config={{
                language: data.locale,
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
    );
  }
}

Editor.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  tabLabels: PropTypes.string.isRequired
};

export default Editor;
