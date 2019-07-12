import React from "react";
import PropTypes from "prop-types";
import CKEditor from "./NewCKEditor";

const Subject = ({
  data,
  height,
  finalRemove,
  onChange,
  onChangeSource,
  activeTabEmailSubject
}) => {
  finalRemove = `${finalRemove  },Bold,Italic,Underline,Format,Cut,Copy,Paste,Undo,Redo,Source`;
  return (
    <React.Fragment>
      <div className="heading-margin-bottom">Subject</div>
      <div style={{ minHeight: height }}>
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
            id: activeTabEmailSubject,
            removePlugins: "resize,elementspath",
            toolbarCanCollapse: false,
            allowedContent: true,
            disableAutoInline: true,
            forcePasteAsPlainText: true,
            removeButtons: finalRemove
          }}
        />
      </div>
      <div
        className="subheading-margin-top-bottom"
        style={{ fontSize: "14px" }}
      >{`Characters (${data.changedContent.length})`}</div>
    </React.Fragment>
  );
};

Subject.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  finalRemove: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSource: PropTypes.func.isRequired
};

export default Subject;
