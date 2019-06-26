import React from "react";
import PropTypes from "prop-types";
import replaceDynamicVariable from "../util/replaceDynamicVariable";

const EditorPreview = ({ data, activeTab, handlePreview, updatePreview }) => {
  const height = activeTab === "EMAIL_BODY" ? "535px" : "328px";
  const previewDivStyle = {
    border: "1px solid #d1d1d1",
    overflow: "auto",
    height,
    padding: "20px"
  };
  return (
    <React.Fragment>
      <div className="preview-header">
        <span>Preview</span>
        <div className="glyphicon glyphicon-repeat preview-update" onClick={handlePreview}>Update</div>
      </div>
      <div className="preview-wrapper">
        <div
          style={previewDivStyle}
          dangerouslySetInnerHTML={{
            __html: replaceDynamicVariable(
              data.previewContent,
              data.variableMap
            )
          }}
        />
      </div>
    </React.Fragment>
  );
};

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  handlePreview: PropTypes.func.isRequired
};

export default EditorPreview;
