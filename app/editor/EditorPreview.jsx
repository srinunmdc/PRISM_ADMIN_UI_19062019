import React from "react";
import PropTypes from "prop-types";
import replaceDynamicVariable from "../util/replaceDynamicVariable";

const EditorPreview = ({ data }) => {
  const previewDivStyle = {
    border: "1px solid #d1d1d1",
    overflow: "auto",
    height: "278px",
    padding: "20px"
  };
  return (
    <React.Fragment>
      <div className="col-xs-12 preview-header">
        Preview<div className="glyphicon glyphicon-repeat">Update</div>
      </div>
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
  );
};

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired
};

export default EditorPreview;
