import React from "react";
import PropTypes from "prop-types";
import CKEditor from "./NewCKEditor";

const EditorPreview = ({
  data,
  height,
  finalRemove,
  onChange,
  onChangeSource
}) => {
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
            removePlugins: "resize,elementspath,toolbar",
            toolbarCanCollapse: true,
            allowedContent: true,
            disableAutoInline: true,
            forcePasteAsPlainText: true,
            removeButtons: finalRemove
          }}
        />
      </div>
      <div className="heading-margin-top-bottom">{`Characters (${
        data.changedContent.length
      })`}</div>
    </React.Fragment>
  );
};

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  finalRemove: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSource: PropTypes.func.isRequired
};

export default EditorPreview;
