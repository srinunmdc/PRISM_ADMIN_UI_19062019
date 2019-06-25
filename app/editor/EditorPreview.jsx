import React from "react";
import PropTypes from "prop-types";
import replaceDynamicVariable from "../util/replaceDynamicVariable";

const EditorPreview = ({ data, activeTab }) => {
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
        Preview<div className="glyphicon glyphicon-repeat">Update</div>
      </div>
      <div className="preview-wrapper">
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
  );
};

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default EditorPreview;
