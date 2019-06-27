import React from "react";
import PropTypes from "prop-types";
import replaceDynamicVariable from "../util/replaceDynamicVariable";

const EditorPreview = ({
  data,
  emailSubjectData,
  activeTab,
  handlePreview,
  updatePreview,
  tabLabels,
  role
}) => {
  const height = activeTab === "EMAIL_BODY" ? "530px" : "328px";
  const previewDivStyle = {
    border: "1px solid #d1d1d1",
    overflow: "auto",
    height,
    padding: "20px"
  };
  return (
    <React.Fragment>
      <div className="preview-header">
        <span>
          <b>{`Preview ${tabLabels[activeTab]}`}</b>
        </span>
        {role !== "view" && (
          <div
            className="glyphicon glyphicon-repeat preview-update"
            onClick={handlePreview}
          >
            <span style={{ textDecoration: "underline" }}>
              <b>Update</b>
            </span>
          </div>
        )}
      </div>
      <div className="preview-wrapper">
        <div style={previewDivStyle}>
          {emailSubjectData && (
            <>
              <div className="preview-email-subject">Email Subject</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceDynamicVariable(
                    emailSubjectData.previewContent,
                    emailSubjectData.variableMap
                  )
                }}
              />
            </>
          )}

          {activeTab === "EMAIL_BODY" && (
            <div className="preview-email-body">Email Body</div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: replaceDynamicVariable(
                data.previewContent,
                data.variableMap
              )
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  handlePreview: PropTypes.func.isRequired,
  tabLabels: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

export default EditorPreview;
