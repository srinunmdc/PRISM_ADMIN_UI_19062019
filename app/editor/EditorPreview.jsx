import React from "react";
import PropTypes from "prop-types";
import replaceDynamicVariable from "../util/replaceDynamicVariable";
import FullScreenModal from "../FullScreenModal";

class EditorPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  onFullScreen = () => {
    this.setState({
      modalShow: true
    });
  };

  closeModal = () => {
    this.setState({
      modalShow: false
    });
  };

  render() {
    const {
      data,
      activeTab,
      handlePreview,
      emailSubjectData,
      updatePreview,
      tabLabels,
      role
    } = this.props;

    const { modalShow } = this.state;

    const height = activeTab === "EMAIL_BODY" ? "490px" : "300px";
    const previewDivStyle = {
      border: "1px solid #d1d1d1",
      overflow: "auto",
      wordBreak: "break-word",
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
        <div style={{ height: "40px" }} className="full-screen-wrapper">
          <span
            className="glyphicon glyphicon-fullscreen"
            onClick={() => {
              this.onFullScreen();
            }}
          />
        </div>
        <div className="preview-wrapper">
          <div style={previewDivStyle}>
            {emailSubjectData && (
              <div>
                <div className="preview-email-subject">Email Subject</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: replaceDynamicVariable(
                      emailSubjectData.previewContent,
                      emailSubjectData.variableMap
                    )
                  }}
                />
              </div>
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
        <FullScreenModal
          show={modalShow}
          close={this.closeModal}
          subjectContent={
            emailSubjectData &&
            replaceDynamicVariable(
              emailSubjectData.previewContent,
              emailSubjectData.variableMap
            )
          }
          content={replaceDynamicVariable(
            data.previewContent,
            data.variableMap
          )}
        />
      </React.Fragment>
    );
  }
}

EditorPreview.propTypes = {
  data: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  handlePreview: PropTypes.func.isRequired,
  tabLabels: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

export default EditorPreview;
